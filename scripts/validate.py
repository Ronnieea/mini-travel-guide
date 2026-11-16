"""Validate Mini Travel Guide's city data against AGENTS.md schema."""
import json
import re
from pathlib import Path

root = Path(__file__).resolve().parents[1]
data = json.loads((root / 'data/cities.json').read_text(encoding='utf-8'))
assert isinstance(data, list) and data, 'cities.json must be a nonempty array'
keys = {'id','name','englishName','region','regionLabel','tagline','description','emoji','theme','attractions','foods','transport','tips'}
regions = {'kanto':'關東','kansai':'關西','hokkaido':'北海道','kyushu':'九州'}
themes = {'tokyo','kyoto','osaka','sapporo'}
ids = set()
for c in data:
    assert isinstance(c, dict) and set(c) == keys, f'Invalid city keys: {c.get("id")}'
    assert isinstance(c['id'], str) and re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', c['id']), 'Invalid ID'
    assert c['id'] not in ids, 'Duplicate ID'
    ids.add(c['id'])
    assert c['region'] in regions and c['regionLabel'] == regions[c['region']], 'Invalid region'
    assert c['theme'] in themes, 'Invalid theme'
    for k in ('name','englishName','tagline','description','emoji','transport','tips'):
        assert isinstance(c[k],str) and c[k].strip(), f'Invalid {k}'
    assert isinstance(c['attractions'],list) and len(c['attractions']) == 3, 'Must have 3 attractions'
    for a in c['attractions']:
        assert isinstance(a,dict) and set(a)=={'name','description'}, 'Invalid attraction keys'
        assert all(isinstance(v,str) and v.strip() for v in a.values()), 'Invalid attraction content'
    assert isinstance(c['foods'],list) and len(c['foods'])==3 and all(isinstance(f,str) and f.strip() for f in c['foods']), 'Invalid foods'
print(f'PASS: {len(data)} cities validated: {", ".join(sorted(ids))}')
