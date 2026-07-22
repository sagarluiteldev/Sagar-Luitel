import "./styles.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import LazyLoad from "vanilla-lazyload";

gsap.registerPlugin(ScrollTrigger);
window.ScrollTrigger = ScrollTrigger;

document.body.classList.remove("nav-open", "route-transitioning");

const projects = [
  {
    slug: "3d-bike-configurator",
    title: "3D Bike Configurator",
    service: "3D Configurator",
    role: "Interactive & GSAP Development",
    credits: "Code and design: Sagar Luitel",
    location: "Kathmandu ©",
    year: "2024",
    liveUrl: "https://mtb1x.vercel.app/",
    artClass: "project-art--one",
    background: "#C9D5F5",
    accent: "#0F7BFF",
    image: "/assets/bike-configurator-mockup.webp",
    laptopImage: "/assets/laptop mockups/The_website_in_the_second_202605252344 (2).webp",
    summary:
      "A production-grade, highly interactive 3D WebGL bike configurator developed to elevate user customization and engagement for a premium utility bicycle manufacturer. By moving away from static 2D image sheets, this platform allows customers to configure components, frames, colors, and accessories in real-time under naturalistic dynamic lighting. Built upon high-fidelity CAD source data, the app bridges the gap between high-performance interactive 3D renderings and responsive state management across desktop and mobile browsers.",
    tech: ["Three.js", "WebGL", "GSAP", "React State", "CSS Grid"],
    challenge:
      "We faced a double-pronged architectural bottleneck: assets and synchronization. The raw CAD models from the design team exceeded 140MB with hundreds of thousands of polygons, which crashed mobile browsers instantly. Furthermore, dynamically updating paint textures, frame decals, and tire treads while camera coordinates transitioned between component nodes (handlebars, pedals, chainsets) introduced severe garbage collection pauses and frame drops (falling to 15fps) during rapid UI changes.",
    solution:
      "I spearheaded a complete geometry optimization pipeline, using Draco mesh compression and texture baking in Blender to reduce the asset size to 4.2MB without loss of visual fidelity. I engineered a robust state-management solution using a React-like publish-subscribe pattern, ensuring texture swaps and material parameters were updated in a single render call. Finally, I optimized camera movements using GSAP timelines tied to Three.js orbital limits, leveraging requestAnimationFrame throttling to guarantee a locked 60fps across both modern iOS and Android devices.",
  },
  {
    slug: "myrestro-manager",
    title: "myRestro Manager",
    service: "SAAS Restaurant Manager",
    role: "Full Stack & Database Architecture",
    credits: "Code and design: Sagar Luitel",
    location: "Kathmandu ©",
    year: "2024",
    liveUrl: "https://myrestromanager.vercel.app/",
    artClass: "project-art--two",
    background: "#DED5C8",
    accent: "#5299FF",
    image: "/assets/myrestro-manager-mockup.webp",
    laptopImage: "/assets/laptop mockups/The_website_in_the_second_202605252344 (4).webp",
    summary:
      "An enterprise-level, multi-tenant SAAS platform engineered for modern restaurant chains to orchestrate table reservations, real-time order flows, and live kitchen execution pipelines. Unlike traditional POS setups that require proprietary hardware networks, myRestro leverages a cloud-first, serverless architecture that enables instant table synchronization, automated order queue routing, and detailed analytics dashboards. The application serves as the single source of truth for front-of-house staff, kitchen crews, and management alike.",
    tech: ["React.js", "Node.js", "PostgreSQL", "Prisma ORM", "WebSockets", "Chart.js"],
    challenge:
      "During peak dinner hours, concurrent updates from hundreds of active tables created database deadlocks and extreme query latency. Kitchen displays would fail to synchronize with orders placed by waiters, leading to duplicate orders or missed items. Our original implementation relied on HTTP polling, which overwhelmed our database connection pool (PostgreSQL) and created unacceptable latency spikes of up to 8 seconds under high concurrent loads.",
    solution:
      "I redesigned the network layer, migrating from polling to persistent duplex WebSockets with automatic backoff reconnection algorithms. I optimized our database access by writing custom Prisma query filters, applying composite indices on table states, and offloading live order queues to an in-memory Redis cache. For front-end rendering, I implemented React virtualized lists and memoized chart states, ensuring smooth rendering performance even as high-volume data points streamed in continuously.",
  },
  {
    slug: "save-wildlife",
    title: "Save Wildlife",
    service: "Conservation Platform",
    role: "Nuxt & GSAP Development",
    credits: "Code and design: Sagar Luitel",
    location: "Kathmandu ©",
    year: "2026",
    liveUrl: "https://savewildlife.vercel.app/",
    artClass: "project-art--three",
    background: "#C8DBD0",
    accent: "#49A77B",
    image: "/assets/save-wildlife-mockup.webp",
    laptopImage: "/assets/laptop mockups/The_website_in_the_second_202605252343.webp",
    summary:
      "An immersive scrollytelling editorial platform designed for a global conservation non-profit to drive public engagement and raise funds. The platform translates complex ecological datasets and species migration coordinates into interactive maps, cinematic scroll transitions, and spatial audio backdrops. By combining storytelling with data visualization, we transformed cold statistics into a highly moving, interactive reading journey that connects users directly to wildlife protection zones.",
    tech: ["Nuxt.js", "Vue 3", "GSAP ScrollTrigger", "Tailwind CSS", "Contentful CMS"],
    challenge:
      "The client required full-resolution photography, embedded video backdrops, and interactive scroll triggers on every section. However, compiling these media assets caused Google Lighthouse Core Web Vitals to plummet, specifically on Largest Contentful Paint (LCP) and Interaction to Next Paint (INP). Standard lazy-loading broke GSAP ScrollTrigger's offset calculations, leading to jumpy scroll jumps and elements overlapping during fast scrolling.",
    solution:
      "I implemented an advanced pre-fetching and progressive image enhancement pipeline, converting high-res assets to WebP/AVIF formats and utilizing low-quality image placeholders (LQIP). I resolved the GSAP layout shifts by binding an event listener to media load states, executing dynamic ScrollTrigger.refresh() recalculations once images/videos loaded. Finally, I offloaded heavy canvas scrollytelling computations to CSS-transform-accelerated layers, boosting the Lighthouse performance score from 48 to 96.",
  },
  {
    slug: "into-pokhara",
    title: "Into Pokhara",
    service: "Nature Editorial Experience",
    role: "GSAP & WebGL Scrollytelling",
    credits: "Code and design: Sagar Luitel",
    location: "Pokhara ©",
    year: "2025",
    liveUrl: "https://intopokhara.vercel.app/",
    artClass: "project-art--four",
    background: "#E3C4BC",
    accent: "#FF805F",
    image: "/assets/into-pokhara-mockup.webp",
    laptopImage: "/assets/laptop mockups/The_website_in_the_second_202605252344.webp",
    summary:
      "A premium digital tourism scrollytelling platform commissioned by the Nepal Tourism Board. Designed as a cinematic virtual tour of Pokhara's lakes and mountains, the site relies on dynamic parallax transitions, ambient music transitions, and vector-drawn scrolly outlines. The site offers visitors an editorial-style narrative experience that adapts dynamically as they scroll, providing an immersive taste of the region's geography and culture.",
    tech: ["GSAP ScrollTrigger", "Locomotive Scroll", "HTML5 Video", "Vanilla CSS"],
    challenge:
      "Synchronizing custom desktop smooth scrolling (handled via Locomotive Scroll) with mobile touch physics created a disjointed experience. On mobile, scroll-driven timelines were laggy and failed to align background mountain silhouettes with foreground callouts. Additionally, rendering auto-playing video backdrops caused significant battery drain and CPU spikes, especially on devices with high-refresh-rate displays.",
    solution:
      "I resolved the synchronization bottleneck by building a custom scroll proxy class in Javascript, bridging Locomotive Scroll's rendering loop directly to GSAP's scroll handler. I designed viewport-dependent CSS media rules that automatically scale down parallax velocities on smaller devices. To handle video playback efficiently, I implemented intersection observers that pause off-screen video wrappers and toggle low-power static images when battery-saver flags are detected in the browser.",
  },
  {
    slug: "porsche-concept",
    title: "Porsche Concept",
    service: "3D Porsche Showroom",
    role: "Three.js & WebGL Development",
    credits: "Code and design: Sagar Luitel",
    location: "Kathmandu ©",
    year: "2025",
    liveUrl: "https://porscheconcept.vercel.app/",
    artClass: "project-art--one",
    background: "#C9D5F5",
    accent: "#0F7BFF",
    image: "/assets/porsche-mockup.webp",
    laptopImage: "/assets/laptop mockups/The_website_in_the_second_202605252344 (1).webp",
    summary:
      "An interactive 3D concept showroom showcasing next-generation Porsche electric models. Built to replicate the physical luxury of a vehicle showroom, the platform allows users to open doors, trigger charging animation timelines, inspect wheels, and rotate models inside a WebGL sandbox. The app represents a benchmark in combining web-based 3D assets with responsive, high-end web design elements.",
    tech: ["Three.js", "WebGL", "GLSL Shaders", "GSAP ScrollTrigger", "Vite"],
    challenge:
      "Simulating realistic metallic car paint reflections, glass refractions, and carbon fiber weaves requires heavy GPU shader calculations. Standard Three.js PBR materials looked flat and failed to capture the signature Porsche metallic luster. However, adding complex custom shaders and high-resolution cube maps caused mobile GPUs to throttle, dropping the frame rate to single digits.",
    solution:
      "I authored custom GLSL vertex and fragment shaders to simulate real-time specular highlights and fresnel paint shading with minimal texture memory overhead. I baked ambient occlusion maps from high-poly models onto mobile-optimized Three.js meshes, reducing load sizes by 80%. Furthermore, I implemented an adaptive quality controller that monitors frame times and scales down shadow resolutions dynamically on weaker devices to ensure smooth interactions.",
  },
  {
    slug: "architrave",
    title: "Architrave",
    service: "Luxury Architectural Firm",
    role: "Full Stack & Database Architecture",
    credits: "Code and design: Sagar Luitel",
    location: "Kathmandu ©",
    year: "2026",
    liveUrl: "https://architrave.vercel.app/",
    artClass: "project-art--five",
    background: "#DED5C8",
    accent: "#2B2D42",
    image: "/assets/architrave-mockup.webp",
    laptopImage: "/assets/laptop mockups/architrave mockup.webp",
    summary:
      "A high-performance, full-stack housing portal designed to balance complex architectural listings with a minimalist, high-conversion user interface. The platform blends heritage design with modern components, providing visitors with an elegant architectural journey.",
    tech: ["React.js", "Vite", "Tailwind CSS", "GSAP Animations", "Node.js", "Express", "PostgreSQL"],
    challenge:
      "Integrating complex architectural blueprints, high-resolution interior photos, and extensive property listings without causing visual layout shifts or performance lag on mobile web browsers. Additionally, maintaining transaction integrity and security during real-time booking and inquiry flows.",
    solution:
      "I engineered a unified design system using Tailwind and GSAP that eliminated layout shifts and optimized image delivery with modern WebP pipelines. I designed a secure Node.js backend using Express and Zod validations, guaranteeing transaction safety and sanitizing booking queues."
  },
  {
    slug: "project-peak",
    title: "Project Peak",
    service: "Travel Booking Platform",
    role: "React & Animation Architecture",
    credits: "Code and design: Sagar Luitel",
    location: "Kathmandu ©",
    year: "2025",
    liveUrl: "https://projectpeak.vercel.app/",
    artClass: "project-art--two",
    background: "#DED5C8",
    accent: "#FF930F",
    image: "/assets/project-peak-mockup.webp",
    laptopImage: "/assets/laptop mockups/The_website_in_the_second_202605261352.webp",
    summary:
      "A luxury adventure travel booking platform offering bespoke trekking itineraries across the Himalayas. The application features interactive geographic maps showing elevations, path routes, weather statistics, and dynamic booking forms. The interface is optimized to make exploring high-altitude routes visual, inspiring, and straightforward.",
    tech: ["React.js", "Mapbox GL JS", "Framer Motion", "Tailwind CSS", "REST APIs"],
    challenge:
      "Integrating geographic maps (Mapbox GL JS) into a fast React booking flow caused severe memory leaks. As users switched between categories or opened detail panels, map canvases failed to garbage collect, eventually crashing the browser tab. Additionally, querying mountain weather APIs for multiple checkpoints during route switches added significant network delays.",
    solution:
      "I architected an asynchronous React wrapper around Mapbox GL JS, utilizing React's cleanup hooks to explicitly release WebGL contexts and canvas elements upon component unmounting. I built a local caching and state synchronization middleware using Redux, caching route details and weather coordinates. This eliminated redundant API requests and ensured seamless route switches without loading delays.",
  },
  {
    slug: "dobby-haircare",
    title: "Dobby Haircare",
    service: "Luxury E-Commerce Platform",
    role: "React, GSAP & E-Commerce",
    credits: "Code and design: Sagar Luitel",
    location: "Kathmandu ©",
    year: "2026",
    liveUrl: "https://dobby-indol.vercel.app/",
    artClass: "project-art--three",
    background: "#C8DBD0",
    accent: "#0F7BFF",
    image: "/assets/dobby-mockup.webp",
    laptopImage: "/assets/laptop mockups/The_website_in_the_second_202605252344 (3).webp",
    summary:
      "A headless e-commerce application developed for a luxury haircare brand. The project combines a modern frontend experience with a secure Shopify Storefront backend. It features custom-designed product filters, dynamic cart updates, and interactive storytelling layouts that make buying premium products feel tactile and quick.",
    tech: ["React.js", "Shopify API", "GSAP Animations", "Tailwind CSS", "Redux Toolkit"],
    challenge:
      "Traditional e-commerce platforms struggle with page transitions and layout shifts when fetching products. Users expect a luxury site to feel instantaneous, but API fetch cycles for product descriptions, price variants, and inventory updates created noticeable visual jumps and loading spinners that disrupted the purchasing funnel.",
    solution:
      "I built the site as a headless React app utilizing the Shopify Storefront API. I implemented a local state management layer with Redux Toolkit to cache catalog metadata on initial load. I crafted custom GSAP page transitions that run asynchronously during route changes, pre-fetching the destination page's product details so the screen switches instantly without loading indicators.",
  },
  {
    slug: "digital-voting",
    title: "Digital Voting Portal",
    service: "Tamper-Proof Voting System",
    role: "Security & Next.js Architecture",
    credits: "Code and design: Sagar Luitel",
    location: "Kathmandu ©",
    year: "2026",
    liveUrl: "https://digitalvotingnepal.vercel.app/",
    artClass: "project-art--four",
    background: "#E3C4BC",
    accent: "#49A77B",
    image: "/assets/digital-voting-mockup.webp",
    laptopImage: "/assets/laptop mockups/The_website_in_the_second_202605252343 (2).webp",
    summary:
      "A secure, decentralized digital voting portal designed to execute transparent, tamper-proof organizational elections. The platform utilizes blockchain smart contracts to log votes and cryptographic proofs to ensure voter privacy. It represents a model in building secure, accessible Web3 interfaces for everyday administrative workflows.",
    tech: ["Next.js", "Web3.js", "Solidity", "Tailwind CSS", "Ethereum Blockchain"],
    challenge:
      "The primary challenge was security and usability. Blockchain transactions require gas fees and wallet interactions, which confuse standard users. We had to design an interface that handles cryptographic signatures and contract transactions in the background while ensuring complete voter anonymity and mathematical vote immutability.",
    solution:
      "I built a decentralized ballot architecture using Solidity smart contracts on an EVM-compatible chain. I integrated Next.js as the front-end layer using Web3.js to enable wallet validations. To abstract blockchain complexity, I implemented meta-transactions (EIP-712) allowing users to sign votes off-chain, which our server relayer commits to the chain, covering gas costs while guaranteeing voter anonymity.",
  },
  {
    slug: "everest-adventures",
    title: "Everest Adventures",
    service: "Expedition Tracker (In Dev)",
    role: "WebGL & GSAP Orchestration",
    credits: "Code and design: Sagar Luitel",
    location: "Kathmandu ©",
    year: "2026",
    liveUrl: "",
    artClass: "project-art--one",
    background: "#C9D5F5",
    accent: "#FF930F",
    image: "/assets/everest-mockup.webp",
    laptopImage: "/assets/laptop mockups/The_website_in_the_second_202605252343 (3).webp",
    summary:
      "A high-altitude expedition tracker application designed for mountaineering teams and outdoor enthusiasts. The platform provides real-time route tracing, weather integration, and topographic 3D maps of Mt. Everest. It serves as an interactive scrollytelling tool and safety tracker for teams navigating the Himalayas.",
    tech: ["WebGL", "OpenWeather API", "Leaflet.js", "GSAP ScrollTrigger", "Sass"],
    challenge:
      "Rendering detailed 3D topographic models of the Everest region alongside live weather vector wind arrows in real-time caused severe memory bottlenecks. The WebGL rendering loop struggled to update wind particle coordinate buffers without blocking the main browser thread, causing layout lag during scroll events.",
    solution:
      "I optimized the terrain rendering by splitting the mountain mesh into dynamic Level of Detail (LOD) segments, loading high-res textures only for regions near the active camera. I offloaded wind vector math to Web Workers, calculating wind coordinate shifts on a separate thread and feeding results back to a WebGL instanced mesh renderer, keeping the UI fully responsive.",
  },
  {
    slug: "3d-museum-concept",
    title: "3D Museum Concept",
    service: "Virtual Physics Museum (In Dev)",
    role: "Three.js & Audio Integration",
    credits: "Code and design: Sagar Luitel",
    location: "Kathmandu ©",
    year: "2026",
    liveUrl: "https://myartmuseum.vercel.app/",
    artClass: "project-art--two",
    background: "#DED5C8",
    accent: "#2B2D42",
    image: "/assets/3d-museum-mockup-new.webp",
    laptopImage: "/assets/laptop mockups/The_website_in_the_second_202605252343 (1).webp",
    summary:
      "A virtual physics museum concept designed to preserve and exhibit artifacts in an interactive, web-based environment. The platform allows users to walk through an online gallery, interact with exhibits, trigger physical reactions, and experience spatial audio elements that mimic physical gallery acoustics.",
    tech: ["Three.js", "Cannon.js Physics", "Web Audio API", "WebGL", "Sass"],
    challenge:
      "Aligning 3D physics collisions with realistic spatial audio was the core obstacle. Standard browser audio feels flat and fails to capture distance and angle relative to the listener. In addition, running real-time physics simulations alongside heavy 3D mesh render loops threatened performance, dropping frames during complex object interactions.",
    solution:
      "I integrated Three.js with the Cannon.js rigid-body physics engine, optimizing bounding volume hierarchies to keep physics calculations lightweight. I bound collision impact vectors to dynamic Web Audio API panner nodes, adjusting frequency sweeps and panning relative to the listener's virtual ears, creating an immersive, physically authentic gallery environment.",
  },
  {
    slug: "cityscape",
    title: "CityScape",
    service: "Apartment Rentals",
    role: "Full Stack Development & UI Design",
    credits: "Code and design: Sagar Luitel",
    location: "Kathmandu ©",
    year: "2026",
    liveUrl: "https://cityscapeny.vercel.app/",
    artClass: "project-art--three",
    background: "#DED5C8",
    accent: "#564ADE",
    image: "/assets/cityscape-mockup-new.webp",
    laptopImage: "/assets/laptop mockups/cityscape mockup.webp",
    summary:
      "A premium apartment rental platform designed for booking fully equipped stays with stunning interiors and 24/7 guest support in New York City. The platform features an intuitive apartment selection layout, fluid transition effects, interactive maps of NYC neighborhoods, and a streamlined booking checkout flow.",
    tech: ["React.js", "Vite", "GSAP Animations", "Tailwind CSS", "Framer Motion"],
    challenge:
      "Implementing smooth page transitions and filtering across hundreds of active listings while maintaining a fast, layout-shift-free interface. Standard client-side routing caused noticeable lag when reloading heavy gallery layouts with multiple high-res interior photos.",
    solution:
      "I optimized the image assets using responsive image sets and progressive loading. I developed a client-side state caching layer to keep listings in memory and used GSAP to coordinate layout animations during filters, resulting in immediate filtering transitions.",
  },
  {
    slug: "navyata",
    title: "Navyata",
    service: "E-Commerce Boutique",
    role: "Front End & E-Commerce Integration",
    credits: "Code and design: Sagar Luitel",
    location: "Kathmandu ©",
    year: "2026",
    liveUrl: "https://navyata.vercel.app/",
    artClass: "project-art--four",
    background: "#C8DBD0",
    accent: "#49A77B",
    image: "/assets/navyata-mockup-new.webp",
    laptopImage: "/assets/laptop mockups/navyata mockup.webp",
    summary:
      "A modern, high-end fashion and lifestyle e-commerce boutique featuring curated apparel collections. The store combines a minimal aesthetic layout with an interactive shopping cart drawer, rich product detail layouts, and smooth checkout integrations.",
    tech: ["React.js", "Shopify API", "Tailwind CSS", "Redux Toolkit", "GSAP Animations"],
    challenge:
      "Synchronizing Shopify's cart state with the custom client-side React UI without introducing lag or layout shifts during cart updates and removals. Off-the-shelf SDKs introduced multiple roundtrip network delays.",
    solution:
      "I engineered a lightweight Shopify Storefront API middleware wrapper that optimistic-updates the local Redux state immediately upon item addition, while performing the remote sync in the background, making the cart experience feel instantaneous.",
  },
  {
    slug: "viatour",
    title: "Viatour",
    service: "Travel Booking Platform",
    role: "Full Stack & Database Architecture",
    credits: "Code and design: Sagar Luitel",
    location: "Kathmandu ©",
    year: "2026",
    liveUrl: "https://via-tour.vercel.app/",
    artClass: "project-art--one",
    background: "#C9D5F5",
    accent: "#0F7BFF",
    image: "/assets/viatour-mockup-new.webp",
    laptopImage: "/assets/laptop mockups/viatour mockup.webp",
    summary:
      "An interactive, full-stack travel booking application that allows users to discover, compare, and book tailored tour packages worldwide. The system features a responsive search engine with date and destination filters, a secure payment gateway integration, and a dedicated admin console to track reservations and customer reviews.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS", "Stripe API"],
    challenge:
      "Handling high-concurrency booking requests during holiday seasons without double-booking rooms or tour guides. Heavy read-write transactions on tour slots led to database locks and slow response times.",
    solution:
      "I designed a slot reservation system using transaction blocks in PostgreSQL with database-level row locks. I offloaded temporary seat reservations to an in-memory database with automatic TTL (time-to-live) expiration, ensuring slots were held for only 10 minutes during checkout.",
  },
];


const getRouteProject = () => {
  const match = window.location.pathname.match(/^\/work\/([^/]+)\/?$/);
  if (!match) return null;
  return projects.find((project) => project.slug === match[1]) || projects[0];
};

const getNextProject = (project) => {
  const index = projects.findIndex((item) => item.slug === project.slug);
  return projects[(index + 1) % projects.length];
};

const setMetaContent = (selector, value) => {
  const node = document.querySelector(selector);
  if (node) node.setAttribute("content", value);
};

const getPathLabel = (path = window.location.pathname) => {
  const normalizedPath = path.replace(/\/$/, "") || "/";
  if (normalizedPath === "/") return "Home";
  if (normalizedPath === "/work") return "Work";
  if (normalizedPath === "/about") return "About";
  if (normalizedPath === "/contact") return "Contact";

  const project = projects.find((item) => normalizedPath === `/work/${item.slug}`);
  return project?.title || "Sagar Luitel";
};

const renderPreloaderWords = () => {
  const wordsWrap = document.querySelector(".preloader__words");
  if (!wordsWrap) return;

  const greetings = ["Hello", "Hallo", "Bonjour", "こんにちは", "Hei", "Hola", "你好", "مرحبا", "नमस्ते"];

  wordsWrap.innerHTML = greetings
    .map((greeting, index) => {
      const active = index === 0 ? " class=\"is-active\"" : "";
      return `<h2${active}>${greeting}<span></span></h2>`;
    })
    .join("");
};

const renderChrome = (active = "home", cursorText = "View") => `
  <div class="cursor-disc" aria-hidden="true"></div>
  <div class="cursor-label" aria-hidden="true"><p>${cursorText}</p></div>

  <button class="hamburger magnetic" type="button" aria-label="Open navigation" aria-expanded="false">
    <span class="btn-fill"></span>
    <span class="hamburger__bars"></span>
  </button>

  <div class="nav-backdrop" aria-hidden="true"></div>
  <nav class="drawer theme-dark" aria-label="Main navigation">
    <div class="drawer__curve" aria-hidden="true"><span></span></div>
    <div class="drawer__inner">
      <div class="drawer__primary">
        <h5>Navigation</h5>
        <div class="stripe"></div>
        <ul>
          <li><a class="drawer-link magnetic ${active === "home" ? "is-active" : ""}" href="/">Home</a></li>
          <li><a class="drawer-link magnetic ${active === "work" ? "is-active" : ""}" href="/work">Work</a></li>
          <li><a class="drawer-link magnetic ${active === "about" ? "is-active" : ""}" href="/about">About</a></li>
          <li><a class="drawer-link magnetic ${active === "contact" ? "is-active" : ""}" href="/contact">Contact</a></li>
        </ul>
      </div>
      <div class="drawer__socials socials">
        <h5>Socials</h5>
        <div class="stripe"></div>
        <ul>
          <li><a class="magnetic" href="https://github.com/sagarluiteldev" target="_blank" rel="noreferrer">GitHub</a></li>
          <li><a class="magnetic" href="https://www.linkedin.com/in/sagar-luitel-4a510730a" target="_blank" rel="noreferrer">LinkedIn</a></li>
        </ul>
      </div>
    </div>
  </nav>
`;

const renderTopNav = (active = "home", tone = "dark") => `
  <nav class="top-nav ${tone === "light" ? "top-nav--light" : ""}" aria-label="Primary navigation">
    <a class="credit magnetic" href="/">
      <span class="credit__mark">©</span>
      <span class="credit__mask">
        <span class="credit__code">Code by</span>
        <span class="credit__name">Sagar <span>Luitel</span></span>
      </span>
    </a>
    <ul class="top-nav__links">
      <li><a class="nav-link magnetic ${active === "work" ? "is-active" : ""}" href="/work">Work</a></li>
      <li><a class="nav-link magnetic ${active === "about" ? "is-active" : ""}" href="/about">About</a></li>
      <li><a class="nav-link magnetic ${active === "contact" ? "is-active" : ""}" href="/contact">Contact</a></li>
      <li><button class="nav-link nav-link--menu magnetic" type="button">Menu</button></li>
    </ul>
  </nav>
`;

const renderArt = (project, extraClass = "") => {
  if (project.image) {
    return `
      <div class="project-art ${extraClass}" style="--project-accent: ${project.accent}; padding: 0; background: none; isolation: isolate;">
        <img src="${project.image}" alt="${project.title}" loading="lazy" decoding="async" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 2; border-radius: inherit;" />
      </div>
    `;
  }
  return `
    <div class="project-art ${project.artClass} ${extraClass}" style="--project-accent: ${project.accent}">
      <span></span><span></span><span></span>
    </div>
  `;
};

const renderTechIcon = (name) => {
  const norm = name.toLowerCase().trim();
  let iconHtml = "";

  if (norm.includes("gsap") || norm.includes("greensock")) {
    iconHtml = `<svg viewBox="0 0 100 30" style="width: auto; height: 2.3rem;">
      <circle cx="15" cy="15" r="12" fill="#88ce02" />
      <path d="M10 15c2-3 5-3 7 0s5 3 7 0" stroke="#ffffff" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <circle cx="15" cy="15" r="2.5" fill="#ffffff" />
      <text x="34" y="22" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="19" fill="#88ce02" letter-spacing="-0.5">GSAP</text>
    </svg>`;
  } else if (norm.includes("framer") || norm.includes("motion")) {
    iconHtml = `<svg viewBox="0 0 24 24" style="width: 2.3rem; height: 2.3rem;">
      <defs>
        <linearGradient id="framerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00C1FF" />
          <stop offset="50%" stop-color="#7B00FF" />
          <stop offset="100%" stop-color="#FF007F" />
        </linearGradient>
      </defs>
      <path d="M12 0L24 12H12L12 24L0 12H12Z" fill="url(#framerGrad)" />
    </svg>`;
  } else if (norm.includes("shopify")) {
    iconHtml = `<svg viewBox="0 0 24 24" style="width: 2.3rem; height: 2.3rem;">
      <path d="M19.5 6h-3.25V5c0-2.2-1.8-4-4-4s-4 1.8-4 4v1H5c-1.1 0-2 .9-2 2l-1.5 13c0 1.1.9 2 2 2h17c1.1 0 2-.9 2-2l-1.5-13c0-1.1-.9-2-2-2z" fill="#96bf48" />
      <path d="M10.25 5c0-1.1.9-2 2-2s2 .9 2 2v1h-4V5z" fill="#5e8e3e" />
      <path d="M12.5 9c-0.8 0-1.5.4-1.5 1.2s.6.9 1.5 1.1c1.2.3 2.1.8 2.1 2.2c0 1.4-1.1 2-2.3 2c-1.3 0-2.2-.6-2.5-1.5h1.6c.2.4.6.6 1 .6c0.6 0 1-.3 1-.8s-.4-.7-1.3-1c-1.3-.4-2.3-.9-2.3-2.3c0-1.3 1.1-2 2.1-2c1.1 0 2 .5 2.2 1.4h-1.6c-.1-.5-.5-.7-.8-.7z" fill="#ffffff" />
    </svg>`;
  } else if (norm.includes("ethereum") || norm.includes("blockchain")) {
    iconHtml = `<svg viewBox="0 0 784 1277" style="width: 2.3rem; height: 2.3rem;">
      <polygon points="392,0 383.5,29 383.5,873 392,881 784,650" fill="#343434" />
      <polygon points="392,0 0,650 392,881 392,473" fill="#8C8C8C" />
      <polygon points="392,956 387,962 387,1272 392,1277 784,726" fill="#3C3C3C" />
      <polygon points="392,1277 392,956 0,726" fill="#8C8C8C" />
      <polygon points="392,881 784,650 392,473" fill="#141414" />
      <polygon points="0,650 392,881 392,473" fill="#393939" />
    </svg>`;
  } else if (norm.includes("weather") || norm.includes("openweathermap")) {
    iconHtml = `<svg viewBox="0 0 24 24" style="width: 2.3rem; height: 2.3rem;">
      <circle cx="15" cy="9" r="4.5" fill="#fdb813" />
      <path d="M15 3.5v1M15 13.5v1M9.5 9h1M19.5 9h1M11.1 5.1l.7.7M18.2 12.2l.7.7M11.1 12.9l.7-.7M18.2 5.8l.7-.7" stroke="#fdb813" stroke-width="1.2" stroke-linecap="round" />
      <path d="M17.5 17a3.5 3.5 0 0 0 0-7 3.5 3.5 0 0 0-2.9-1.6A4.5 4.5 0 0 0 7 12a3.5 3.5 0 0 0 .5 6.9H17.5z" fill="#4fa3e3" opacity="0.85" />
      <path d="M15.5 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 0-2.1-1.1A3.5 3.5 0 0 0 8 14.5a2.5 2.5 0 0 0 .4 4.9h7.1z" fill="#ffffff" />
    </svg>`;
  } else if (norm.includes("webgl")) {
    iconHtml = `<svg viewBox="0 0 24 24" style="width: 2.3rem; height: 2.3rem;">
      <path d="M12 2L2 7l10 5 10-5L12 2z" fill="#990000" opacity="0.8" />
      <path d="M2 7l10 5v10l-10-5V7z" fill="#cc0000" opacity="0.9" />
      <path d="M12 12l10-5v10l-10 5V12z" fill="#ff3333" />
      <path d="M12 2L2 7l10 5 10-5L12 2zM2 7l10 5v10l-10-5V7zM12 12l10-5v10l-10 5V12z" stroke="#ffffff" stroke-width="0.8" fill="none" />
    </svg>`;
  } else {
    let url = "";
    if (norm.includes("react")) {
      url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg";
    } else if (norm.includes("next")) {
      url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg";
    } else if (norm.includes("three")) {
      url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg";
    } else if (norm.includes("node")) {
      url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg";
    } else if (norm.includes("postgres")) {
      url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg";
    } else if (norm.includes("prisma")) {
      url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg";
    } else if (norm.includes("websocket") || norm.includes("socket.io")) {
      url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg";
    } else if (norm.includes("vue")) {
      url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg";
    } else if (norm.includes("nuxt")) {
      url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nuxtjs/nuxtjs-original.svg";
    } else if (norm.includes("tailwind")) {
      url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg";
    } else if (norm.includes("sass")) {
      url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg";
    } else if (norm.includes("vite")) {
      url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vite/vite-original.svg";
    } else if (norm.includes("redux")) {
      url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg";
    } else if (norm.includes("css") || norm.includes("grid")) {
      url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg";
    } else if (norm.includes("html")) {
      url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg";
    } else if (norm.includes("contentful")) {
      url = "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/contentful.svg";
    } else if (norm.includes("mapbox")) {
      url = "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/mapbox.svg";
    } else if (norm.includes("leaflet")) {
      url = "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/leaflet.svg";
    } else if (norm.includes("chart")) {
      url = "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/chartdotjs.svg";
    } else if (norm.includes("web3")) {
      url = "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/web3dotjs.svg";
    } else if (norm.includes("opengl")) {
      url = "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/opengl.svg";
    } else if (norm.includes("api") || norm.includes("rest")) {
      url = "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/postman.svg";
    } else {
      url = "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/codeforces.svg";
    }
    iconHtml = `<img src="${url}" class="tech-icon-img" alt="${name}" loading="lazy" />`;
  }

  return `
    <div class="tech-item-card" title="${name}">
      <div class="tech-icon-wrapper">
        ${iconHtml}
      </div>
      <span class="tech-item-label">${name}</span>
    </div>
  `;
};

const renderCasePage = (project) => {
  const nextProject = getNextProject(project);

  document.body.classList.add("case-route");
  document.title = `${project.title} — Sagar Luitel | Full Stack & Frontend Developer Nepal`;
  setMetaContent('meta[name="description"]', `${project.title} — ${project.service}. Case study by Sagar Luitel, freelance full stack developer, frontend engineer, and UI/UX designer in Nepal. Built with ${project.tech.slice(0, 3).join(', ')}.`);
  setMetaContent('meta[property="og:title"]', `${project.title} — Sagar Luitel | Full Stack Developer Nepal`);
  setMetaContent('meta[property="og:description"]', `${project.service}: ${project.summary.slice(0, 200)}`);

  document.querySelector("main")?.remove();
  document.body.insertAdjacentHTML(
    "beforeend",
    `<main id="work-single" class="case-page" data-barba="container" data-barba-namespace="work-single">
      ${renderChrome("work", "Next case")}

      <div class="site-wrap" data-scroll-container>
        <section class="case-top section" data-scroll-section>
          ${renderTopNav("work", "light")}
          <header class="case-header">
            <div class="container container--medium">
              <h1>${project.title}</h1>
            </div>
          </header>

          <section class="case-intro">
            <div class="container container--medium">
              <div class="case-intro__grid">
                <div class="case-meta-col">
                  <h5>Role / Services</h5>
                  <span class="stripe reveal-stripe"></span>
                  <p>${project.role}</p>
                </div>
                <div class="case-meta-col">
                  <h5>Credits</h5>
                  <span class="stripe reveal-stripe"></span>
                  <p>${project.credits}</p>
                </div>
                <div class="case-meta-col">
                  <h5>Location & year</h5>
                  <span class="stripe reveal-stripe"></span>
                  <p>${project.location} &nbsp; ${project.year}</p>
                </div>
              </div>
            </div>
          </section>

          <section class="case-intro-image">
            <div class="container">
              <div class="case-intro-image__wrap">
                <a class="round-button round-button--blue magnetic case-live-button" href="${project.liveUrl}" target="_blank" rel="noreferrer">
                  <span class="btn-fill"></span>
                  <span>Live site <i class="mini-arrow"></i></span>
                </a>
                <div class="case-hero-card" data-scroll data-scroll-speed="-1">
                  ${renderArt({ ...project, image: project.laptopImage || project.image }, "case-hero-art")}
                </div>
              </div>
            </div>
          </section>
        </section>

        <section class="case-details-section section" style="background: var(--color-light);" data-scroll-section>
          <div class="container container--medium">
            <div class="case-details-grid">
              
              <div class="case-details-block case-details-about fade-up">
                <h3>About the Project</h3>
                <p class="case-paragraph">${project.summary}</p>
              </div>
              
              <div class="case-details-block case-details-challenge fade-up">
                <h3>The Challenge</h3>
                <p class="case-paragraph">${project.challenge}</p>
              </div>
              
              <div class="case-details-block case-details-solution fade-up">
                <h3>The Solution</h3>
                <p class="case-paragraph">${project.solution}</p>
              </div>
              
              <div class="case-details-block case-details-tech fade-up" style="--project-accent: ${project.accent}">
                <h3>Technologies Used</h3>
                <span class="stripe"></span>
                <div class="tech-icons">
                  ${project.tech.map((t) => renderTechIcon(t)).join("")}
                </div>
              </div>

            </div>
          </div>
        </section>

        <div class="case-footer-curve" style="--case-bg: var(--color-light);" data-scroll-section><span></span></div>
        <footer class="case-footer theme-dark" data-scroll-section>
          <section class="section footer">
            <div class="container container--medium">
              <a class="next-case-card" href="/work/${nextProject.slug}/">
                <div class="next-case-text">
                  <p>Next case</p>
                  <h2>${nextProject.title}</h2>
                </div>
                <div class="next-case-thumb">
                  ${renderArt(nextProject, "next-case-art")}
                </div>
              </a>
              <span class="stripe"></span>
              <div class="next-case-bottom-wrapper">
                <a class="button magnetic all-work-button" href="/work">
                  <span class="btn-fill"></span>
                  <span>All work <small>${projects.length}</small></span>
                </a>
              </div>
            </div>
            <div class="container footer__bottom">
              <div>
                <div>
                  <h5>Version</h5>
                  <p>2026 © Edition</p>
                </div>
                <div>
                  <h5>Local time</h5>
                  <p id="local-time">--:-- NPT</p>
                </div>
              </div>
              <div class="socials">
                <h5>Socials</h5>
                <ul>
                  <li><a class="magnetic" href="https://github.com/sagarluiteldev" target="_blank" rel="noreferrer">GitHub</a></li>
                  <li><a class="magnetic" href="https://www.linkedin.com/in/sagar-luitel-4a510730a" target="_blank" rel="noreferrer">LinkedIn</a></li>
                </ul>
                <span class="stripe"></span>
              </div>
            </div>
          </section>
        </footer>
      </div>
    </main>`,
  );
};

const getProjectTags = (project) => {
  if (project.slug === "myrestro-manager") return "development interaction";
  if (project.slug === "digital-voting") return "development interaction";
  return "design development interaction";
};

const renderFloatingPreview = () => `
  <div class="floating-preview" aria-hidden="true">
    <div class="floating-preview__bounce">
      <div class="floating-preview__track" style="height: ${projects.length * 100}%;">
        ${projects.map((project) => `<div class="floating-preview__item" style="height: ${100 / projects.length}%;">${renderArt(project)}</div>`).join("")}
      </div>
    </div>
  </div>
`;

const renderStandardFooter = () => `
  <div class="footer-curve" data-scroll-section><span></span></div>
  <footer class="footer section theme-dark" id="contact" data-scroll-section>
    <div class="container container--medium">
      <div class="footer__headline">
        <div class="arrow-mark" aria-hidden="true"></div>
        <h2><span><i></i>Let's work</span><span>together</span></h2>
      </div>
      <div class="footer__cta">
        <span class="stripe"></span>
        <a class="round-button round-button--blue magnetic" href="/contact">
          <span class="btn-fill"></span>
          <span>Get in touch</span>
        </a>
      </div>
      <div class="footer__buttons">
        <a class="button magnetic" href="mailto:sagar.luitel.0909@gmail.com">
          <span class="btn-fill"></span>
          <span>sagar.luitel.0909@gmail.com</span>
        </a>
        <a class="button magnetic" href="tel:+9779821920019">
          <span class="btn-fill"></span>
          <span>+977 9821920019</span>
        </a>
        <a class="button button--icon button--whatsapp magnetic" href="https://wa.me/9779821920019" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" style="margin-left: 0.5rem;">
          <span class="btn-fill"></span>
          <span>
            <svg viewBox="0 0 16 16" fill="currentColor" style="width: 1.45rem; height: 1.45rem; display: block;">
              <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
            </svg>
          </span>
        </a>
      </div>
    </div>
    <div class="container footer__bottom">
      <div>
        <div>
          <h5>Version</h5>
          <p>2026 © Edition</p>
        </div>
        <div>
          <h5>Local time</h5>
          <p id="local-time">--:-- NPT</p>
        </div>
      </div>
      <div class="socials">
        <h5>Socials</h5>
        <ul>
          <li><a class="magnetic" href="https://github.com/sagarluiteldev" target="_blank" rel="noreferrer">GitHub</a></li>
          <li><a class="magnetic" href="https://www.linkedin.com/in/sagar-luitel-4a510730a" target="_blank" rel="noreferrer">LinkedIn</a></li>
        </ul>
        <span class="stripe"></span>
      </div>
    </div>
  </footer>
`;

const renderWorkPage = () => {
  document.body.classList.add("work-route");
  document.title = "Work — Sagar Luitel | Full Stack & Frontend Developer, UI/UX Designer Nepal";
  setMetaContent('meta[name="description"]', "Portfolio of Sagar Luitel — full stack & frontend developer, UI/UX designer in Nepal. View projects including 3D configurators, e-commerce platforms, SAAS apps, travel booking systems, and blockchain solutions built with React, Next.js, Three.js, and Node.js.");

  const rows = projects
    .map(
      (project, index) => `
        <li class="work-row work-page-row visible" data-preview="${index}" data-tags="${getProjectTags(project)}">
          <span class="stripe reveal-stripe"></span>
          <a href="/work/${project.slug}/">
            <div class="work-page-row__img">${renderArt(project)}</div>
            <div class="work-page-row__title"><h4><span>${project.title}</span></h4></div>
            <div class="work-page-row__location"><p>${project.location.replace(" ©", "")}</p></div>
            <div><p>${project.role}</p></div>
            <div><p>${project.year}</p></div>
          </a>
        </li>`,
    )
    .join("");

  const tiles = projects
    .map(
      (project, index) => `
        <li class="work-page-tile visible" data-preview="${index}" data-tags="${getProjectTags(project)}">
          <a href="/work/${project.slug}/">
            ${renderArt(project)}
            <h3>${project.title}</h3>
            <span class="stripe"></span>
            <p>${project.role}</p>
            <p>${project.year}</p>
          </a>
        </li>`,
    )
    .join("");

  document.querySelector("main")?.remove();
  document.body.insertAdjacentHTML(
    "beforeend",
    `<main id="work" class="route-page work-page" data-barba="container" data-barba-namespace="work">
      ${renderFloatingPreview()}
      ${renderChrome("work", "View")}
      <div class="site-wrap" data-scroll-container>
        <header class="route-header work-page__header" data-scroll-section>
          ${renderTopNav("work", "light")}
          <div class="container container--medium">
            <h1><span>Creating next level</span><span>digital products</span></h1>
          </div>
        </header>

        <section class="work-filters" data-scroll-section>
          <div class="container">
            <div class="filter-row">
              <div class="toggle-row" aria-label="Project filters">
                <button class="button magnetic work-filter is-active" type="button" data-filter="all"><span class="btn-fill"></span><span>All</span></button>
                <button class="button magnetic work-filter" type="button" data-filter="design"><span class="btn-fill"></span><span>Design <small>8</small></span></button>
                <button class="button magnetic work-filter" type="button" data-filter="development"><span class="btn-fill"></span><span>Development <small>10</small></span></button>
              </div>
              <div class="grid-row" aria-label="Layout view">
                <button class="button button--icon magnetic work-view is-active" type="button" data-view="rows" aria-label="Rows view"><span class="btn-fill"></span><span></span></button>
                <button class="button button--icon button--grid magnetic work-view" type="button" data-view="tiles" aria-label="Grid view"><span class="btn-fill"></span><span></span></button>
              </div>
            </div>
          </div>
        </section>

        <section class="work-directory" data-scroll-section>
          <div class="container">
            <div class="work-directory__labels">
              <h5>Client</h5>
              <h5>Location</h5>
              <h5>Services</h5>
              <h5>Year</h5>
            </div>
            <ul class="work-directory__rows">${rows}<span class="stripe stripe--last reveal-stripe"></span></ul>
            <ul class="work-directory__tiles">${tiles}</ul>
          </div>
        </section>

        <section class="archive-cta" data-scroll-section>
          <a class="button magnetic" href="/work"><span class="btn-fill"></span><span>Archive <small>12</small></span></a>
        </section>
        ${renderStandardFooter()}
      </div>
    </main>`,
  );
};

const renderAboutPage = () => {
  document.body.classList.add("about-route");
  document.title = "About — Sagar Luitel | Full Stack & Frontend Developer, UI/UX Designer in Nepal";
  setMetaContent('meta[name="description"]', "About Sagar Luitel — freelance full stack developer, frontend engineer, and UI/UX designer in Nepal. Specialized in React, Next.js, Node.js, and Three.js.");

  document.querySelector("main")?.remove();
  document.body.insertAdjacentHTML(
    "beforeend",
    `<main id="about" class="route-page about-page" data-barba="container" data-barba-namespace="about">
      ${renderChrome("about", "View")}
      <div class="site-wrap" data-scroll-container>
        <header class="route-header about-page__header" data-scroll-section>
          ${renderTopNav("about", "light")}
          <div class="container container--medium">
            <h1><span>Helping products move</span><span>through the digital world</span></h1>
          </div>
        </header>

        <section class="line-globe" data-scroll-section>
          <div class="container container--medium">
            <span class="stripe reveal-stripe"></span>
            <div class="digital-ball" aria-hidden="true">
              <div class="digital-ball__overlay"></div>
              <div class="globe"><div class="globe__wrap"><span></span><span></span><span></span><i></i><b></b></div></div>
            </div>
          </div>
        </section>

        <section class="about-image-section" data-scroll-section>
          <div class="bottom-lightgray"></div>
          <div class="container">
            <div class="about-image-section__grid">
              <div class="about-copy">
                <div class="arrow-mark" aria-hidden="true"></div>
                <p data-scroll data-scroll-speed="-1">As a versatile <strong>Full Stack & Frontend Developer</strong> and <strong>UI/UX Designer based in Nepal</strong>, I help teams turn complex concepts into polished, fast, and secure digital product systems. Every build spans the entire lifecycle—from wireframing and interface prototypes to reliable database systems and clean codebases.</p>
                <p data-scroll data-scroll-speed="-1"><span>Always exploring<span class="animate-dot">.</span><span class="animate-dot">.</span><span class="animate-dot">.</span></span></p>
              </div>
              <div class="single-about-image">
                <img src="/assets/sagar-about-portrait.webp" alt="Sagar Luitel" loading="lazy" decoding="async" data-scroll data-scroll-speed="-2" />
              </div>
            </div>
          </div>
        </section>

        <section class="about-services-page" data-scroll-section>
          <div class="container">
            <h2 class="reveal-text">I can help you with <span class="animate-dot">.</span><span class="animate-dot">.</span><span class="animate-dot">.</span></h2>
            <div class="service-grid">
              <article class="fade-up">
                <h5>01</h5>
                <span class="stripe"></span>
                <h4>Product Design</h4>
                <p>Clear interface systems, user flows, prototypes, and visual polish that make complex products feel simple.</p>
              </article>
              <article class="fade-up">
                <h5>02</h5>
                <span class="stripe"></span>
                <h4>Development</h4>
                <p>Scalable full stack builds with resilient APIs, fast frontends, thoughtful state, and refined interactions.</p>
              </article>
              <article class="fade-up">
                <h5>03</h5>
                <span class="stripe"></span>
                <h4><span class="spark-mark"></span>The full package</h4>
                <p>Strategy, design, development, deployment, and iteration handled as one connected product workflow.</p>
              </article>
            </div>
          </div>
        </section>

        <section class="about-awards" data-scroll-section>
          <div class="container container--medium">
            <div class="about-awards__grid">
              <div class="about-awards__image" data-scroll data-scroll-speed="-1">${renderArt(projects[1])}</div>
              <div class="about-awards__copy">
                <h2>Full stack<br>since day one</h2>
                <p>I care about the small details that make software feel considered: loading states, keyboard paths, empty states, motion, and backend contracts that do not surprise the next person.</p>
              </div>
            </div>
          </div>
        </section>
        ${renderStandardFooter()}
      </div>
    </main>`,
  );
};

const renderContactPage = () => {
  document.body.classList.add("contact-route");
  document.title = "Contact — Hire Sagar Luitel | Full Stack Developer & UI/UX Designer in Nepal";
  setMetaContent('meta[name="description"]', "Hire Sagar Luitel — freelance full stack developer, frontend engineer, and UI/UX designer in Nepal. Get in touch for custom web development and digital solutions.");

  document.querySelector("main")?.remove();
  document.body.insertAdjacentHTML(
    "beforeend",
    `<main id="contact" class="route-page contact-page" data-barba="container" data-barba-namespace="contact">
      ${renderChrome("contact", "View")}
      <div class="site-wrap theme-dark" data-scroll-container>
        <header class="contact-header-page" data-scroll-section>
          ${renderTopNav("contact", "dark")}
          <div class="container container--medium">
            <div class="contact-heading">
              <h1><span><i></i>Let's start</span><span>a project together</span></h1>
            </div>
            <div class="contact-layout">
              <form class="contact-form" action="#" novalidate>
                <input type="hidden" name="access_key" value="e4b9d15c-482c-49bc-9a1c-c77aebd1ceb1" />
                ${[
                  ["01", "Full Name", "text", "Your name...", "name"],
                  ["02", "Email", "email", "Your email...", "email"],
                  ["03", "Name of Organization", "text", "Your company...", "organization"],
                  ["04", "What services are you looking for?", "text", "Design, Development, Product ...", "services"],
                ]
                  .map(
                    ([number, label, type, placeholder, name = label]) => `
                      <label class="form-row">
                        <h5>${number}</h5>
                        <span>${label}</span>
                        <input type="${type}" name="${name}" placeholder="${placeholder}" />
                      </label>`,
                  )
                  .join("")}
                <label class="form-row form-row--message">
                  <h5>05</h5>
                  <span>Special Message</span>
                  <textarea name="message" rows="7" placeholder="Your notes here..."></textarea>
                </label>
                <span class="stripe contact-stripe"></span>
                <button class="round-button round-button--blue magnetic contact-send" type="submit">
                  <span class="btn-fill"></span>
                  <span>Send it!</span>
                </button>
                <p class="form-note" aria-live="polite"></p>
              </form>
              <aside class="contact-details">
                <h5>Contact Details</h5>
                <ul>
                  <li><a class="magnetic" href="mailto:sagar.luitel.0909@gmail.com">sagar.luitel.0909@gmail.com</a></li>
                  <li><a class="magnetic" href="tel:+9779821920019">+977 9821920019</a></li>
                </ul>
                <h5>Business Details</h5>
                <ul>
                  <li><p>Sagar Luitel Studio</p></li>
                  <li><p>Full Stack Development</p></li>
                  <li><p>Location: Kathmandu, Nepal</p></li>
                </ul>
              </aside>
            </div>
          </div>
        </header>
        <footer class="footer footer-contact theme-dark" data-scroll-section>
          <div class="container footer__bottom">
            <div>
              <div>
                <h5>Version</h5>
                <p>2026 © Edition</p>
              </div>
              <div>
                <h5>Local time</h5>
                <p id="local-time">--:-- NPT</p>
              </div>
            </div>
            <div class="socials">
              <h5>Socials</h5>
              <ul>
                <li><a class="magnetic" href="https://github.com/sagarluiteldev" target="_blank" rel="noreferrer">GitHub</a></li>
                <li><a class="magnetic" href="https://www.linkedin.com/in/sagar-luitel-4a510730a" target="_blank" rel="noreferrer">LinkedIn</a></li>
              </ul>
              <span class="stripe"></span>
            </div>
          </div>
        </footer>
      </div>
    </main>`,
  );
};

const pathName = window.location.pathname.replace(/\/$/, "") || "/";
const activeProject = getRouteProject();
if (activeProject) {
  renderCasePage(activeProject);
} else if (pathName === "/work") {
  renderWorkPage();
} else if (pathName === "/about") {
  renderAboutPage();
} else if (pathName === "/contact") {
  renderContactPage();
} else {}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let scrollContainer = document.querySelector("[data-scroll-container]");
let lenis = null;
let lenisTickerListener = null;
let gsapContext = null;

const setViewportHeight = () => {
  document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
};

const setScrolledState = (value) => {
  document.body.classList.toggle("is-scrolled", value > window.innerHeight * 0.18);
};

const updateLocalTime = () => {
  const timeNode = document.querySelector("#local-time");
  if (!timeNode) return;

  timeNode.textContent = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kathmandu",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date()) + " NPT";
};

const setActiveLoaderWord = (words, activeIndex) => {
  words.forEach((word, index) => {
    word.classList.toggle("is-active", index === activeIndex);
  });
};

const runPreloader = () => {
  const preloader = document.querySelector(".preloader");
  const wordsWrap = document.querySelector(".preloader__words");
  const words = [...document.querySelectorAll(".preloader__words h2")];

  if (!preloader || prefersReducedMotion) {
    preloader?.remove();
    return Promise.resolve();
  }

  // Check if this is a page reload (user refreshed the page)
  const isPageReload = performance.navigation.type === 1 || performance.getEntriesByType("navigation")[0]?.type === "reload";
  
  // Check if preloader has already run in this session and not a reload
  if (sessionStorage.getItem("preloaderRun") === "true" && !isPageReload) {
    preloader.remove();
    return Promise.resolve();
  }

  // Mark preloader as run
  sessionStorage.setItem("preloaderRun", "true");

  return new Promise((resolve) => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        preloader.remove();
        resolve();
      },
    });

    gsap.set(wordsWrap, { autoAlpha: 1 });

    words.forEach((_, index) => {
      tl.call(setActiveLoaderWord, [words, index], index === 0 ? 0 : "+=0.15");
    });

    tl.to(wordsWrap, { autoAlpha: 0, duration: 0.18 }, "+=0.25")
      .to(".preloader__curve", { height: "12vh", duration: 0.7, ease: "power4.inOut" }, "<")
      .to(".preloader__screen", { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "<0.12")
      .to(".preloader", { autoAlpha: 0, duration: 0.1 }, "-=0.15");
  });
};

let windowScrollListener = null;

const initSmoothScroll = () => {
  if (windowScrollListener) {
    window.removeEventListener("scroll", windowScrollListener);
    windowScrollListener = null;
  }

  if (prefersReducedMotion) {
    windowScrollListener = () => setScrolledState(window.scrollY);
    window.addEventListener("scroll", windowScrollListener, { passive: true });
    return;
  }

  if (lenis) {
    lenis.destroy();
    lenis = null;
  }

  const isMobile = window.innerWidth <= 780;

  // Initialize Lenis for premium, ultra-smooth momentum scrolling on all pages
  lenis = new Lenis({
    duration: isMobile ? 1.0 : 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential dampening curve
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.2,
    infinite: false,
  });

  window.lenis = lenis;

  // Sync scroll position state and trigger GSAP ScrollTrigger updates
  lenis.on("scroll", (e) => {
    const y = e.scroll || window.scrollY || 0;
    setScrolledState(y);
    ScrollTrigger.update();
  });

  // Tightly integrate Lenis RAF with GSAP Ticker for frame-perfect animation alignment
  if (lenisTickerListener) {
    gsap.ticker.remove(lenisTickerListener);
  }
  lenisTickerListener = (time) => {
    lenis?.raf(time * 1000);
  };
  gsap.ticker.add(lenisTickerListener);
  gsap.ticker.lagSmoothing(0);
};

const scrollToTarget = (target) => {
  if (!target) return;

  if (lenis && typeof lenis.scrollTo === "function") {
    lenis.scrollTo(target, {
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      offset: 0,
    });
    return;
  }

  target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
};

const initAnchors = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;

      event.preventDefault();
      closeNavigation();
      scrollToTarget(target);
    });
  });
};

let isRouteTransitioning = false;

const getRouteTransitionLink = (event) => {
  const link = event.target.closest("a[href]");
  if (!link || link.target === "_blank" || link.hasAttribute("download")) return null;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return null;

  const nextUrl = new URL(link.href, window.location.href);
  const currentUrl = new URL(window.location.href);
  if (nextUrl.origin !== currentUrl.origin) return null;
  if (nextUrl.hash && nextUrl.pathname === currentUrl.pathname) return null;
  if (nextUrl.pathname === currentUrl.pathname && nextUrl.search === currentUrl.search) return null;

  return { link, nextUrl };
};

const runRouteTransition = (label) => {
  const overlay = document.querySelector(".page-transition");
  if (!overlay || prefersReducedMotion) return Promise.resolve();

  const pathNode = overlay.querySelector(".page-transition__path");
  const labelNode = overlay.querySelector(".page-transition__label");

  if (!pathNode || !labelNode) return Promise.resolve();

  labelNode.textContent = label;
  overlay.classList.add("is-active");

  gsap.killTweensOf([labelNode]);
  gsap.set(labelNode, { yPercent: 115, autoAlpha: 0 });

  const transitionVal = { y: 100, curve: 0 };
  const maxCurve = window.innerWidth <= 780 ? 5 : 30;
  const updatePath = () => {
    const ySides = transitionVal.y;
    const yCenter = transitionVal.y - transitionVal.curve;
    const d = `M 0 100 L 0 ${ySides} Q 50 ${yCenter} 100 ${ySides} L 100 100 Z`;
    pathNode.setAttribute("d", d);
  };

  updatePath();

  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onUpdate: updatePath,
      onComplete: resolve,
    });

    tl.to(transitionVal, { y: 0, duration: 0.72, ease: "power3.inOut" })
      .to(transitionVal, { curve: maxCurve, duration: 0.36, ease: "power2.out" }, 0)
      .to(transitionVal, { curve: 0, duration: 0.36, ease: "power2.in" }, 0.36)
      .to(labelNode, { yPercent: 0, autoAlpha: 1, duration: 0.45, ease: "power3.out" }, 0.28);
  });
};

const playRouteTransitionExit = () => {
  const overlay = document.querySelector(".page-transition");
  if (!overlay) return;

  const pathNode = overlay.querySelector(".page-transition__path");
  const labelNode = overlay.querySelector(".page-transition__label");

  if (!pathNode || !labelNode) {
    document.documentElement.classList.remove("route-transitioning-exit");
    return;
  }

  document.documentElement.classList.remove("route-transitioning-exit");
  overlay.classList.add("is-active");

  gsap.killTweensOf([labelNode]);
  labelNode.textContent = getPathLabel(window.location.pathname);
  gsap.set(labelNode, { yPercent: 0, autoAlpha: 1 });

  const transitionVal = { y: 100, curve: 0 };
  const maxCurve = window.innerWidth <= 780 ? 5 : 30;
  const updateExitPath = () => {
    const ySides = transitionVal.y;
    const yCenter = transitionVal.y - transitionVal.curve;
    const d = `M 0 0 L 100 0 L 100 ${ySides} Q 50 ${yCenter} 0 ${ySides} Z`;
    pathNode.setAttribute("d", d);
  };

  updateExitPath();

  const tl = gsap.timeline({
    onUpdate: updateExitPath,
    onComplete: () => {
      overlay.classList.remove("is-active");
      lenis?.resize();
      ScrollTrigger.refresh();
    },
  });

  tl.to(labelNode, { yPercent: -100, autoAlpha: 0, duration: 0.3, ease: "power3.in" }, 0)
    .to(transitionVal, { y: 0, duration: 0.72, ease: "power3.inOut" }, 0.08)
    .to(transitionVal, { curve: maxCurve, duration: 0.36, ease: "power2.out" }, 0.08)
    .to(transitionVal, { curve: 0, duration: 0.36, ease: "power2.in" }, 0.44);
};

let homePageHTML = "";

const saveHomePageHTML = () => {
  const homeMain = document.querySelector("main#home");
  if (homeMain) {
    homePageHTML = homeMain.outerHTML;
  }
};

const renderHomePage = () => {
  document.body.classList.remove("case-route", "work-route", "about-route", "contact-route");
  document.title = "Sagar Luitel — Full Stack & Frontend Developer, UI/UX Designer in Nepal";
  setMetaContent('meta[name="description"]', "Sagar Luitel is a freelance full stack developer, frontend engineer, and UI/UX designer in Nepal. Specialized in React, Next.js, Three.js, and Node.js. Available for freelance projects.");

  if (homePageHTML) {
    document.querySelector("main")?.remove();
    document.body.insertAdjacentHTML("beforeend", homePageHTML);
    return Promise.resolve();
  } else {
    return fetch("/")
      .then((res) => res.text())
      .then((htmlText) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, "text/html");
        const homeMainNode = doc.querySelector("main#home");
        if (homeMainNode) {
          homePageHTML = homeMainNode.outerHTML;
          document.querySelector("main")?.remove();
          document.body.insertAdjacentHTML("beforeend", homePageHTML);
        }
      });
  }
};

const destroySite = () => {
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
    lenis.destroy();
    lenis = null;
    window.lenis = null;
  }
  if (windowScrollListener) {
    window.removeEventListener("scroll", windowScrollListener);
    windowScrollListener = null;
  }
  window.scrollTo(0, 0);
  if (gsapContext) {
    gsapContext.revert();
    gsapContext = null;
  }
  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.clearScrollMemory();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true));
  }
  document.body.classList.remove("case-route", "work-route", "about-route", "contact-route", "route-transitioning", "is-scrolled");
  closeNavigation();
};

const reinitSiteForNewPage = () => {
  window.scrollTo(0, 0);
  setViewportHeight();
  updateLocalTime();
  initLazyMedia();
  initSmoothScroll();
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
    lenis.resize();
  }
  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.refresh();
  }
  initNavigation();
  initAnchors();
  initMagneticButtons();
  initHoverPreview();
  initWorkPageControls();
  initContactForm();

  if (gsapContext) {
    gsapContext.revert();
  }
  gsapContext = gsap.context(() => {
    initScrollAnimations();
  });

  lenis?.resize();
  ScrollTrigger.refresh();

  requestAnimationFrame(() => {
    lenis?.resize();
    ScrollTrigger.refresh();
  });

  // Periodically refresh ScrollTrigger and Lenis after page load to handle lazy media and font loading reflows
  [100, 300, 600, 1000, 1500].forEach((delay) => {
    setTimeout(() => {
      lenis?.resize();
      ScrollTrigger.refresh();
    }, delay);
  });
};

const navigateToPage = (href, isPopState = false) => {
  if (isRouteTransitioning) return;
  isRouteTransitioning = true;

  const url = new URL(href, window.location.href);
  const pathName = url.pathname.replace(/\/$/, "") || "/";
  
  const transition = runRouteTransition(getPathLabel(pathName));
  document.body.classList.add("route-transitioning");
  closeNavigation();

  let fetchPromise = Promise.resolve();
  if (pathName === "/" && !homePageHTML) {
    fetchPromise = fetch("/")
      .then((res) => res.text())
      .then((htmlText) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, "text/html");
        const homeMainNode = doc.querySelector("main#home");
        if (homeMainNode) {
          homePageHTML = homeMainNode.outerHTML;
        }
      });
  }

  Promise.all([transition, fetchPromise]).then(() => {
    destroySite();

    const activeProject = projects.find((p) => pathName === `/work/${p.slug}`);
    if (activeProject) {
      renderCasePage(activeProject);
    } else if (pathName === "/work") {
      renderWorkPage();
    } else if (pathName === "/about") {
      renderAboutPage();
    } else if (pathName === "/contact") {
      renderContactPage();
    } else if (pathName === "/") {
      document.body.classList.remove("case-route", "work-route", "about-route", "contact-route");
      document.title = "Sagar Luitel — Full Stack & Frontend Developer, UI/UX Designer in Nepal";
      setMetaContent('meta[name="description"]', "Sagar Luitel is a freelance full stack developer, frontend engineer, and UI/UX designer in Nepal. Specialized in React, Next.js, Three.js, and Node.js. Available for freelance projects.");
      document.querySelector("main")?.remove();
      if (homePageHTML) {
        document.body.insertAdjacentHTML("beforeend", homePageHTML);
      }
    }

    if (!isPopState) {
      window.history.pushState({}, "", href);
    }

    reinitSiteForNewPage();

    // Track the new page view in Google Analytics for SPA route transition
    if (typeof gtag === 'function') {
      gtag('config', 'G-6NP7MX6CW2', {
        page_path: window.location.pathname,
        page_title: document.title
      });
    }

    playRouteTransitionExit();
    isRouteTransitioning = false;
  });
};

const initRouteTransitions = () => {
  document.addEventListener("click", (event) => {
    const transitionLink = getRouteTransitionLink(event);
    if (!transitionLink || isRouteTransitioning) return;

    event.preventDefault();
    navigateToPage(transitionLink.nextUrl.href);
  });

  window.addEventListener("popstate", () => {
    navigateToPage(window.location.href, true);
  });
};

const openNavigation = () => {
  document.body.classList.add("nav-open");
  document.querySelector(".hamburger")?.setAttribute("aria-expanded", "true");
  lenis?.stop();
};

const closeNavigation = () => {
  document.body.classList.remove("nav-open");
  document.querySelector(".hamburger")?.setAttribute("aria-expanded", "false");
  lenis?.start();
};

const toggleNavigation = () => {
  if (document.body.classList.contains("nav-open")) {
    closeNavigation();
  } else {
    openNavigation();
  }
};

const initNavigation = () => {
  document.querySelector(".hamburger")?.addEventListener("click", toggleNavigation);
  document.querySelector(".nav-link--menu")?.addEventListener("click", toggleNavigation);
  document.querySelector(".nav-backdrop")?.addEventListener("click", closeNavigation);
};

const initMagneticButtons = () => {
  if (prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) return;

  document.querySelectorAll(".magnetic").forEach((element) => {
    const isRound = element.classList.contains("round-button") || element.classList.contains("hamburger");
    const strength = isRound ? 42 : 20;
    const textSpan = isRound
      ? element.querySelector(".round-button-text") ||
        element.querySelector("span:not(.btn-fill)") ||
        element.querySelector(".hamburger__bars")
      : null;
    const wavingWrapper = isRound ? element.querySelector(".round-button-icon-waving-wrapper") : null;
    const textStrength = 28;
    const iconStrength = 36; // Moving towards mouse slightly stronger than text

    element.addEventListener("mousemove", (event) => {
      const box = element.getBoundingClientRect();
      const normX = (event.clientX - box.left) / box.width - 0.5;
      const normY = (event.clientY - box.top) / box.height - 0.5;

      gsap.to(element, {
        x: normX * strength,
        y: normY * strength,
        duration: 0.45,
        ease: "power3.out",
      });

      if (textSpan) {
        gsap.to(textSpan, {
          x: normX * textStrength,
          y: normY * textStrength,
          duration: 0.35,
          ease: "power3.out",
        });
      }

      if (wavingWrapper) {
        gsap.to(wavingWrapper, {
          x: normX * iconStrength,
          y: normY * iconStrength,
          duration: 0.35,
          ease: "power3.out",
        });
      }
    });

    element.addEventListener("mouseleave", () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.35)",
      });

      if (textSpan) {
        gsap.to(textSpan, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.35)",
        });
      }

      if (wavingWrapper) {
        gsap.to(wavingWrapper, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.35)",
        });
      }
    });
  });
};

const initHoverPreview = () => {
  const preview = document.querySelector(".floating-preview");
  const previewTrack = document.querySelector(".floating-preview__track");
  const cursorDisc = document.querySelector(".cursor-disc");
  const cursorLabel = document.querySelector(".cursor-label");

  if (!preview || !previewTrack || !cursorDisc || !cursorLabel || window.matchMedia("(pointer: coarse)").matches) return;

  const movePreviewX = gsap.quickTo(preview, "x", { duration: 0.48, ease: "power3.out" });
  const movePreviewY = gsap.quickTo(preview, "y", { duration: 0.48, ease: "power3.out" });

  // Center elements on the cursor by setting xPercent and yPercent to -50
  gsap.set([cursorDisc, cursorLabel, preview], { xPercent: -50, yPercent: -50 });

  window.addEventListener(
    "mousemove",
    (event) => {
      movePreviewX(event.clientX);
      movePreviewY(event.clientY);
      gsap.set([cursorDisc, cursorLabel], { x: event.clientX, y: event.clientY });
    },
    { passive: true },
  );

  document.querySelectorAll(".work-row").forEach((row) => {
    row.addEventListener("mouseenter", () => {
      const index = Number(row.dataset.preview || 0);
      preview.classList.add("is-active");
      cursorDisc.classList.add("is-active");
      cursorLabel.classList.add("is-active");

      gsap.to(previewTrack, {
        yPercent: -(100 / previewTrack.children.length) * index,
        duration: 0.62,
        ease: "power4.inOut",
      });
    });

    row.addEventListener("mouseleave", () => {
      preview.classList.remove("is-active");
      cursorDisc.classList.remove("is-active");
      cursorLabel.classList.remove("is-active");
    });
  });
};

const initWorkPageControls = () => {
  const workPage = document.querySelector(".work-page");
  if (!workPage) return;

  const filterButtons = [...document.querySelectorAll(".work-filter")];
  const viewButtons = [...document.querySelectorAll(".work-view")];
  const rows = [...document.querySelectorAll(".work-page-row, .work-page-tile")];

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));

      rows.forEach((row) => {
        const visible = filter === "all" || row.dataset.tags.includes(filter);
        row.classList.toggle("is-filtered-out", !visible);
      });

      lenis?.resize();
      ScrollTrigger.refresh();
    });
  });

  viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      viewButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      workPage.classList.toggle("show-tiles", button.dataset.view === "tiles");
      lenis?.resize();
      ScrollTrigger.refresh();
    });
  });
};

const initContactForm = () => {
  document.querySelectorAll(".contact-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const note = form.querySelector(".form-note");
      const button = form.querySelector(".contact-send");
      const buttonText = button ? button.querySelector("span:not(.btn-fill)") : null;

      // Basic client-side validation
      const nameInput = form.querySelector('input[name="name"]');
      const emailInput = form.querySelector('input[name="email"]');
      const messageInput = form.querySelector('textarea[name="message"]');

      if (!nameInput?.value.trim()) {
        if (note) {
          note.style.color = "#FF4F22";
          note.textContent = "Please enter your name.";
        }
        return;
      }

      if (!emailInput?.value.trim()) {
        if (note) {
          note.style.color = "#FF4F22";
          note.textContent = "Please enter your email address.";
        }
        return;
      }

      if (!messageInput?.value.trim()) {
        if (note) {
          note.style.color = "#FF4F22";
          note.textContent = "Please enter your message.";
        }
        return;
      }

      // Show sending state
      if (note) {
        note.style.color = "";
        note.textContent = "Sending your message...";
      }

      if (button) button.style.pointerEvents = "none";
      if (buttonText) buttonText.textContent = "Sending...";

      const formData = new FormData(form);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      })
        .then(async (response) => {
          const res = await response.json();
          if (response.status === 200) {
            if (note) {
              note.style.color = "#49A77B"; // Accent green success color
              note.textContent = "Thank you! Your message has been sent successfully.";
            }
            form.reset();
          } else {
            if (note) {
              note.style.color = "#FF4F22";
              note.textContent = res.message || "Something went wrong. Please try again.";
            }
          }
        })
        .catch((error) => {
          console.error("Form submission error:", error);
          if (note) {
            note.style.color = "#FF4F22";
            note.textContent = "Network error. Please check your connection and try again.";
          }
        })
        .finally(() => {
          if (button) button.style.pointerEvents = "";
          if (buttonText) buttonText.textContent = "Send it!";
        });
    });
  });
};

const animateFromIfPresent = (targets, vars) => {
  const elements = gsap.utils.toArray(targets);
  if (elements.length) gsap.from(elements, vars);
};

const initFooterCurveMotion = () => {
  gsap.utils.toArray(".footer-curve, .case-footer-curve").forEach((curve) => {
    if (!curve.isConnected) return;
    const shape = curve.querySelector("span");
    if (!shape) return;

    // Clear any stale GSAP inline styles from previous route so fromTo starts clean
    gsap.set(shape, { clearProps: "all" });

    gsap.fromTo(
      shape,
      {
        bottom: "-42vh",
        width: "150%",
        height: "50vh",
        borderTopLeftRadius: "50%",
        borderTopRightRadius: "50%",
      },
      {
        bottom: "0vh",
        width: "100%",
        height: "9vh",
        borderTopLeftRadius: "0%",
        borderTopRightRadius: "0%",
        ease: "none",
        scrollTrigger: {
          trigger: curve,
          start: "top 92%",
          end: "bottom 45%",
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      },
    );
  });
};

const initScrollAnimations = () => {
  if (prefersReducedMotion) return;

  animateFromIfPresent(".hero__bg-wrap", {
    scale: 1.12,
    autoAlpha: 0,
    duration: 2.2,
    ease: "power2.out",
    delay: 0.15,
  });

  if (document.querySelector(".hero__bg-wrap")) {
    gsap.to(".hero__bg-wrap", {
      yPercent: 12,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  animateFromIfPresent(".top-nav", {
    y: -24,
    autoAlpha: 0,
    duration: 0.8,
    ease: "power3.out",
    delay: 0.08,
  });

  const heroPortraitImg = document.querySelector(".hero__portrait img");
  const heroNames = document.querySelectorAll(".hero__name");

  if (heroPortraitImg || heroNames.length) {
    const isMobile = window.innerWidth <= 780;
    const baseScale = isMobile ? 2.035 : 1.6;
    const baseTranslateY = isMobile ? 51 : 36;

    const heroSyncTl = gsap.timeline({
      defaults: { ease: "power4.out", duration: 1.1 }
    });

    if (heroPortraitImg) {
      heroSyncTl.fromTo(
        heroPortraitImg,
        {
          yPercent: baseTranslateY,
          y: 70,
          autoAlpha: 0,
          scale: baseScale,
        },
        {
          yPercent: baseTranslateY,
          y: 0,
          autoAlpha: 1,
          scale: baseScale,
          duration: 1.1,
          ease: "power4.out",
          clearProps: isMobile ? "opacity,visibility" : "transform,opacity,visibility",
        },
        0
      );

      // Dynamic scroll-driven zoom and parallax for mobile view
      if (isMobile) {
        gsap.to(heroPortraitImg, {
          scale: baseScale * 1.08,
          yPercent: baseTranslateY + 5,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          }
        });
      }
    }

    const heroBackName = document.querySelector(".hero__name--back");
    const heroFrontName = document.querySelector(".hero__name:not(.hero__name--back)");

    if (heroBackName && !isMobile) {
      heroSyncTl.fromTo(
        heroBackName,
        {
          y: 70,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 0.35,
          duration: 1.1,
          ease: "power4.out",
          clearProps: "transform,visibility",
        },
        0
      );
    }

    if (heroFrontName) {
      heroSyncTl.fromTo(
        heroFrontName,
        {
          y: 70,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.1,
          ease: "power4.out",
          clearProps: "transform,opacity,visibility",
        },
        0
      );
    }

    const heroFrontTrack = document.querySelector(".hero__name:not(.hero__name--back) .hero__name-track");
    if (heroFrontTrack) {
      gsap.to(heroFrontTrack, {
        xPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }

    const heroBackTrack = document.querySelector(".hero__name--back .hero__name-track");
    if (heroBackTrack) {
      gsap.to(heroBackTrack, {
        xPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }
  }

  // Alphabet Split and Reveal for Hero Role text & pop animation for arrow
  const roleH4 = document.querySelector(".hero__role h4");
  if (roleH4) {
    const span1 = roleH4.querySelector(".role-line-1");
    const span2 = roleH4.querySelector(".role-line-2");

    const splitToChars = (element) => {
      if (!element) return;
      const text = element.textContent.trim();
      element.innerHTML = [...text]
        .map((char) => {
          if (char === " ") return `<span class="char-space">&nbsp;</span>`;
          return `<span class="char-reveal"><span class="char-reveal-inner">${char}</span></span>`;
        })
        .join("");
    };

    splitToChars(span1);
    splitToChars(span2);

    const arrow = document.querySelector(".hero__role-card .arrow-mark");
    const chars = roleH4.querySelectorAll(".char-reveal-inner");

    const tlRole = gsap.timeline({
      delay: 0.3,
    });

    if (arrow) {
      tlRole.fromTo(arrow,
        {
          scale: 0,
        },
        {
          scale: 1,
          duration: 0.7,
          ease: "back.out(2)",
        }
      );
    }

    if (chars.length) {
      tlRole.fromTo(chars,
        {
          yPercent: 105,
        },
        {
          yPercent: 0,
          duration: 0.7,
          stagger: 0.02,
          ease: "power4.out",
        },
        arrow ? "-=0.5" : "<"
      );
    }
  }

  const locationEl = document.querySelector(".hero__location");
  if (locationEl) {
    const textLines = locationEl.querySelectorAll(".reveal-line-inner");
    const globe = locationEl.querySelector(".digital-ball");
    const isDesktop = window.innerWidth > 780;

    const tl = gsap.timeline({
      delay: 0.2,
    });

    if (isDesktop) {
      tl.fromTo(locationEl, 
        {
          clipPath: "inset(0 100% 0 0 round 0 999px 999px 0)",
          x: -50,
        },
        {
          clipPath: "inset(0 0% 0 0 round 0 999px 999px 0)",
          x: 0,
          duration: 1.2,
          ease: "power4.out",
        }
      )
      .fromTo(globe,
        {
          scale: 0,
        },
        {
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.8)",
        },
        "-=0.6"
      )
      .fromTo(textLines,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.5"
      );
    } else {
      tl.fromTo(globe,
        {
          scale: 0,
        },
        {
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.8)",
        }
      );
    }
  }

  animateFromIfPresent(".route-header h1 span, .case-header h1, .contact-heading h1 span", {
    y: 90,
    autoAlpha: 0,
    duration: 1,
    stagger: 0.08,
    ease: "power4.out",
  });

  animateFromIfPresent(".case-meta-col, .form-row, .contact-details, .about-copy, .single-about-image", {
    y: 60,
    autoAlpha: 0,
    duration: 0.85,
    stagger: 0.08,
    ease: "power4.out",
  });

  gsap.utils.toArray(".reveal-text").forEach((element) => {
    if (element.closest(".intro__headline")) {
      const isMobile = window.innerWidth <= 780;
      if (isMobile) {
        gsap.fromTo(element,
          { opacity: 0.2, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          }
        );
        return;
      }
      const text = element.textContent.trim();
      const words = text.split(/\s+/);
      element.innerHTML = words
        .map((word) => `<span class="reveal-word">${word}</span>`)
        .join(" ");

      const wordSpans = element.querySelectorAll(".reveal-word");

      gsap.to(wordSpans, {
        opacity: 1,
        stagger: 0.05,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top 78%",
          end: "top 35%",
          scrub: 0.3,
        },
      });
      return;
    }

    gsap.from(element, {
      y: 80,
      autoAlpha: 0,
      duration: 0.9,
      ease: "power4.out",
      scrollTrigger: {
        trigger: element,
        start: "top 82%",
      },
    });
  });

  gsap.utils.toArray(".fade-up").forEach((element) => {
    gsap.from(element, {
      y: 70,
      autoAlpha: 0,
      duration: 0.85,
      ease: "power4.out",
      scrollTrigger: {
        trigger: element,
        start: "top 86%",
      },
    });
  });

  gsap.utils.toArray(".reveal-stripe").forEach((stripe) => {
    gsap.from(stripe, {
      scaleX: 0,
      duration: 0.9,
      ease: "power4.out",
      scrollTrigger: {
        trigger: stripe,
        start: "top 90%",
      },
    });
  });

  if (document.querySelector(".media-marquee")) {
    gsap.to(".media-row--one", {
      xPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: ".media-marquee",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(".media-row--two", {
      xPercent: 8,
      ease: "none",
      scrollTrigger: {
        trigger: ".media-marquee",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  animateFromIfPresent(".footer__headline", {
    y: 80,
    autoAlpha: 0,
    duration: 0.9,
    ease: "power4.out",
    scrollTrigger: {
      trigger: ".footer",
      start: "top 70%",
    },
  });

  // Project detail page paragraphs scrolly reveal (TextFluxUnveil effect)
  const isMobile = window.innerWidth <= 780;
  gsap.utils.toArray(".case-paragraph").forEach((element) => {
    if (isMobile) {
      // Optimize for mobile: simple fade-in transition instead of heavy word-splitting & scrubbing
      gsap.fromTo(element,
        { opacity: 0.2, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        }
      );
      return;
    }

    const text = element.textContent.trim();
    const words = text.split(/\s+/);
    element.innerHTML = words
      .map((word) => `<span class="reveal-word">${word}</span>`)
      .join(" ");

    const wordSpans = element.querySelectorAll(".reveal-word");

    gsap.to(wordSpans, {
      opacity: 1,
      stagger: 0.03,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        end: "top 45%",
        scrub: 0.2,
      },
    });
  });

  initFooterCurveMotion();
};

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

let debouncedRefresh = null;

const initLazyMedia = () => {
  if (!debouncedRefresh) {
    debouncedRefresh = debounce(() => {
      lenis?.resize();
      ScrollTrigger.refresh();
    }, 150);
  }

  new LazyLoad({
    elements_selector: ".lazy",
    threshold: 250,
    callback_loaded: () => {
      debouncedRefresh();
    },
  });
};


let isGlobalInitialized = false;

const initGlobalListeners = () => {
  if (isGlobalInitialized) return;
  isGlobalInitialized = true;

  if (typeof window !== "undefined" && window.history && window.history.scrollRestoration) {
    window.history.scrollRestoration = "manual";
  }

  let lastWidth = window.innerWidth;
  window.addEventListener("resize", () => {
    const width = window.innerWidth;
    if (width === lastWidth) return; // Prevent recalculations and jumps on mobile height-only scroll resizing
    lastWidth = width;

    setViewportHeight();
    lenis?.resize();
    ScrollTrigger.refresh();
  });

  document.addEventListener(
    "load",
    (event) => {
      if (event.target && (event.target.tagName === "IMG" || event.target.tagName === "VIDEO")) {
        lenis?.resize();
        ScrollTrigger.refresh();
      }
    },
    true
  );

  window.setInterval(updateLocalTime, 30_000);

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
  });
};

const initSite = () => {
  document.documentElement.classList.add("app-ready");

  const isSafari = navigator.userAgent.indexOf("Safari") !== -1 &&
                   navigator.userAgent.indexOf("Chrome") === -1 &&
                   navigator.userAgent.indexOf("Chromium") === -1 &&
                   navigator.userAgent.indexOf("CriOS") === -1 &&
                   navigator.userAgent.indexOf("FxiOS") === -1;
  if (isSafari) {
    document.documentElement.classList.add("is-safari");
  }

  saveHomePageHTML();
  initGlobalListeners();

  setViewportHeight();
  updateLocalTime();
  initLazyMedia();
  initSmoothScroll();
  initNavigation();
  initAnchors();
  initRouteTransitions();
  initMagneticButtons();
  initHoverPreview();
  initWorkPageControls();
  initContactForm();

  gsapContext = gsap.context(() => {
    initScrollAnimations();
  });

  requestAnimationFrame(() => {
    lenis?.resize();
    ScrollTrigger.refresh();
  });
};

const routeTransitionExit = sessionStorage.getItem("routeTransitionDirection") === "exit";
if (routeTransitionExit) {
  sessionStorage.removeItem("routeTransitionDirection");
  playRouteTransitionExit();
}

runPreloader().then(initSite);

window.addEventListener("load", () => {
  setTimeout(() => {
    lenis?.resize();
    ScrollTrigger.refresh();
  }, 100);
});
