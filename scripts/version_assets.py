"""Version local CSS and JavaScript URLs by content, including under a subpath."""
from hashlib import sha256
from pathlib import Path
import re
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit

ASSET_URL = re.compile(r'\b(?P<attribute>href|src)=(?P<quote>[\"\'])(?P<url>[^\"\']+)(?P=quote)', re.IGNORECASE)


def version_html_assets(root: Path):
    root = root.resolve()
    for page in root.rglob('*.html'):
        def replace(match):
            url = urlsplit(match['url'])
            if url.scheme or url.netloc or not url.path.endswith(('.css', '.js')):
                return match[0]
            asset = (root / url.path.lstrip('/') if url.path.startswith('/') else page.parent / url.path).resolve()
            if not asset.is_relative_to(root) or not asset.is_file():
                return match[0]
            version = sha256(asset.read_bytes()).hexdigest()[:12]
            query = [(key, value) for key, value in parse_qsl(url.query, keep_blank_values=True) if key != 'v']
            query.append(('v', version))
            updated = urlunsplit((url.scheme, url.netloc, url.path, urlencode(query), url.fragment))
            return f'{match["attribute"]}={match["quote"]}{updated}{match["quote"]}'
        original = page.read_text()
        updated = ASSET_URL.sub(replace, original)
        if updated != original:
            page.write_text(updated)
