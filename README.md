# Car Explorer Web App

**Assignment 2 - SW 302 User Interface Development**

A luxury car browsing application inspired by Porsche's website aesthetics, built with HTML, Tailwind CSS, and vanilla JavaScript ES6+ modules.

## 🎨 Design Philosophy

The application follows Porsche's minimalist design language:
- **Clean, geometric typography** (Inter font family)
- **Luxury color palettes** (Black/white with premium accents)
- **Professional visual hierarchy**
- **Smooth, subtle animations**
- **High-quality imagery**

## 🌓 Dual Theme System

### Sport Mode (Default)
- Aggressive red/black color scheme
- Racing-inspired aesthetics
- High contrast design
- Porsche GT style elements

### Eco Mode
- Fresh green/white palette
- Clean, light design
- Sustainable aesthetics
- Environmentally conscious styling

## 📄 Pages

1. **Home (index.html)** - Hero landing with quick navigation
2. **Browse (browse.html)** - Complete car gallery with filters
3. **Details (details.html)** - Individual car specifications
4. **Favorites (favorites.html)** - Saved car collection
5. **Compare (compare.html)** - Side-by-side vehicle comparison

## ✨ Features

### Search & Filter
- Live search by name/brand
- Category filter (Sports, SUV, Luxury, Electric, Hybrid)
- Price range slider
- Horsepower range filter
- Multiple sort options
- Advanced filters (collapsible)

### Favorites System
- Add/remove favorites with heart icon
- localStorage persistence
- Dedicated favorites page
- Selection for comparison
- Bulk operations

### Comparison Engine
- Compare 2-3 vehicles side-by-side
- Automatic winner detection (🏆)
- Detailed spec comparison
- Performance leader calculation
- Responsive stacked layout on mobile

### User Interface
- Loading skeleton animations
- Empty state messages
- Confirmation modals
- Responsive grid layouts
- Mobile hamburger menu
- Smooth transitions

## 🛠️ Technology Stack

- **HTML5** - Semantic markup
- **Tailwind CSS 3.3** - Utility-first styling
- **JavaScript ES6+** - Modular architecture
- **localStorage** - Data persistence
- **Fetch API** - JSON data loading

## 📦 Project Structure

```
Car-Explorer-Web-App/
├── src/
│   ├── css/
│   │   ├── input.css           # Tailwind source
│   │   └── output.css          # Compiled CSS
│   ├── data/
│   │   └── cars.json           # 24 luxury vehicles
│   ├── js/
│   │   ├── api.js              # Data fetching & filtering
│   │   ├── app.js              # Main application controller
│   │   ├── compare.js          # Comparison logic
│   │   ├── storage.js          # localStorage management
│   │   ├── theme-switcher.js  # Theme system
│   │   └── ui.js               # UI rendering
│   └── pages/
│       ├── index.html          # Home page
│       ├── browse.html         # Browse/Gallery
│       ├── details.html        # Car details
│       ├── favorites.html      # Favorites
│       └── compare.html        # Comparison
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS setup
├── package.json                # Dependencies
└── README.md                   # Documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shadow9-1-1/Car-Explorer-Web-App.git
   cd Car-Explorer-Web-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build Tailwind CSS**
   ```bash
   npm run build:css
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   ```
   http://localhost:3000/src/pages/index.html
   ```

### Build Scripts

```bash
# Development (watch mode + live server)
npm run dev

# Build CSS for production
npm run build

# Watch CSS changes only
npm run watch:css

# Serve files only
npm run serve

# Preview the app
npm run preview
```

## 🎯 Key Features Breakdown

### Tailwind Configuration
- **Custom color palettes** for Sport and Eco modes
- **Custom spacing** (8pt grid system)
- **Typography scale** inspired by Porsche
- **Two plugins**: @tailwindcss/forms, @tailwindcss/typography
- **Component classes**: `.car-card`, `.button-action`
- **Theme variants**: `theme-sport:`, `theme-eco:`

### JavaScript Modules

**api.js** - Data operations
- Fetch cars from JSON
- Filter by multiple criteria
- Sort by price/horsepower/name
- Get statistics

**ui.js** - UI rendering
- Create car cards
- Loading skeletons
- Empty states
- Favorite management
- Debounced search

**storage.js** - localStorage
- Favorites CRUD operations
- Comparison list management
- Theme persistence
- Import/export functionality

**compare.js** - Comparison logic
- Extract specifications
- Calculate winners
- Format values
- Overall performance leader

**app.js** - Application controller
- Page initialization
- Theme management
- Mobile menu
- Global state

**theme-switcher.js** - Theme system
- Toggle between themes
- localStorage persistence
- Custom events
- Accessibility support

## 🎨 Design System

### Colors

**Sport Mode**
```
Primary:    #d5001c (Porsche Red)
Secondary:  #000000 (Deep Black)
Accent:     #ff0000 (Vibrant Red)
Background: #0a0a0a (Near Black)
Text:       #ffffff (White)
```

**Eco Mode**
```
Primary:    #00b74a (Fresh Green)
Secondary:  #ffffff (Pure White)
Accent:     #00d454 (Bright Green)
Background: #fafafa (Off White)
Text:       #1a1a1a (Near Black)
```

### Typography
- **Font Family**: Inter (Geometric sans-serif)
- **Scale**: Display (72px) → Tiny (12px)
- **Weights**: 300, 400, 500, 600, 700, 800
- **Letter Spacing**: Tight, Normal, Wide, Wider

### Spacing
- **System**: 8pt grid
- **Range**: 4px → 128px
- **Container**: Max 1440px

## 📱 Responsive Design

### Breakpoints
- **sm**: 640px (Mobile)
- **md**: 768px (Tablet)
- **lg**: 1024px (Desktop)
- **xl**: 1280px (Large Desktop)
- **2xl**: 1536px (Extra Large)

### Grid Layouts
- **Mobile**: 1 column
- **Tablet**: 2 columns
- **Desktop**: 3 columns

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators
- High contrast ratios (WCAG AA)
- Screen reader friendly

## 📊 Car Database

24 luxury vehicles across 5 categories:
- **Sports**: Porsche 911 GT3, Ferrari 296 GTB, McLaren 765LT
- **Electric**: Tesla Model S Plaid, Porsche Taycan, Lucid Air
- **Hybrid**: Porsche Panamera, Ferrari 296 GTB
- **SUV**: Porsche Cayenne, Range Rover, BMW X7
- **Luxury**: Rolls-Royce Phantom, Bentley Bentayga

Each car includes:
- High-quality images
- Complete specifications
- Performance data
- Pricing information

## 🎓 Assignment Requirements

### ✅ Completed Requirements
- [x] 5 HTML pages
- [x] Tailwind CSS with custom configuration
- [x] Two distinct themes (Sport/Eco)
- [x] Two Tailwind plugins
- [x] JavaScript ES6+ modules
- [x] localStorage persistence
- [x] Responsive design
- [x] Search & filter functionality
- [x] Porsche-inspired aesthetics

## 📝 License

MIT License - Educational project for SW 302

## 👤 Author

SW 302 Student - User Interface Development Course

## 🙏 Acknowledgments

- Porsche AG for design inspiration
- Unsplash for high-quality car images
- Tailwind CSS team for the framework
- Inter font family by Rasmus Andersson

---

**Built with ❤️ for automotive excellence**
