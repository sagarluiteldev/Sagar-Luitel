import sys
import re

with open("src/main.js", "r") as f:
    content = f.read()

# Add image property to all projects
replacements = {
    '"3d-bike-configurator"': 'image: "/assets/bike-configurator-mockup.jpg",',
    '"myrestro-manager"': 'image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",',
    '"save-wildlife"': 'image: "/assets/save-wildlife-mockup.jpg",',
    '"into-pokhara"': 'image: "/assets/into-pokhara-mockup.jpg",',
    '"porsche-concept"': 'image: "/assets/porsche-mockup.jpg",',
    '"project-peak"': 'image: "/assets/project-peak-mockup.jpg",',
    '"dobby-haircare"': 'image: "/assets/dobby-mockup.jpg",',
    '"digital-voting"': 'image: "/assets/digital-voting-mockup.jpg",',
    '"everest-adventures"': 'image: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=800&q=80",',
    '"3d-museum-concept"': 'image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=800&q=80",'
}

for slug, img_prop in replacements.items():
    # Find the block for this slug
    pattern = r'(slug:\s*' + slug + r'.*?)(summary:)'
    def repl(m):
        # if it already has image, skip
        if "image:" in m.group(1):
            return re.sub(r'image:.*?,', img_prop, m.group(1)) + m.group(2)
        return m.group(1) + img_prop + "\n    " + m.group(2)
    content = re.sub(pattern, repl, content, flags=re.DOTALL)

# Update renderArt function
old_render = """const renderArt = (project, extraClass = "") => `
  <div class="project-art ${project.artClass} ${extraClass}" style="--project-accent: ${project.accent}">
    <span></span><span></span><span></span>
  </div>
`;"""

new_render = """const renderArt = (project, extraClass = "") => {
  if (project.image) {
    return `
      <div class="project-art ${extraClass}" style="--project-accent: ${project.accent}; padding: 0; background: none; isolation: isolate;">
        <img src="${project.image}" alt="${project.title}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 2; border-radius: inherit;" />
      </div>
    `;
  }
  return `
    <div class="project-art ${project.artClass} ${extraClass}" style="--project-accent: ${project.accent}">
      <span></span><span></span><span></span>
    </div>
  `;
};"""

content = content.replace(old_render, new_render)

with open("src/main.js", "w") as f:
    f.write(content)
