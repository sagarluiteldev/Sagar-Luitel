import sys

def replace_in_file(filename, old, new):
    with open(filename, "r") as f:
        content = f.read()
    content = content.replace(old, new)
    with open(filename, "w") as f:
        f.write(content)

old_url = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
new_url = '/assets/myrestro-manager-mockup.jpg'

replace_in_file("src/main.js", old_url, new_url)
replace_in_file("index.html", old_url, new_url)
