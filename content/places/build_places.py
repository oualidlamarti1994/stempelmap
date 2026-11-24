"""Builds public/places/*.json from Wikidata exports (gemeinden.csv, kreise.csv). Run: python -I content/places/build_places.py"""
import csv, json, os, collections
D = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(D, '..', '..', 'public', 'places')
os.makedirs(OUT, exist_ok=True)
def best(o, n):
    n = n.strip()
    if not o: return n
    return n if n.startswith('https') and not o.startswith('https') else o
G = {}
for r in csv.DictReader(open(os.path.join(D, 'gemeinden.csv'), encoding='utf8')):
    g = G.setdefault(r['ags'], {'n': r['name'], 'w': '', 'p': 0}); g['w'] = best(g['w'], r['web'])
    try: g['p'] = max(g['p'], int(float(r['pop'] or 0)))
    except ValueError: pass
K = {}
for r in csv.DictReader(open(os.path.join(D, 'kreise.csv'), encoding='utf8')):
    k = K.setdefault(r['ks'], {'n': r['name'], 'w': ''}); k['w'] = best(k['w'], r['web'])
G['02000000']['w'] = 'https://www.hamburg.de/'
idx = sorted(([g['n'], a, round(g['p'] / 1000, 1)] for a, g in G.items()), key=lambda x: -x[2])
json.dump(idx, open(os.path.join(OUT, 'index.json'), 'w', encoding='utf8'), ensure_ascii=False, separators=(',', ':'))
by = collections.defaultdict(lambda: {'g': {}, 'k': {}})
for a, g in G.items(): by[a[:2]]['g'][a] = g['w']
for ks, k in K.items(): by[ks[:2]]['k'][ks] = [k['n'], k['w']]
for s, v in by.items():
    if len(s) == 2 and s.isdigit(): json.dump(v, open(os.path.join(OUT, s + '.json'), 'w', encoding='utf8'), ensure_ascii=False, separators=(',', ':'))
print(len(idx), 'places,', len(K), 'districts')
