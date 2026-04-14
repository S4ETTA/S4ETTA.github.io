import os
import glob

html_files = glob.glob('*.html')
for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    if 'v=1.60' in content:
        content = content.replace('v=1.60', 'v=2.00')
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
