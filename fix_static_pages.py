import re, json, pathlib
P = pathlib.Path("public")

def edit(path, pairs):
    f = P / path
    s = f.read_text(encoding="utf8")
    for old, new in pairs:
        if old not in s:
            print(f"  !! not found in {path}: {old[:70]}")
            continue
        s = s.replace(old, new)
    f.write_text(s, encoding="utf8")
    print("edited", path)

SITE = "https://ashutoshwrites.online"

# 1) Article pages: point og/twitter/Article image at a file that exists today (1200x630).
edit("static-blogs/ai-personal-finance-2026.html", [
    (f"{SITE}/static-blogs/og-ai-personal-finance-2026.jpg", f"{SITE}/og-cover.jpg"),
    ("21 sourced statistics, 6 structural trends, and the risks most coverage misses \u2014 a data-driven look at how AI is reshaping personal finance in 2026. Updated October 2026.",
     "21 sourced statistics, 6 structural trends and the risks most AI finance coverage misses: a data-driven look at AI in personal finance in 2026."),
])
edit("static-blogs/ai-authenticity-premium-2026.html", [
    (f"{SITE}/static-blogs/og-ai-authenticity-premium-2026.jpg", f"{SITE}/og-cover.jpg"),
])
edit("static-blogs/byoa-shadow-ai-blog.html", [
    (f"{SITE}/static-blogs/og-byoa-shadow-ai-blog.jpg", f"{SITE}/og-cover.jpg"),
])

# 2) Visa article: real image, real size, one brand name, linked author entity, no fake logo URL.
visa = "visa-agentic-commerce-disputes-seo.html"
f = P / visa
s = f.read_text(encoding="utf8")
s = s.replace(f"{SITE}/visa-agentic-commerce-dispute-seo-thumbnail.png", f"{SITE}/hero-authorization-confirmed.png")
s = s.replace('<meta property="og:image:width" content="1280">', '<meta property="og:image:width" content="1200">')
s = s.replace('<meta property="og:image:height" content="720">', '<meta property="og:image:height" content="640">')
s = s.replace('"width": 1280,\n        "height": 720,', '"width": 1200,\n        "height": 640,')
s = s.replace('<meta property="og:site_name" content="Ashutosh Mahapatra \u2014 Fintech &amp; AI Writing">', '<meta property="og:site_name" content="Ashutosh Writes">')
s = s.replace('<meta property="article:author" content="https://ashutoshwrites.online">', f'<meta property="article:author" content="{SITE}/author/ashutosh-mahapatra">')
old_block = re.search(r'"author": \{\s*"@type": "Person",\s*"name": "Ashutosh Mahapatra",\s*"url": "https://ashutoshwrites.online"\s*\},\s*"publisher": \{.*?"height": 512\s*\}\s*\}', s, re.S)
assert old_block, "author/publisher block not found"
new_block = '''"author": {
        "@type": "Person",
        "@id": "https://ashutoshwrites.online/#person",
        "name": "Ashutosh Mahapatra",
        "url": "https://ashutoshwrites.online/author/ashutosh-mahapatra",
        "sameAs": ["https://linkedin.com/in/ashutosh-mahapatra"]
      },
      "publisher": {
        "@type": "Organization",
        "@id": "https://ashutoshwrites.online/#service",
        "name": "Ashutosh Writes",
        "url": "https://ashutoshwrites.online/"
      }'''
s = s[:old_block.start()] + new_block + s[old_block.end():]
crumb = '''    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ashutoshwrites.online/" },
        { "@type": "ListItem", "position": 2, "name": "Research", "item": "https://ashutoshwrites.online/research" },
        { "@type": "ListItem", "position": 3, "name": "Visa agentic commerce dispute rules", "item": "https://ashutoshwrites.online/visa-agentic-commerce-disputes-seo.html" }
      ]
    },
'''
marker = '    {\n      "@type": "FAQPage",'
assert marker in s, "FAQPage marker not found"
s = s.replace(marker, crumb + marker, 1)
f.write_text(s, encoding="utf8")
ld = re.search(r'<script type="application/ld\+json">([\s\S]*?)</script>', s).group(1)
json.loads(ld)
print("edited", visa, "(JSON-LD parses)")
