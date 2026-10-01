"""Capture real template layouts without depending on external fonts or images."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import json
import os
import re
import shutil
import threading
from playwright.sync_api import sync_playwright

root = Path(__file__).resolve().parents[1]


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


server = ThreadingHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(root)))
thread = threading.Thread(target=server.serve_forever, daemon=True)
thread.start()
base = f'http://127.0.0.1:{server.server_port}'
try:
    with sync_playwright() as playwright:
        chrome = os.environ.get('CHROMIUM_PATH') or shutil.which('chromium') or shutil.which('google-chrome')
        browser = playwright.chromium.launch(**({'executable_path':chrome} if chrome else {}), headless=True)
        context = browser.new_context(viewport={'width':1200, 'height':800}, device_scale_factor=1, reduced_motion='reduce')
        context.route('**/*', lambda route: route.continue_() if route.request.url.startswith(base + '/') else route.abort())
        for demo in json.loads((root / 'content/site.json').read_text())['demos']:
            slug = demo['id']
            if not re.fullmatch('[a-z0-9-]+', slug):
                raise ValueError('Invalid template ID')
            page = context.new_page()
            page.goto(base + '/' + slug + '/', wait_until='networkidle')
            page.screenshot(path=str(root / 'assets/previews' / (slug + '.jpg')), type='jpeg', quality=75, animations='disabled')
            page.close()
        browser.close()
    print('Template previews updated.')
finally:
    server.shutdown()
    server.server_close()
    thread.join()
