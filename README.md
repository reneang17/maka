# Maka Yoga Website

This project is a migration of the Maka Yoga static site to a professional development setup using **Vite**, **Vanilla JavaScript**, and **Tailwind CSS**.

## Structure

- **src/main.js**: Application entry point.
- **src/style.css**: Global styles and Tailwind imports.
- **src/js/**: Modular JavaScript logic.
    - `router.js`: Handles single-page navigation logic without page reloads.
    - `data.js`: Contains data for instructors.
    - `ui.js`: Manages UI interactions (Carousels, Mobile Menu, Lightbox).
- **index.html**: Main HTML file.
- **public/**: Static assets (images, logos).

## Getting Started

### Prerequisites

- Node.js installed on your machine.

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser at the URL provided (usually `http://localhost:5173`).

### Building for Production

To create a production build:

```bash
npm run build
```

This will generate a `dist/` specific folder with optimized assets ready for deployment.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```
