# Veinbit Technologies

## Current State
New project — no existing code.

## Requested Changes (Diff)

### Add
- Full marketing/landing site for "Veinbit Technologies" tech company
- **Hero Section**: Large headline "Innovating the Future with Technology", subtext, CTA "Explore Our Solutions", Three.js 3D rotating network/sphere background
- **About Section**: Company intro, animated stat counters (Projects Completed, Clients, Technologies Used, Years of Experience), floating tech icons
- **Services Section**: Six interactive glassmorphism cards with 3D tilt hover — Software Development, AI & ML Solutions, Web Development, Mobile App Development, Cloud Infrastructure, Cybersecurity Solutions
- **Technologies Section**: Animated tech stack icons (Python, React, Django, Flutter, AWS, Docker) with glow + rotate on hover
- **Portfolio Section**: Animated project cards with hover preview, click ripple, modal popup with project details — includes "3DS Group Website" (3ds-group.com, WordPress platform)
- **Why Choose Us Section**: Animated feature blocks — Innovation-driven, Experienced team, Scalable tech, Secure systems — with icon motion effects
- **Contact Section**: Animated form (Name, Email, Message, submit with ripple), Google Maps embed, social media icons with hover glow
- Backend: Contact form submissions stored (name, email, message, timestamp)
- Backend: Counter data (projects, clients, technologies, years) stored and served

### Modify
- Nothing (new project)

### Remove
- Nothing (new project)

## Implementation Plan
1. Backend canister: store contact form submissions; expose query for stats counters
2. Frontend React app with sections: Hero, About, Services, Technologies, Portfolio, WhyUs, Contact
3. Three.js integration for hero 3D network globe animation
4. Framer Motion + CSS for scroll-triggered reveals, tilt effects, parallax, counters
5. Glassmorphism card components for services and portfolio
6. Modal component for portfolio project details
7. Contact form wired to backend
8. Mouse-following glow/particles overlay
9. Fully responsive layout (mobile/tablet/desktop)
