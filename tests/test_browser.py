"""Regression checks run against temporary content, never edit the working tree."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse
from urllib.request import Request, urlopen
import json
import os
import shutil
import socket
import subprocess
import tempfile
import threading
import time
import unittest

from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


class BrowserTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temp = tempfile.TemporaryDirectory(prefix='msdev-tests-')
        cls.repo = Path(cls.temp.name)
        for name in ['index.html', 'assets', 'shared', 'content', 'admin', 'oficina', 'salao', 'dentista', 'cardapio', 'artista', 'tatuagem', 'templo', 'curriculo', 'loja', 'give-beauty']:
            source = ROOT / name
            if source.is_dir():
                shutil.copytree(source, cls.repo / name)
            else:
                shutil.copy2(source, cls.repo / name)
        cls.server = ThreadingHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(cls.repo)))
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()
        cls.base = f'http://127.0.0.1:{cls.server.server_port}'
        with socket.socket() as sock:
            sock.bind(('127.0.0.1', 0))
            proxy_port = sock.getsockname()[1]
        cls.proxy = f'http://127.0.0.1:{proxy_port}'
        admin = cls.repo / 'admin/index.html'
        admin.write_text(admin.read_text().replace('http://127.0.0.1:8081', cls.proxy))
        cls.proxy_process = subprocess.Popen(
            [str(ROOT / 'node_modules/.bin/decap-server')], cwd=cls.repo,
            env={**os.environ, 'PORT':str(proxy_port), 'BIND_HOST':'127.0.0.1', 'GIT_REPO_DIRECTORY':str(cls.repo)},
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        )
        cls.addClassCleanup(cls.proxy_process.terminate)
        for attempt in range(100):
            try:
                with urlopen(Request(cls.proxy + '/api/v1', data=b'{"action":"info"}', headers={'Content-Type':'application/json'}), timeout=1) as response:
                    assert json.load(response)['type'] == 'local_fs'
                break
            except OSError:
                time.sleep(.1)
        else:
            raise RuntimeError('Decap local proxy did not start')
        cls.playwright = sync_playwright().start()
        chrome = os.environ.get('CHROMIUM_PATH') or shutil.which('chromium') or shutil.which('google-chrome')
        cls.browser = cls.playwright.chromium.launch(**({'executable_path': chrome} if chrome else {}), headless=True)

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()
        cls.server.shutdown()
        cls.server.server_close()
        cls.thread.join()
        cls.proxy_process.terminate()
        cls.proxy_process.wait(timeout=5)
        cls.temp.cleanup()

    def setUp(self):
        self.context = self.browser.new_context(viewport={'width':1280, 'height':800})
        self.context.route('**/*', lambda route: route.continue_() if route.request.url.startswith((self.base + '/', self.proxy + '/')) else route.abort())
        self.page = self.context.new_page()
        self.errors = []
        self.page.on('pageerror', lambda error: self.errors.append(str(error)))

    def tearDown(self):
        self.context.close()
        self.assertEqual(self.errors, [])

    def goto(self, path):
        response = self.page.goto(self.base + path, wait_until='networkidle')
        self.assertEqual(response.status, 200)

    def test_quote_model_message_and_privacy(self):
        self.goto('/?template=oficina#cotacao')
        expect(self.page.locator('#quote-template')).to_have_value('oficina')
        self.page.locator('#quote-name').fill('Pessoa de teste')
        self.page.locator('#quote-business').fill('Empresa privada')
        self.page.locator('#quote-segment').fill('Segmento privado')
        self.page.locator('#quote-service').select_option('landing')
        self.page.locator('#quote-details').fill('Conteúdo privado')
        # Simulate a blocked popup. The continuation link must still work.
        self.page.evaluate('() => { window.opened=[]; window.open=url=>{window.opened.push(url); return null;}; }')
        self.page.locator('#quote-form button[type=submit]').click()
        url = self.page.evaluate('window.opened[0]')
        self.assertEqual(urlparse(url).path, '/5519978075689')
        message = parse_qs(urlparse(url).query)['text'][0]
        for value in ['Pessoa de teste', 'Empresa privada', 'Segmento privado', 'Oficina Mecânica', 'Conteúdo privado']:
            self.assertIn(value, message)
        expect(self.page.locator('#quote-continue')).to_have_attribute('href', url)
        self.assertIn('Confirme o envio', self.page.locator('#quote-feedback').inner_text())
        events = self.page.evaluate('window.dataLayer')
        self.assertEqual([event['event'] for event in events].count('quote_whatsapp_click'), 1)
        for value in ['Pessoa de teste', 'Empresa privada', 'Segmento privado', 'Conteúdo privado']:
            self.assertNotIn(value, json.dumps(events))
        self.assertEqual(self.page.evaluate('localStorage.length'), 0)

    def test_quote_validation_and_catalog_filters(self):
        self.goto('/')
        self.page.evaluate('() => { window.opened=[]; window.open=url=>window.opened.push(url); }')
        self.page.locator('#quote-form button[type=submit]').click()
        self.assertEqual(self.page.evaluate('window.opened'), [])
        self.page.locator('.demo-filters [data-category="beleza"]').click()
        expect(self.page.locator('.demo-card:visible')).to_have_count(3)
        self.page.locator('[data-quote-template="salao"]').click()
        expect(self.page.locator('#quote-template')).to_have_value('salao')
        self.page.set_viewport_size({'width':375, 'height':812})
        self.assertLessEqual(self.page.evaluate('document.documentElement.scrollWidth'), 375)
        for image in self.page.locator('.demo-preview img').all():
            if image.is_visible():
                image.scroll_into_view_if_needed()
                expect(image).to_have_js_property('complete', True)
                self.assertGreater(image.evaluate('(img) => img.naturalWidth'), 0)

    def test_quote_works_when_analytics_is_blocked(self):
        self.context.route('**/shared/analytics.js', lambda route: route.abort())
        self.goto('/')
        for selector, value in [('#quote-name', 'Teste'), ('#quote-business', 'Negócio'), ('#quote-segment', 'Restaurante')]:
            self.page.locator(selector).fill(value)
        self.page.locator('#quote-service').select_option('menu')
        self.page.evaluate('() => { window.opened=[]; window.open=url=>window.opened.push(url); }')
        self.page.locator('#quote-form button[type=submit]').click()
        self.assertEqual(len(self.page.evaluate('window.opened')), 1)
        expect(self.page.locator('#quote-continue')).to_be_visible()

    def test_search_clear_category_and_escape_regressions(self):
        self.goto('/cardapio/')
        total = self.page.locator('.menu-item').count()
        self.page.locator('#search').fill('Sopa')
        expect(self.page.locator('.menu-item:visible')).to_have_count(1)
        self.page.locator('#search').fill('')
        expect(self.page.locator('.menu-item:visible')).to_have_count(total)
        self.page.locator('#search').fill('Sopa')
        self.page.locator('.cat-btn[data-filter="sobremesas"]').click()
        expect(self.page.locator('.menu-item:visible')).to_have_count(3)
        self.page.locator('#search').fill('inexistente')
        expect(self.page.locator('#empty-state')).to_be_visible()
        self.page.locator('#search').fill('')
        expect(self.page.locator('.menu-item:visible')).to_have_count(3)
        expect(self.page.locator('.cat-btn.active')).to_have_attribute('data-filter', 'sobremesas')
        self.page.locator('.menu-item:visible .btn-add').first.click()
        self.page.locator('#btn-view-cart').click()
        self.page.keyboard.press('Escape')
        expect(self.page.locator('#cart-modal')).not_to_have_class('modal-overlay open')

    def test_all_pages_and_model_contact(self):
        for slug in ['oficina','salao','dentista','cardapio','artista','tatuagem','templo','curriculo','loja','give-beauty']:
            self.goto('/' + slug + '/')
            expect(self.page.locator('.demo-contact a')).to_have_attribute('href', self.base + '/?template=' + slug + '#cotacao')
            self.page.keyboard.press('Escape')
        self.goto('/oficina/')
        data = json.loads((self.repo / 'oficina/data.json').read_text())
        expect(self.page.locator('.gallery-item')).to_have_count(len(data['portfolio']))
        self.page.locator('[data-modal-open="schedule"]').first.click()
        expect(self.page.locator('#modal-overlay')).to_have_class('modal-overlay open')
        self.page.keyboard.press('Escape')
        expect(self.page.locator('#modal-overlay')).not_to_have_class('modal-overlay open')

    def test_cms_posts_are_shared_and_html_is_text(self):
        path = self.repo / 'give-beauty/posts.json'
        original = path.read_bytes()
        try:
            path.write_text(json.dumps({'posts':[{'title':'<img src=x onerror=alert(1)>', 'excerpt':'Novo artigo', 'content':'Conteúdo atualizado', 'date':'Teste', 'img':''}]}))
            self.goto('/give-beauty/')
            expect(self.page.locator('.news-card')).to_have_count(1)
            expect(self.page.locator('.news-card-title')).to_have_text('<img src=x onerror=alert(1)>')
            self.assertEqual(self.page.locator('.news-card-title img').count(), 0)
            self.page.locator('.news-card').click()
            expect(self.page.locator('#news-modal-content')).to_have_text('Conteúdo atualizado')
            second = self.browser.new_context()
            try:
                second.route('**/*', lambda route: route.continue_() if route.request.url.startswith(self.base + '/') else route.abort())
                page = second.new_page()
                page.goto(self.base + '/give-beauty/', wait_until='networkidle')
                expect(page.locator('.news-card-title')).to_have_text('<img src=x onerror=alert(1)>')
            finally:
                second.close()
        finally:
            path.write_bytes(original)

    def test_plausible_payload_excludes_form_and_query(self):
        payloads = []
        path = self.repo / 'content/site.json'
        original = path.read_bytes()
        site = json.loads(original)
        site['analytics'] = {'enabled':True, 'domain':'example.com', 'endpoint':'https://plausible.io/api/event'}
        path.write_text(json.dumps(site))
        self.context.route('https://plausible.io/api/event', lambda route: (payloads.append(json.loads(route.request.post_data)), route.fulfill(status=202, body='ok')))
        try:
            self.goto('/?template=oficina&email=private@example.com')
            self.page.locator('.nav-btn').click()
            self.page.wait_for_function('window.dataLayer.some(event => event.event === "quote_intent")')
            self.assertGreaterEqual(len(payloads), 2)
            self.assertTrue(all(item['url'] == self.base + '/' for item in payloads))
            self.assertNotIn('private@example.com', json.dumps(payloads))
            self.assertTrue(all(item['referrer'] is None for item in payloads))
        finally:
            path.write_bytes(original)

    def test_shared_configuration_changes_demo_contact(self):
        path = self.repo / 'content/templates.json'
        original = path.read_bytes()
        data = json.loads(original)
        config = next(item for item in data['templates'] if item['id'] == 'oficina')
        config.update(business_name='Oficina de teste', whatsapp='5511987654321', phone='(11) 98765-4321')
        path.write_text(json.dumps(data))
        try:
            self.goto('/oficina/')
            expect(self.page.locator('[data-site-name]')).to_have_text('Oficina de teste')
            self.assertTrue(all('/5511987654321' in link.get_attribute('href') for link in self.page.locator('a[href*="wa.me/"]').all()))
            self.assertEqual(self.page.evaluate('window.WL_CONFIG.whatsapp'), '5511987654321')
        finally:
            path.write_bytes(original)

    def test_decap_editor_publishes_shared_content(self):
        path = self.repo / 'content/site.json'
        original = path.read_bytes()
        try:
            self.goto('/admin/')
            self.page.get_by_role('button', name='Entrar', exact=True).click(timeout=15000)
            self.page.get_by_text('Empresa e vitrine', exact=True).click()
            self.page.locator('textarea[id^="description-field-"]').first.fill('Descrição publicada pelo CMS no teste.')
            self.page.get_by_role('button', name='Publicar', exact=True).click()
            self.page.get_by_text('Publicar agora', exact=True).click()
            self.page.wait_for_function('!document.body.innerText.includes("Publicando")')
            deadline = time.monotonic() + 10
            while time.monotonic() < deadline:
                if json.loads(path.read_text())['company']['description'] == 'Descrição publicada pelo CMS no teste.':
                    break
                time.sleep(.1)
            else:
                self.fail('CMS did not write the updated content')
            self.goto('/')
            expect(self.page.locator('[data-company-description]')).to_have_text('Descrição publicada pelo CMS no teste.')
        finally:
            path.write_bytes(original)


if __name__ == '__main__':
    unittest.main()
