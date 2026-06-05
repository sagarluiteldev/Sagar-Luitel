# Sagar Luitel - Full Stack Developer

A production-grade, animated portfolio website for Sagar Luitel, built with Vanilla JavaScript, GSAP, and Locomotive Scroll. This project demonstrates advanced front-end development techniques including fluid typography, SVG path morphing, scroll-triggered animations, and seamless page transitions.

## Features

- **Fluid Typography**: Text smoothly scales based on viewport width using CSS `clamp()` and viewport units
- **Scroll-Triggered Animations**: Text reveals, fade-ins, and parallax effects synchronized with scroll position
- **SVG Path Morphing**: Decorative SVG elements animate smoothly with GSAP (hero section, footer)
- **Locomotive Scroll**: Advanced smooth scrolling with inertia and scroll-jacking
- **Barba.js Transitions**: Zero-flash page transitions with page-aware preloader
- **Floating Preview**: Interactive project previews that follow scroll position with 3D tilt effect
- **Responsive Design**: Mobile-first approach with touch-optimized interactions
- **Lazy Loading**: Vanilla JS lazy loader for images and iframes to improve performance

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd "Sagar Luitel Full Stack"
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser. The server supports hot-module replacement and will automatically reload on changes.

### Production

Build the project for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
./
├── assets/               # Images, fonts, icons
│   ├── bike-configurator-mockup.jpg
│   ├── dobby-mockup.jpg
│   ├── digital-voting-mockup.jpg
│   ├── save-wildlife-mockup.jpg
│   └── sagar-footer-portrait-circle.png
├── web/
│   ├── css/
│   │   ├── chillax.css
│   │   └── icons.css
│   └── fonts/
├── src/
│   ├── main.js           # Main application entry point
│   ├── styles.css        # Global styles and animations
│   ├── projects.js       # Project data and configuration
│   └── utils.js          # Utility functions (debounce, throttle)
├── index.html            # Main entry point (Barba.js container)
├── README.md             # Project documentation
└── package.json          # Project dependencies and scripts
```

## Key Features Explained

### Fluid Typography

Used in `src/styles.css` to create text that scales smoothly across different screen sizes:

```css
--text-fs-xl: clamp(2.5rem, 2.152rem + 1.74vw, 3.5rem);
```

This ensures text is always readable and proportional to the viewport.

### SVG Path Morphing

Animated with GSAP in `src/main.js` to create organic transitions between states:

```js
// Open navigation
gsap.to(
  drawerPath,
  {
    attr: { d: "M 100 0 L 100 100 Q -20 50 100 0 Z" },
    ease: "power3.in",
  },
  0,
);
```

### Barba.js Transitions

Configured in `src/main.js` for seamless page changes:

- Page-aware preloader that matches page content
- Custom transition animations for all page types
- Progress bar for loading states
- Keeps Locomotive Scroll state between transitions

### Lazy Loading

Vanilla JavaScript implementation in `src/main.js` using [vanilla-lazyload](https://github.com/verlok/vanilla-lazyload):

```js
lazyLoadInstance = new LazyLoad({
  elements_selector: ".lazy-media",
  threshold: 0.15,
});
```

### 3D Interactive Previews

Implemented in `src/main.js` using `mousemove` event listeners:

- Tracks cursor position relative to preview element
- Applies 3D tilt transform based on cursor distance
- 100% vanilla JS with no external libraries

## Technology Stack

- **Core**: Vanilla JavaScript (ES modules)
- **Animation**: GSAP (GreenSock Animation Platform)
- **Smooth Scrolling**: Locomotive Scroll
- **Page Transitions**: Barba.js
- **Styling**: Custom CSS + Tailwind-inspired spacing system
- **Build Tool**: Vite

## Best Practices Demonstrated

- **Performance**: Lazy loading, CSS transitions, reduced motion support
- **Accessibility**: ARIA labels, keyboard navigation, reduced motion preference
- **Maintainability**: Modular structure, clear separation of concerns
- **User Experience**: Smooth animations, responsive design, immediate feedback

## License

ISC
