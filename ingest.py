import json
import urllib.request
import re

urls = []
with open("ingestion_queue.txt", "r", encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if line.startswith("http"):
            urls.append(line)

parsed = []
for u in urls:
    try:
        req = urllib.request.Request(f'https://publish.twitter.com/oembed?url={u}')
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            html = data.get('html', '')
            
            p_match = re.search(r'<p[^>]*>(.*?)</p>', html, re.DOTALL | re.IGNORECASE)
            text = ""
            if p_match:
                text = re.sub(r'<[^>]+>', '', p_match.group(1)).strip()
            
            a_matches = re.findall(r'<a href="[^"]+">([^<]+)</a>', html)
            date = a_matches[-1] if a_matches else ""
            
            parsed.append({
                "url": u,
                "text": text,
                "date": date
            })
    except Exception as e:
        print("Error fetching", u, e)

with open("ingest_out.json", "w", encoding="utf-8") as f:
    json.dump(parsed, f, indent=2)
