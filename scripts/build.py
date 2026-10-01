"""Build a deployable static directory, excluding tools and local configuration."""
from pathlib import Path
import json
import os
import shutil
import subprocess
from version_assets import version_html_assets

root = Path(__file__).resolve().parents[1]
output = root / 'dist'
if output.exists():
    shutil.rmtree(output)
output.mkdir()
for name in ['index.html', 'CMS.md', 'shared', 'content', 'assets', 'admin', 'oficina', 'salao', 'dentista', 'cardapio', 'artista', 'tatuagem', 'templo', 'curriculo', 'loja', 'give-beauty', 'uploads']:
    source = root / name
    if not source.exists():
        continue
    if source.is_dir():
        shutil.copytree(source, output / name, ignore=shutil.ignore_patterns('*.md', '__pycache__', '*.map', '.env', '.env.*', 'node_modules', '.git'))
    else:
        shutil.copy2(source, output / name)
version_html_assets(output)
(output / '.nojekyll').touch()
commit = os.environ.get('GITHUB_SHA') or subprocess.check_output(
    ['git', 'rev-parse', 'HEAD'], cwd=root, text=True
).strip()
(output / 'deployment.json').write_text(json.dumps({'commit': commit}) + '\n')
print('Static site built in dist/.')
