import sys
import re

with open("index.html", "r") as f:
    content = f.read()

projects = [
    {"title": "3D Bike Configurator", "image": "/assets/bike-configurator-mockup.jpg"},
    {"title": "myRestro(SAAS) Manager", "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"},
    {"title": "Save Wildlife", "image": "/assets/save-wildlife-mockup.jpg"},
    {"title": "Into Pokhara", "image": "/assets/into-pokhara-mockup.jpg"},
    {"title": "Porsche Concept", "image": "/assets/porsche-mockup.jpg"},
    {"title": "Project Peak", "image": "/assets/project-peak-mockup.jpg"},
    {"title": "Dobby Haircare", "image": "/assets/dobby-mockup.jpg"},
    {"title": "Digital Voting Portal", "image": "/assets/digital-voting-mockup.jpg"},
    {"title": "Everest Adventures", "image": "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=800&q=80"},
    {"title": "3D Museum Concept", "image": "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=800&q=80"}
]

pattern = r'(<div class="project-art[^>]+>)\s*<span></span><span></span><span></span>\s*</div>'

def repl(match, idx):
    project = projects[idx[0] % 10]
    idx[0] += 1
    
    div_start = match.group(1)
    new_div = div_start.replace('">', '"; padding: 0; background: none; isolation: isolate;">')
    img_tag = f'\n                <img src="{project["image"]}" alt="{project["title"]}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 2; border-radius: inherit;" />\n              </div>'
    return new_div + img_tag

idx = [0]
content = re.sub(pattern, lambda m: repl(m, idx), content)

with open("index.html", "w") as f:
    f.write(content)

print(f"Replaced {idx[0]} occurrences in index.html")
