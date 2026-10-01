"""Build a deployable static directory, excluding tools and local configuration."""
from pathlib import Path
import shutil

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
print('Static site built in dist/.')
