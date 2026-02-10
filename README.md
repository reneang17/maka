# Maka Yoga | Oaxaca

A modern, responsive web application for Maka Yoga studio in Oaxaca, built with performance, accessibility, and community in mind.

## 🚀 Tech Stack

- **Vite**: Ultra-fast build tool and development server.
- **Vanilla JavaScript**: Core logic without heavy framework overhead.
- **Tailwind CSS**: Utility-first CSS framework for rapid and responsive styling.
- **Font Awesome**: Icon library for visual elements.

## ✨ Features

- **Single Page Application (SPA) Experience**: Smooth navigation without full page reloads using a custom vanilla JS router.
- **Internationalization (i18n)**: Full support for Spanish (default) and English, with seamless toggling.
- **Responsive Design**: Mobile-first approach ensuring a great experience on all devices.
- **Dynamic Content**: Instructor profiles and other data are loaded dynamically from structured data files.
- **Modern UI/UX**:
    - Smooth scrolling and transitions.
    - Glassmorphism effects (backdrop blur).
    - Custom carousel for hero images and testimonials.
    - Interactive lightbox for gallery images.

## 📂 Project Structure

```
.
├── src/
│   ├── js/
│   │   ├── i18n/           # Internationalization logic and dictionaries
│   │   ├── router.js       # SPA-like routing logic
│   │   ├── ui.js           # UI interactions (Navbar, Mobile Menu, Carousels)
│   │   ├── data.js         # Static data (Instructors, etc.)
│   │   └── main.js         # Application entry point
│   ├── style.css           # Global styles and Tailwind directives
├── public/                 # Static assets (images, logos)
├── idx.html                # Main HTML entry file
├── vite.config.js          # Vite configuration
└── tailwind.config.js      # Tailwind configuration
```

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/reneang17/maka.git
   cd maka
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at the URL provided (usually `http://localhost:5173`).

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```

The output will be in the `dist/` directory, ready for deployment.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## 🌐 Deployment

This project is configured for deployment on **GitHub Pages**.

- The `CNAME` file in the root directory ensures the custom domain `makayoga.space` is correctly configured.
- The build process handles asset optimization and hashing for caching.

## 📄 License

[MIT License](LICENSE)
