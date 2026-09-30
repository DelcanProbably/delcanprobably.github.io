import sys
import os
import pandoc

args = sys.argv
if len(args) < 2:
    sys.exit(0)

for filepath in args[1:]:
    filepath = filepath.replace('\\', '/')
    # if os.path.exists(filepath):
    #     print(f"Cannot find path `{filepath}`")
    #     continue

    with open(filepath, 'r') as f:
        pd = pandoc.read(f.read(), format='markdown')

    html = pandoc.write(pd, file=None, format='html')

    last_line = ""
    for i in range(len(html)):
        line = html[i]
    
    new_filepath = '.'.join(filepath.split('.')[:-1]) + '.html'
