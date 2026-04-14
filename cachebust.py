import os
import glob

html_files = glob.glob('*.html')
for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    if 'v=2.00' in content:
        content = content.replace('v=2.00', 'v=2.10')
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
