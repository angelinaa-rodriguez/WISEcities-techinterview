# Wise Cities E-Commerce Project

This is a responsive e-commerce website built as part of a take-home assignment for the Spring 2025 Software Engineering Internship at Wise Cities.

## Overview

The goal of this project was to replicate a Figma design of an e-commerce platform with two primary pages:

- **Home Page:** A grid layout that displays product images, names, prices, and “Add to Cart” buttons.
- **Product Detail Page:** A dedicated page for each product featuring a larger image, detailed description, pricing, quantity controls, and a similar products section.

While the original design prioritized pixel-perfect rendering at desktop width (1024px), this implementation is **fully responsive**. This means that while the product may not match every pixel of the Figma spec on larger screens, it ensures better usability and layout on tablets and mobile devices.

## Features

### Home Page
- Responsive product grid layout
- Hover and click interaction on price elements
- Live “Add to Cart” functionality with quantity display
- Global cart item count displayed in the header

### Product Page
- 512x512 product image cropped to center (not shrunk)
- Product name, description, and interactive price section
- Quantity selector replaces “Add to Cart” after first click
- “Similar Products” grid section
- “See More Products” link to return to the home page

## Tech Stack

### Frontend
- **Next.js 15 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Next/Image** for optimized image rendering

### Backend
- **MikroORM v6**
- **SQLite** database (local)
- **API Routes** for product and cart logic

### State Management
- Global cart state handled with **React Context API**

### Containerization
- Docker support for full app environment
- SQLite database mounted into the container at runtime

## Development Notes

### Challenges Faced

- **Pixel-perfect design vs. responsiveness:**  
  The Figma spec used fixed sizes that looked great on desktop, but broke down on mobile. I used Tailwind’s responsive utilities to implement a layout that adapts to all screen sizes while preserving the original visual hierarchy and spacing.

- **Dynamic pricing UI:**  
  The pricing component had multiple visual states—hovered, active, inactive. I implemented these using conditional Tailwind classes to animate size and background transitions smoothly.

- **Cart logic with context:**  
  Managing item quantities across pages required a shared cart state. I created a custom context (`CartContext`) that provides `addToCart` and `removeFromCart` logic, and updates the global badge icon in the header in real-time.

- **MikroORM metadata discovery issues**
  Learned to explicitly type entity properties (`@Property({ type: 'string' })`) and avoid runtime reflection pitfalls by directly importing entities.

- **SQLite + Docker volume linking**
  Used `-v ${PWD}/wise-cities.db:/app/wise-cities.db` to persist seed data between dev and Dockerized prod containers.

## Getting Started

1. Install Dependencies

```bash
npm install
```

2. Seed the Database

```bash
npx tsx seed.ts
```

3. Run the Development Server

```bash
npm run dev
```

4. Run the Docker

Windows (Powershell):
```Powershell
Remove-Item wise-cities.db -ErrorAction Ignore; npx tsx seed.ts; docker build --no-cache -t wise-cities-ecommerce .; docker run -p 3000:3000 -v "${PWD}\wise-cities.db:/app/wise-cities.db" wise-cities-ecommerce
```

Mac/Linux (Bash):
``` Bash
rm -f wise-cities.db && npx tsx seed.ts && docker build --no-cache -t wise-cities-ecommerce . && docker run -p 3000:3000 -v "$(pwd)/wise-cities.db:/app/wise-cities.db" wise-cities-ecommerce

```

5. Visit the app at **http://localhost:3000**


## Directory Structure

- /app – Main pages for home and individual product routes

- /components – Shared UI components (ProductGrid, Header, etc.)

- /models - MikroORM entity classes

- /lib – ORM initialization & Cart context
  
- /public - Static assets (images)
  
- /pages/api – API endpoints for product retrieval and cart interaction

- /seed.ts – Seeds SQLite DB with product data

## Lessons Learned

Before this project, I had never worked with Next.js, MikroORM, or Docker volumes. I had to learn:

- How to set up entities and migrations in MikroORM
- How to persist a SQLite DB between local and container environments
- How Next.js App Router differs from Pages Router
- How to Dockerize an ORM-backed full-stack app cleanly

I built every part of this app myself, from the layout and styling to the DB seeding, API routing, and container setup. I also learned how to debug low-level ORM and metadata issues, and gained confidence in troubleshooting complex full-stack errors independently.

## Optional Enhancement: SEO Metadata

I attempted to implement dynamic metadata using the Next.js `metadata` API for SEO optimization. While I made progress and was able to set metadata like title and description, I ran into some persistent build-time TypeScript issues when working with API route parameters that I wasn’t able to fully resolve in time. This was an optional enhancement, and I chose to focus on core functionality and responsiveness instead.

That said, I’m really interested in learning how to properly use the `metadata` API and improve SEO in Next.js. I’d love to revisit this in the future with more time or guidance.


## Final Thoughts

Before this project, I had never worked with **Next.js** or **MikroORM**, so I had to teach myself how to set up a modern full-stack app from scratch. By learning how the App Router works in Next.js and configuring the MikroORM entities and database seeding, I challenged myself to quickly adapt to new tools and frameworks—skills that are critical in any real-world development environment.

One of the biggest challenges I faced was reconciling the pixel-perfect Figma design with the realities of responsive web development. The design was clearly optimized for a fixed 1024px desktop width, but I knew that real users would be accessing the site on a variety of devices. I made the intentional decision to prioritize a responsive experience, even if that meant deviating slightly from exact pixel values in the design.

This project helped me strengthen my understanding of component-based architecture, layout management, and global state handling with context. More than that, it gave me confidence in my ability to independently build out a fully functioning, visually consistent, and user-friendly e-commerce experience.




