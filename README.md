# Car Explorer Web App

**Assignment 2 - SW 302 User Interface Development**

A luxury car browsing application with dual Sport/Eco themes, built with Tailwind CSS and vanilla JavaScript.

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/shadow9-1-1/Car-Explorer-Web-App.git
   cd Car-Explorer-Web-App
   ```

2. **Open in browser**
   - Simply open `src/pages/index.html` in your browser
   - Or use Live Server extension in VS Code

## 📁 Project Structure

```
Car-Explorer-Web-App/
├── src/
│   ├── css/
│   │   └── output.css          # Compiled Tailwind CSS
│   ├── data/
│   │   └── cars.json           # Car database
│   ├── js/
│   │   ├── api.js              # Data fetching & filtering
│   │   ├── app.js              # Main controller
│   │   ├── compare.js          # Comparison logic
│   │   ├── storage.js          # localStorage management
│   │   ├── theme-switcher.js   # Theme toggle
│   │   └── ui.js               # UI rendering
│   └── pages/
│       ├── index.html          # Home page
│       ├── browse.html         # Car gallery
│       ├── details.html        # Car details
│       ├── favorites.html      # Saved cars
│       └── compare.html        # Comparison page
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎨 Features

### Dual Theme System
- **Sport Mode**: Red/black racing aesthetics
- **Eco Mode**: Green/white sustainable design
- One-click theme toggle with localStorage persistence

### Browse & Filter
- Live search by car name or brand
- Category filtering (Sports, SUV, Luxury, Electric, Hybrid)
- Price range slider
- Horsepower filter
- Multiple sorting options

### Favorites
- Save cars with heart icon
- Persistent storage using localStorage
- Dedicated favorites page

### Compare
- Side-by-side comparison up to 3 cars
- Performance metrics highlighted
- Winner determination based on specs

## 🛠️ Technologies

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first styling
- **JavaScript ES6+** - Modular architecture
- **localStorage** - Client-side data persistence

## 📱 Pages

1. **Home** - Hero section with quick navigation
2. **Browse** - Complete car catalog with advanced filters
3. **Details** - Individual car specifications
4. **Favorites** - Your saved collection
5. **Compare** - Side-by-side vehicle comparison

## 🎯 Key Highlights

- **Modular ES6** - Clean, maintainable code
- **Responsive Design** - Works on all devices
- **Porsche-Inspired** - Luxury minimalist aesthetics
- **Dual Themes** - Sport & Eco modes

## 📝 Assignment Details

- **Course**: SW 302 - User Interface Development
- **Assignment**: Assignment 2
- **Student**: Ahmed Wael 

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators
- High contrast ratios (WCAG AA)
- Screen reader friendly

## 📊 Car Database

40 luxury vehicles across 5 categories:
- **Sports**
- **Electric**
- **Hybrid**
- **SUV**
- **Luxury**

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

---


