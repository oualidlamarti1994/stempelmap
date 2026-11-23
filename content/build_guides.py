import json, sys, pathlib, importlib
here = pathlib.Path(__file__).parent; sys.path.insert(0, str(here))
import _g
for n in ("guides_1", "guides_2", "guides_3", "guides_4"): importlib.import_module(n)
src = (here.parent / "src" / "data.ts").read_text(encoding="utf-8")
import re
ids = re.findall(r"e\('([a-z_0-9]+)'", src)
missing = [i for i in ids if i not in _g.GUIDES]; extra = [g for g in _g.GUIDES if g not in ids]
for gid, g in _g.GUIDES.items():
    for l in ("de", "en"):
        assert g[l]["steps"], gid
    for u in g["links"]: assert u.startswith("https://"), (gid, u)
tdir = here / "translations"
counts = {}
if tdir.exists():
    for f in tdir.glob("*.json"):
        lang = f.stem; tr = json.loads(f.read_text(encoding="utf-8")); counts[lang] = len(tr)
        for gid, t in tr.items():
            if gid in _g.GUIDES: _g.GUIDES[gid][lang] = {**t, "ai": True}
print("translations", counts)
(here.parent / "src" / "guides.json").write_text(json.dumps(_g.GUIDES, ensure_ascii=False), encoding="utf-8")
print("guides", len(_g.GUIDES), "errands", len(ids), "missing", missing, "extra", extra)
