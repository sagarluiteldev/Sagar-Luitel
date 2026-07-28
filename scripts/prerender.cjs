const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.join(__dirname, '..');
const distPath = path.join(rootDir, 'dist');
const indexHtmlPath = path.join(distPath, 'index.html');
const srcMainPath = path.join(rootDir, 'src/main.js');

if (!fs.existsSync(indexHtmlPath)) {
  console.error("Error: dist/index.html not found. Please run 'npm run build' first.");
  process.exit(1);
}

// 1. Read dist/index.html (our HTML shell)
const shellHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// 2. Read src/main.js to extract projects and template rendering logic
let code = fs.readFileSync(srcMainPath, 'utf8');

// Clean up main.js code for Node.js VM evaluation
code = code.replace(/import\s+[\s\S]*?;\s*/g, '');
code = code.replace(/gsap\.registerPlugin[\s\S]*?;/g, '');
code = code.replace(/document\.body\.classList\.remove[\s\S]*?;/g, '');
code = code.replace(/initSoundSystem\(\);?/g, '');
code = code.replace(/runPreloader\(\)\.then\(initSite\);/g, '');
code = code.replace(/window\.addEventListener\("load",[\s\S]*?\);\s*$/g, '');

// Expose variables at the end
code += `\n;({ projects, renderAboutPage, renderContactPage, renderWorkPage, renderCasePage, renderChrome, renderTopNav, renderStandardFooter });`;

// Mock browser environment for the VM
const context = {
  window: {
    location: { pathname: '/', href: 'https://sagarluitel.com/' },
    innerWidth: 1920,
    history: { pushState: () => {} },
    addEventListener: () => {},
    matchMedia: () => ({ matches: false }),
    setInterval: () => {},
    scrollTo: () => {},
  },
  navigator: { userAgent: 'node' },
  sessionStorage: { getItem: () => null, removeItem: () => {} },
  document: {
    documentElement: { classList: { add: () => {}, remove: () => {} } },
    body: {
      classList: { add: () => {}, remove: () => {}, remove: () => {} },
      insertAdjacentHTML: (pos, html) => { context.insertedHTML = html; }
    },
    addEventListener: () => {},
    querySelector: (sel) => {
      return {
        remove: () => {},
        setAttribute: () => {},
        insertAdjacentHTML: (pos, html) => { context.insertedHTML = html; }
      };
    },
    querySelectorAll: () => []
  },
  gsap: {
    registerPlugin: () => {},
    timeline: () => ({
      to: () => ({ to: () => ({ to: () => {} }) })
    }),
    set: () => {},
    to: () => {},
    from: () => {},
    utils: { toArray: () => [] }
  },
  ScrollTrigger: { getAll: () => [], registerPlugin: () => {} },
  LocomotiveScroll: class {},
  LazyLoad: class {},
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  console: console,
  insertedHTML: ''
};

// Create a sandbox context and run the cleaned main.js code
vm.createContext(context);
let mainExports;
try {
  mainExports = vm.runInContext(code, context);
  console.log("Successfully evaluated main.js for prerendering!");
} catch (err) {
  console.error("Failed to evaluate main.js:", err);
  process.exit(1);
}

const { projects, renderAboutPage, renderContactPage, renderWorkPage, renderCasePage } = mainExports;

// Helper to generate a pre-rendered HTML file for a route
function prerenderRoute({ routePath, title, description, bodyClass, renderFn }) {
  console.log(`Prerendering route: ${routePath}`);
  
  // Set window location for route context
  context.window.location.pathname = routePath;
  context.window.location.href = `https://sagarluitel.com${routePath}`;
  context.insertedHTML = '';
  
  // Execute the template rendering function
  renderFn();
  const renderedContent = context.insertedHTML;
  
  if (!renderedContent) {
    console.error(`Error: Pre-rendered content is empty for ${routePath}`);
    return;
  }

  // Perform replacements on the shell HTML to set route-specific metadata and main content
  let pageHtml = shellHtml;
  
  // Replace title
  pageHtml = pageHtml.replace(
    /<title>.*?<\/title>/,
    `<title>${title}</title>`
  );
  
  // Replace meta description
  pageHtml = pageHtml.replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${description}" />`
  );
  
  // Replace Open Graph title and description
  pageHtml = pageHtml.replace(
    /<meta property="og:title" content=".*?" \/>/,
    `<meta property="og:title" content="${title}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta property="og:description" content=".*?" \/>/,
    `<meta property="og:description" content="${description}" />`
  );
  
  // Replace Twitter card title and description
  pageHtml = pageHtml.replace(
    /<meta name="twitter:title" content=".*?" \/>/,
    `<meta name="twitter:title" content="${title}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta name="twitter:description" content=".*?" \/>/,
    `<meta name="twitter:description" content="${description}" />`
  );

  // Replace canonical and Open Graph URL
  pageHtml = pageHtml.replace(
    /<link rel="canonical" href=".*?" \/>/,
    `<link rel="canonical" href="https://sagarluitel.com${routePath}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta property="og:url" content=".*?" \/>/,
    `<meta property="og:url" content="https://sagarluitel.com${routePath}" />`
  );

  // Set the body class
  pageHtml = pageHtml.replace(
    /<body([\s\S]*?)data-barba="wrapper">/,
    `<body$1class="${bodyClass}" data-barba="wrapper">`
  );

  // Replace <main>...</main> homepage content with the pre-rendered page content
  // We match everything inside and including the outer <main id="home" ...>...</main> tag
  pageHtml = pageHtml.replace(
    /<main id="home"([\s\S]*?)<\/main>/,
    renderedContent
  );

  // Determine target directory and index.html path
  const targetDir = path.join(distPath, routePath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(targetDir, 'index.html'), pageHtml, 'utf8');
}

// 3. Define and render standard routes
const standardRoutes = [
  {
    routePath: '/work',
    title: 'Work — Sagar Luitel | Full Stack & Frontend Developer, UI/UX Designer Nepal',
    description: 'Portfolio of Sagar Luitel — freelance full stack & frontend developer, UI/UX designer in Nepal. View projects including 3D configurators, e-commerce platforms, SAAS apps, and interactive 3D web applications.',
    bodyClass: 'work-route',
    renderFn: renderWorkPage
  },
  {
    routePath: '/about',
    title: 'About — Sagar Luitel | Full Stack & Frontend Developer, UI/UX Designer in Nepal',
    description: 'About Sagar Luitel — freelance full stack developer, frontend engineer, and UI/UX designer in Pokhara, Nepal. Specializing in React, Next.js, Node.js, and Three.js.',
    bodyClass: 'about-route',
    renderFn: renderAboutPage
  },
  {
    routePath: '/contact',
    title: 'Contact — Hire Sagar Luitel | Full Stack Developer & UI/UX Designer in Nepal',
    description: 'Hire Sagar Luitel — freelance full stack developer, frontend engineer, and UI/UX designer in Nepal. Get in touch for custom web development, interactive user interfaces, and full stack systems.',
    bodyClass: 'contact-route',
    renderFn: renderContactPage
  }
];

standardRoutes.forEach(prerenderRoute);

// 4. Define and render project subroutes
projects.forEach(project => {
  prerenderRoute({
    routePath: `/work/${project.slug}`,
    title: `${project.title} — Sagar Luitel | Full Stack & Frontend Developer Nepal`,
    description: `${project.title} — ${project.service}. Case study by Sagar Luitel, freelance full stack developer, frontend engineer, and UI/UX designer in Nepal. Built with ${project.tech.slice(0, 3).join(', ')}.`,
    bodyClass: 'case-route',
    renderFn: () => renderCasePage(project)
  });
});

console.log("Pre-rendering completed successfully!");
