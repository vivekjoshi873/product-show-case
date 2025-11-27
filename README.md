# 🛍️ Showcase Explorer

A modern, production-ready e-commerce product showcase application built with Next.js, featuring smooth animations, advanced filtering, and a beautiful user interface.

![Showcase Explorer](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff0055?style=for-the-badge&logo=framer)

## ✨ Features

### Core Functionality
- 🛒 **Product Catalog**: Browse products from DummyJSON API with responsive grid layout
- 📄 **Pagination**: Navigate through products with intuitive page controls
- 🔍 **Category Filtering**: Filter products by categories with expandable category list
- 🔄 **Sorting Options**: Sort products by price (ascending/descending) or title (A-Z/Z-A)
- 🎯 **Product Details**: View detailed product information in a beautiful modal
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop devices

### User Experience
- ⚡ **Loading States**: Skeleton loaders for smooth loading experience
- ❌ **Error Handling**: Graceful error messages with retry functionality
- 🎨 **Animations**: Smooth transitions and micro-interactions using Framer Motion
- 🖼️ **Image Gallery**: Multiple product images with thumbnail navigation
- ⭐ **Product Ratings**: Visual star ratings display
- 💰 **Discount Badges**: Clear discount percentage indicators
- 📊 **Stock Information**: Real-time stock availability display

### Animations (Framer Motion)
- **Product Card Stagger**: Fade-in and slide-up animations with stagger effect
- **Modal Transitions**: Smooth scale and fade animations for product details
- **Hover Effects**: Interactive hover animations on cards and buttons
- **Page Transitions**: Smooth entrance animations for all components

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, or pnpm package manager

### Installation

1. **Clone or download the project**
```bash
cd showcase-explorer
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
npm run build
npm start
```

## 📦 Tech Stack

### Framework & Language
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **JavaScript** - Programming language

### Styling & UI
- **Tailwind CSS 3** - Utility-first CSS framework
- **Framer Motion 11** - Animation library
- **Next/Image** - Optimized image component

### Data Fetching
- **Axios** - HTTP client
- **Custom Hooks** - Reusable data fetching logic

### API
- **DummyJSON** - Product data API

## 📁 Project Structure

```
showcase-explorer/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.js            # Root layout component
│   └── page.js              # Main home page
├── components/
│   ├── CategoryFilter.js    # Category filter buttons
│   ├── ErrorMessage.js      # Error display component
│   ├── Pagination.js        # Pagination controls
│   ├── ProductCard.js       # Product card component
│   ├── ProductDetailModal.js # Product detail modal
│   ├── ProductSkeleton.js   # Loading skeleton
│   └── SortDropdown.js      # Sort options dropdown
├── hooks/
│   ├── useCategories.js     # Fetch categories hook
│   ├── useProductDetail.js  # Fetch product details hook
│   └── useProducts.js       # Fetch products hook
├── public/                  # Static assets
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore rules
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md               # This file
```

## 🎯 Key Features Explained

### 1. Product Grid with Pagination
- Displays 12 products per page
- Responsive grid layout (1-4 columns based on screen size)
- Smart pagination with ellipsis for large page counts
- Smooth scroll to top on page change

### 2. Category Filtering
- Dynamic category fetching from API
- "All Products" option to show everything
- Expandable category list (shows 8, expand for more)
- Auto-reset to page 1 on category change

### 3. Client-Side Sorting
- Sort by price (low to high / high to low)
- Sort by title (A-Z / Z-A)
- Maintains current filters and pagination

### 4. Product Details Modal
- Full product information display
- Image gallery with thumbnail navigation
- Rating, stock, warranty, and shipping info
- Smooth open/close animations
- Click outside to close

### 5. Loading & Error States
- Skeleton loaders during data fetch
- Error messages with retry functionality
- Empty state when no products found
- Graceful API error handling

### 6. Animations
- **Stagger Animation**: Cards appear sequentially with delay
- **Hover Effects**: Cards lift on hover with scale animation
- **Modal Animation**: Scale and fade transition
- **Button Interactions**: Scale effects on click/hover
- **Page Transitions**: Smooth entrance animations

## 🎨 Design System

### Colors
- **Primary**: Blue theme (`#0ea5e9` and variations)
- **Background**: White with subtle gray gradient
- **Text**: Gray scale for hierarchy
- **Accent**: Red for discounts, Green/Orange for stock status

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, larger sizes
- **Body**: Regular weight, comfortable line height

### Spacing
- Consistent padding and margins
- Responsive spacing adjustments
- Comfortable card layouts

## 🔧 Configuration

### Tailwind CSS
Custom theme extensions in `tailwind.config.js`:
- Primary color palette
- Custom animations
- Responsive breakpoints

### Next.js
Image optimization configured for:
- `cdn.dummyjson.com`
- `i.dummyjson.com`

## 📱 Responsive Design

- **Mobile** (< 640px): Single column grid
- **Tablet** (640px - 1024px): 2 column grid
- **Desktop** (1024px+): 3-4 column grid
- **Header**: Sticky with responsive layout
- **Modal**: Full-screen on mobile, centered on desktop

## 🌐 API Endpoints Used

1. **Get Products**: `https://dummyjson.com/products?limit={limit}&skip={skip}`
2. **Get Product by ID**: `https://dummyjson.com/products/{id}`
3. **Get Categories**: `https://dummyjson.com/products/categories`
4. **Get Products by Category**: `https://dummyjson.com/products/category/{categoryName}`

## 🎭 Custom Hooks

### `useProducts(limit, skip, category)`
Fetches products with pagination and category filtering.

### `useProductDetail(id)`
Fetches detailed information for a single product.

### `useCategories()`
Fetches all available product categories.

## 🚀 Performance Optimizations

- Image optimization with Next/Image
- Lazy loading for images
- Efficient re-renders with useMemo
- Debounced animations
- Optimized bundle size

## 🐛 Error Handling

- Network error catching
- User-friendly error messages
- Retry functionality
- Loading states prevent interactions during fetch

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📧 Support

For issues or questions, please open an issue in the repository.

---

**Built with ❤️ using Next.js, Tailwind CSS, and Framer Motion**

