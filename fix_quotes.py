with open("index.html", "r") as f:
    content = f.read()

content = content.replace('"; padding: 0; background: none; isolation: isolate;">', '; padding: 0; background: none; isolation: isolate;">')

with open("index.html", "w") as f:
    f.write(content)
