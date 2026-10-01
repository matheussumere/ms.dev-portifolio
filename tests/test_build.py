from hashlib import sha256
from pathlib import Path
import sys
from tempfile import TemporaryDirectory
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
from version_assets import version_html_assets


class BuildTests(unittest.TestCase):
    def test_asset_versions_work_for_nested_pages_and_update_with_content(self):
        with TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'shared').mkdir()
            (root / 'oficina').mkdir()
            css = root / 'shared/design.css'
            css.write_text('body { color: black; }')
            page = root / 'oficina/index.html'
            page.write_text('<link href="../shared/design.css?mode=demo&v=old#style"><script src="https://cdn.example.com/external.js"></script><script src="missing.js"></script>')
            version_html_assets(root)
            first = page.read_text()
            self.assertIn(f'v={sha256(css.read_bytes()).hexdigest()[:12]}#style', first)
            self.assertIn('mode=demo', first)
            self.assertIn('src="https://cdn.example.com/external.js"', first)
            self.assertIn('src="missing.js"', first)
            version_html_assets(root)
            self.assertEqual(first, page.read_text())
            css.write_text('body { color: blue; }')
            version_html_assets(root)
            self.assertNotEqual(first, page.read_text())
            self.assertEqual(page.read_text().count('v='), 1)
