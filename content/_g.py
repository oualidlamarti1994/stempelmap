GUIDES = {}
def G(gid, links, de, en):
    assert gid not in GUIDES, gid
    def pack(t):
        steps, docs, cost, tip = t
        return {"steps": steps, "docs": docs, "cost": cost, "tip": tip}
    GUIDES[gid] = {"links": links, "de": pack(de), "en": pack(en)}
