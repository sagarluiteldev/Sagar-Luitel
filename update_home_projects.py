import re

html_file = "index.html"
with open(html_file, "r") as f:
    content = f.read()

# Define the new list of projects
projects = [
    {
        "title": "3D Bike Configurator",
        "category": "3D Configurator",
        "year": "2024",
        "slug": "3d-bike-configurator",
        "accent": "#0F7BFF",
        "image": "/assets/bike-configurator-mockup.jpg",
        "art_class": "project-art--one"
    },
    {
        "title": "Dobby Haircare",
        "category": "Luxury E-Commerce Platform",
        "year": "2026",
        "slug": "dobby-haircare",
        "accent": "#0F7BFF",
        "image": "/assets/dobby-mockup.jpg",
        "art_class": "project-art--three"
    },
    {
        "title": "Digital Voting Portal",
        "category": "Tamper-Proof Voting System",
        "year": "2026",
        "slug": "digital-voting",
        "accent": "#49A77B",
        "image": "/assets/digital-voting-mockup.jpg",
        "art_class": "project-art--four"
    },
    {
        "title": "Save Wildlife",
        "category": "Conservation Platform",
        "year": "2026",
        "slug": "save-wildlife",
        "accent": "#49A77B",
        "image": "/assets/save-wildlife-mockup.jpg",
        "art_class": "project-art--three"
    },
    {
        "title": "myRestro(SAAS) Manager",
        "category": "SAAS Restaurant Manager",
        "year": "2024",
        "slug": "myrestro-manager",
        "accent": "#5299FF",
        "image": "/assets/myrestro-manager-mockup.jpg",
        "art_class": "project-art--two"
    }
]

# 1. Update floating-preview__track
track_html = []
for p in projects:
    track_html.append(f'''            <div class="floating-preview__item" style="height: {100/len(projects)}%;">
              <div class="project-art {p["art_class"]}" style="--project-accent: {p["accent"]}; padding: 0; background: none; isolation: isolate;">
                <img src="{p["image"]}" alt="{p["title"]}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 2; border-radius: inherit;" />
              </div>
            </div>''')

new_track = '<div class="floating-preview__track" style="height: ' + str(len(projects)*100) + '%;">\n' + "\n".join(track_html) + '\n          </div>'
content = re.sub(r'<div class="floating-preview__track"[^>]*>.*?</div>\s*</div>\s*</div>', new_track + '\n        </div>\n      </div>', content, flags=re.DOTALL)

# 2. Update work-list__items
list_html = []
for i, p in enumerate(projects):
    list_html.append(f'''              <li class="work-row" data-preview="{i}">
                <span class="stripe reveal-stripe"></span>
                <a href="/work/{p["slug"]}/">
                  <h3><span>{p["title"]}</span></h3>
                  <p>{p["category"]}</p>
                </a>
              </li>''')

new_list = '<ul class="work-list__items">\n' + "\n".join(list_html) + '\n            </ul>'
content = re.sub(r'<ul class="work-list__items">.*?</ul>', new_list, content, flags=re.DOTALL)

# 3. Update work-tiles ul
tiles_html = []
for p in projects:
    tiles_html.append(f'''              <li class="fade-up">
                <a href="/work/{p["slug"]}/">
                  <div class="project-art {p["art_class"]}" style="--project-accent: {p["accent"]}; padding: 0; background: none; isolation: isolate;">
                <img src="{p["image"]}" alt="{p["title"]}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 2; border-radius: inherit;" />
              </div>
                  <h3>{p["title"]}</h3>
                  <span class="stripe"></span>
                  <p>{p["category"]}</p>
                  <p>{p["year"]}</p>
                </a>
              </li>''')

new_tiles = '<ul>\n' + "\n".join(tiles_html) + '\n            </ul>'
content = re.sub(r'<section class="work-tiles section" data-scroll-section>\s*<div class="container">\s*<ul>.*?</ul>', '<section class="work-tiles section" data-scroll-section>\n          <div class="container">\n            ' + new_tiles, content, flags=re.DOTALL)

with open(html_file, "w") as f:
    f.write(content)

print("Updated index.html successfully.")
