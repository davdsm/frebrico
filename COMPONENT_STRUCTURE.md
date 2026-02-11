# Vedações & Bricolage Website

A modern, responsive website built with React and Tailwind CSS using Atomic Design principles.

## 🏗️ Architecture - Atomic Design

This project follows the Atomic Design methodology to create a scalable and maintainable component structure:

### 📦 Component Structure

```
src/app/components/
├── atoms/           # Basic building blocks
│   ├── Button.tsx
│   ├── Logo.tsx
│   └── Icon.tsx
│
├── molecules/       # Simple groups of atoms
│   ├── NavItem.tsx
│   ├── ProductCard.tsx
│   └── FAQItem.tsx
│
├── organisms/       # Complex components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── FeaturesSection.tsx
│   ├── ProductCarousel.tsx
│   ├── FAQSection.tsx
│   └── Footer.tsx
│
├── templates/       # Page-level layouts
│   └── PageTemplate.tsx
│
└── index.ts        # Central export file
```

### 🎨 Design Tokens

- **Primary Color**: `#313b2e` (Dark Green)
- **Fonts**: 
  - Outfit (Primary)
  - Playfair Display (Logo)
  - Plus Jakarta Sans (Body text)

### 🚀 Features

- **Fully Responsive**: Desktop and mobile optimized
- **Atomic Design**: Scalable component architecture
- **Tailwind CSS**: Utility-first styling
- **Type-Safe**: Built with TypeScript
- **Accessible**: Semantic HTML and ARIA labels

### 📱 Sections

1. **Header**: Navigation with logo, menu items, and cart
2. **Hero**: Large typography section with product categories
3. **Features**: Image section highlighting key benefits
4. **Product Carousel**: Horizontal scrolling product showcase
5. **FAQ**: Expandable question/answer section
6. **Footer**: Company information and links

### 🔧 Tech Stack

- React 18
- Tailwind CSS v4
- TypeScript
- Vite

### 💡 Usage

Import components from the central index:

```tsx
import { Header, Hero, Footer } from './components';
```

Each component is self-contained and reusable throughout the application.
