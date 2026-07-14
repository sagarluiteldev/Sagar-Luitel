Manual Steps to Rank Higher on Google
Phase 1: Fix Critical Technical Issues (Do This Week)
Step 1: Fix the OG Image 404 (COMPLETED)
Your index.html line 27 references og-image.png which has been created using the provided image.

Action:
- [x] Create a proper OG image (1200×630px recommended)
- [x] Save it as /public/assets/og-image.png (or update the meta tag path)
- [ ] Test with Facebook Sharing Debugger and Twitter Card Validator
Step 2: Submit Your Sitemap to Google Search Console
This is the single most important manual step you can do right now.

Action:

Go to Google Search Console
Click "Start now" and sign in with your Google account
Add your property: Choose "URL prefix" → enter https://sagarluitel.com
Verify ownership via one of these methods:
HTML file upload (recommended): Download the verification file and add it to your /public/ directory
DNS record: Add a TXT record to your domain's DNS settings
HTML meta tag: Add the verification <meta> tag to your <head>
Once verified, go to Sitemaps in the left sidebar
Enter sitemap.xml and click Submit
Google will now discover and crawl all 15 URLs in your sitemap
Step 3: Request Indexing for Key Pages
After setting up Search Console:

Action:

In Search Console, use the URL Inspection tool (search bar at top)
Enter each of these URLs one by one:
https://sagarluitel.com/
https://sagarluitel.com/work
https://sagarluitel.com/about
https://sagarluitel.com/contact
Click "Request Indexing" for each URL
Wait 2-7 days for Google to crawl and index them
IMPORTANT

Google limits indexing requests to ~10-12 per day. Do your main pages first, then project pages over the following days.

Step 4: Verify Your SPA Rendering with Google
Action:

In Google Search Console → URL Inspection → enter https://sagarluitel.com/work
Click "Test Live URL"
Click "View Tested Page" → "Screenshot" tab
Check if Google actually sees your Work page content, or just a blank/homepage
If it shows the homepage content on /work, you have a rendering problem (see Phase 3 below)
Phase 2: Off-Page SEO & Authority Building (Do This Month)
Step 5: Create a Google Business Profile
Action:

Go to Google Business Profile
Create a profile for "Sagar Luitel Studio"
Category: "Web Designer" or "Software Company"
Add your Pokhara address, phone, email, website
Add professional photos of your workspace
Google will send a verification postcard to your Pokhara address (takes 1-2 weeks)
Once verified, your business appears in Google Maps + local search results
TIP

This is extremely powerful for "web developer Nepal" and "web developer Pokhara" searches. Most freelancers in Nepal skip this step.

Step 6: Build Your GitHub Profile (Backlink + Authority)
Your new GitHub (github.com/sagarluiteldev) needs activity.

Action:

Make sure your GitHub profile has:
Professional bio matching your website
Link to https://sagarluitel.com
A pinned README repository with your portfolio summary
Make your project repositories public (at least 3-5)
Add proper README files with links back to your portfolio
Each public repo with a link to your site = a backlink from github.com (very high domain authority)
Step 7: Optimize Your LinkedIn Profile (Backlink + Discovery)
Action:

Update your LinkedIn headline to match your site title: "Full Stack Web Developer & UI/UX Designer | Nepal"
Add https://sagarluitel.com as your website in the Contact Info section
Write a LinkedIn About section that mirrors your website's professional summary
Share 2-3 posts about your projects with links to your portfolio pages
LinkedIn profiles rank very well on Google for name searches
Step 8: Submit to Web Developer Directories
These are free backlinks from high-authority sites.

Action — Submit your portfolio to:

Awwwards — Submit your site for review (₹free nominee)
CSS Design Awards — Submit for a design award
Dribbble — Create a profile, upload project shots, link to your site
Behance — Create case studies for your projects
Product Hunt — If any project is a standalone product
Dev.to — Create a developer profile with your website link
Hashnode — Same as Dev.to
The Starter Lab - Nepal — Nepali tech community
[Nepal IT directory sites] — Any local Nepal tech/business directories
NOTE

Each directory submission = 1 backlink. Aim for 15-20 quality backlinks in your first month. Quality matters more than quantity — 1 link from Awwwards is worth more than 100 links from random sites.

Phase 3: Content Strategy for Organic Traffic (Do Over 2-3 Months)
Step 9: Start a Blog (The Biggest Long-Term Win)
A blog on sagarluitel.com/blog is the most powerful SEO lever you're not using.

Why: Portfolio pages target branded searches ("Sagar Luitel"). Blog posts target informational searches that thousands of people search for every day. Each blog post is a new entry point to your site.

Action — Write these 5 articles first (targeting high-volume Nepal/dev keywords):

Article Title Target Keywords Monthly Search Volume
"How I Built a 3D Bike Configurator with Three.js" three.js tutorial, 3d configurator, webgl tutorial 2,000-5,000
"GSAP ScrollTrigger: Complete Guide for Smooth Scroll Animations" gsap scroll animation, scrolltrigger tutorial 5,000-10,000
"Building a Real-Time Restaurant Management System with WebSockets" websocket tutorial, real-time app, node.js websocket 3,000-8,000
"Web Developer in Nepal: How I Built My Career" web developer nepal, freelance developer nepal 500-1,000
"Headless Shopify with React: Complete E-Commerce Guide" headless shopify, shopify storefront api 2,000-5,000
Blog post format:

1,500-3,000 words each
Include code snippets and screenshots
Link to your live project demo
Include your name and "web developer Nepal" naturally
Add proper H1, H2, H3 heading hierarchy
Add internal links to your other projects and pages
Step 10: Create Case Study Pages with More Text Content
Your current project pages are good but light on indexable text.

Action:

Each project page should have at least 500+ words of unique text
Add sections like: "Technical Architecture", "Performance Results", "Lessons Learned"
Include specific numbers: "Reduced load time from 8s to 1.2s", "Achieved 96 Lighthouse score"
These technical details attract developer searches
Phase 4: Ongoing SEO Maintenance (Monthly)
Step 11: Monitor Google Search Console Weekly
Action:

Check Performance tab weekly — see which queries you're appearing for
Check Coverage tab — ensure all pages are indexed, no errors
Check Core Web Vitals — your GSAP animations need to not block INP
Fix any crawl errors immediately
Step 12: Update Sitemap Dates
Action:

Every time you update content, change the <lastmod> date in sitemap.xml
Google uses this to know when to re-crawl your pages
Don't set all dates to the same day — stagger them based on actual update dates
Step 13: Build Social Proof Signals
Action:

Ask past clients/collaborators for Google Business reviews
Engage in Nepali tech communities (Facebook groups, Discord, Reddit r/nepal)
Answer questions on Stack Overflow with your expertise
Share your work on Twitter/X with proper hashtags (#webdev #threejs #nepal)
Step 14: Track Your Rankings
Action:

Use Google Search Console (free) for basic tracking
Set up Google Alerts for "Sagar Luitel" to monitor brand mentions
Manually search these terms monthly and record your position:
"web developer Nepal"
"web developer Pokhara"
"freelance web developer Nepal"
"Sagar Luitel"
"UI/UX designer Nepal"
"React developer Nepal"
"Three.js developer Nepal"
Phase 5: Advanced (3-6 Months Out)
Step 15: Consider Pre-rendering or SSR Migration
This is the nuclear option for your SPA rendering problem.

Your current SPA architecture means Google has to execute JavaScript to see your content. Options:

Approach Effort Impact
Prerender.io (service) Low — add a middleware Google gets pre-rendered HTML
vite-plugin-prerender Medium — build-time pre-rendering Static HTML for each route at build
Migrate to Next.js/Nuxt High — full rewrite Best long-term SEO architecture
WARNING

Don't do this now. Focus on Steps 1-8 first. If after 3 months your pages still aren't indexing properly (check via Step 4), then consider pre-rendering.

Step 16: Get Featured in Nepali Media
Action:

Reach out to Nepali tech blogs (TechPana, TechSathi, ICT Frame Nepal)
Pitch a story: "Young Web Developer from Pokhara Building 3D Experiences for Global Clients"
Any article about you with a link to your site = high-quality, geo-relevant backlink
This is extremely effective for Nepal-specific keyword rankings
