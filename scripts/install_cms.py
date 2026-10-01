"""Install the pinned, standalone Decap bundle with npm artifact verification."""
from pathlib import Path
from urllib.request import urlopen
import base64
import hashlib
import io
import json
import tarfile

root = Path(__file__).resolve().parents[1]
lock = json.loads((root / 'scripts/cms-bundle.lock.json').read_text())
with urlopen(lock['url'], timeout=90) as response:
    archive = response.read()
algorithm, expected = lock['integrity'].split('-', 1)
if algorithm != 'sha512':
    raise ValueError('Unsupported integrity algorithm')
actual = base64.b64encode(hashlib.sha512(archive).digest()).decode()
if actual != expected:
    raise ValueError('Decap artifact integrity mismatch')
destination = root / 'admin/vendor'
destination.mkdir(parents=True, exist_ok=True)
with tarfile.open(fileobj=io.BytesIO(archive), mode='r:gz') as bundle:
    # Extract only the standalone bundle; never extract paths from the archive.
    for name in ['decap-cms.js', 'decap-cms.js.LICENSE.txt']:
        member = bundle.extractfile('package/dist/' + name)
        if member is None:
            raise ValueError('Standalone bundle file missing: ' + name)
        (destination / name).write_bytes(member.read())
print(f"Decap CMS {lock['version']} installed; SHA-512 verified.")
