/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./src/pages/**/*.html",
  ],
  theme: {
    extend: {
      // Custom Color Palette - Porsche-Inspired Luxury
      colors: {
        // Sport Mode Colors (Aggressive Red/Black)
        sport: {
          primary: '#d5001c',      // Porsche Racing Red
          secondary: '#000000',    // Deep Black
          accent: '#ff0000',       // Vibrant Red
          dark: '#0a0a0a',         // Background Dark
          card: '#1a1a1a',         // Card Background
          hover: '#2d2d2d',        // Hover State
          border: '#d5001c',       // Border Color
          'border-subtle': 'rgba(255, 255, 255, 0.1)',
          glow: '#ff3333',         // Neon Red Glow
          text: {
            primary: '#ffffff',
            secondary: '#b8b8b8',
            muted: '#707070',
          },
        },
        // Eco Mode Colors (Fresh Green/White)
        eco: {
          primary: '#00b74a',      // Fresh Green
          secondary: '#ffffff',    // Pure White
          accent: '#00d454',       // Bright Green
          light: '#fafafa',        // Background Light
          card: '#ffffff',         // Card Background
          hover: '#f0f0f0',        // Hover State
          border: '#e0e0e0',       // Border Color
          'border-subtle': '#f0f0f0',
          highlight: '#d4f4dd',    // Light Green Wash
          text: {
            primary: '#1a1a1a',
            secondary: '#6b6b6b',
            muted: '#9e9e9e',
          },
        },
        // Shared/Base Colors
        luxury: {
          black: '#000000',
          'off-black': '#1a1a1a',
          white: '#ffffff',
          'off-white': '#f5f5f5',
          'porsche-red': '#d5001c',
          'deep-red': '#a30016',
          platinum: '#e0e0e0',
          charcoal: '#2d2d2d',
          silver: '#c4c4c4',
        },
      },

      // Typography - Clean Geometric Sans-serif
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Inter', 'Helvetica Neue', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },

      // Font Sizes - Porsche Scale
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'hero': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h1': ['2.25rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h2': ['1.875rem', { lineHeight: '1.35', fontWeight: '600' }],
        'h3': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'tiny': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }],
      },

      // Letter Spacing
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0',
        wide: '0.05em',
        wider: '0.1em',
      },

      // Spacing System - 8pt Grid
      spacing: {
        'xs': '0.25rem',   // 4px
        'sm': '0.5rem',    // 8px
        'md': '1rem',      // 16px
        'lg': '1.5rem',    // 24px
        'xl': '2rem',      // 32px
        '2xl': '3rem',     // 48px
        '3xl': '4rem',     // 64px
        '4xl': '6rem',     // 96px
        '5xl': '8rem',     // 128px
      },

      // Container
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1440px',
        },
      },

      // Box Shadows - Luxury Effects
      boxShadow: {
        'sport-glow': '0 0 30px rgba(213, 0, 28, 0.5)',
        'sport-card': '0 4px 20px rgba(0, 0, 0, 0.8)',
        'sport-hover': '0 10px 40px rgba(213, 0, 28, 0.4)',
        'eco-soft': '0 2px 15px rgba(0, 183, 74, 0.15)',
        'eco-card': '0 2px 10px rgba(0, 0, 0, 0.08)',
        'eco-hover': '0 8px 30px rgba(0, 183, 74, 0.2)',
        'luxury': '0 10px 40px rgba(0, 0, 0, 0.3)',
      },

      // Border Radius
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'DEFAULT': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
      },

      // Transitions
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '600': '600ms',
      },

      // Backdrop Blur
      backdropBlur: {
        'navbar': '10px',
      },

      // Z-index
      zIndex: {
        'navbar': '50',
        'modal': '100',
        'overlay': '40',
      },

      // Aspect Ratios
      aspectRatio: {
        'car': '16 / 10',
        'card': '3 / 2',
      },
    },
  },

  plugins: [
    // Typography Plugin - For rich text content
    require('@tailwindcss/typography'),
    
    // Forms Plugin - For styled form inputs
    require('@tailwindcss/forms'),

    // Custom Plugin - Theme-based Color Variants
    function({ addVariant }) {
      addVariant('theme-sport', '.theme-sport &');
      addVariant('theme-eco', '.theme-eco &');
    },

    // Custom Plugin - Reusable Component Classes
    function({ addComponents, theme }) {
      const components = {
        // Car Card Component
        '.car-card': {
          position: 'relative',
          overflow: 'hidden',
          borderRadius: theme('borderRadius.lg'),
          backgroundColor: theme('colors.luxury.charcoal'),
          transition: 'all 0.4s ease',
          cursor: 'pointer',
          
          // Default Sport Mode Styling
          '.theme-sport &': {
            backgroundColor: theme('colors.sport.card'),
            border: `1px solid ${theme('colors.sport.border-subtle')}`,
            
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: theme('boxShadow.sport-hover'),
              borderColor: theme('colors.sport.border'),
            },
          },

          // Eco Mode Styling
          '.theme-eco &': {
            backgroundColor: theme('colors.eco.card'),
            border: `1px solid ${theme('colors.eco.border')}`,
            boxShadow: theme('boxShadow.eco-card'),
            
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: theme('boxShadow.eco-hover'),
              borderColor: theme('colors.eco.primary'),
            },
          },

          // Car Card Image
          '.car-card__image': {
            width: '100%',
            aspectRatio: '16 / 10',
            objectFit: 'cover',
            transition: 'transform 0.6s ease',
            
            '.car-card:hover &': {
              transform: 'scale(1.05)',
            },
          },

          // Car Card Content Overlay
          '.car-card__content': {
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            padding: theme('spacing.lg'),
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95), transparent)',
            
            '.theme-eco &': {
              background: 'linear-gradient(to top, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.7))',
            },
          },

          // Car Card Title
          '.car-card__title': {
            fontSize: theme('fontSize.h3[0]'),
            fontWeight: theme('fontWeight.semibold'),
            color: theme('colors.luxury.white'),
            marginBottom: theme('spacing.sm'),
            
            '.theme-eco &': {
              color: theme('colors.eco.text.primary'),
            },
          },

          // Car Card Meta
          '.car-card__meta': {
            fontSize: theme('fontSize.small[0]'),
            textTransform: 'uppercase',
            letterSpacing: theme('letterSpacing.wider'),
            color: theme('colors.sport.text.secondary'),
            
            '.theme-eco &': {
              color: theme('colors.eco.text.secondary'),
            },
          },

          // Car Card Price
          '.car-card__price': {
            fontSize: theme('fontSize.h3[0]'),
            fontWeight: theme('fontWeight.bold'),
            marginTop: theme('spacing.md'),
            
            '.theme-sport &': {
              color: theme('colors.sport.primary'),
            },
            
            '.theme-eco &': {
              color: theme('colors.eco.primary'),
            },
          },

          // Car Card CTA Button
          '.car-card__cta': {
            marginTop: theme('spacing.md'),
            opacity: '0',
            transform: 'translateY(10px)',
            transition: 'all 0.3s ease',
            
            '.car-card:hover &': {
              opacity: '1',
              transform: 'translateY(0)',
            },
          },
        },

        // Action Button Component
        '.button-action': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `${theme('spacing.3')} ${theme('spacing.8')}`,
          fontSize: theme('fontSize.sm[0]'),
          fontWeight: theme('fontWeight.semibold'),
          textTransform: 'uppercase',
          letterSpacing: theme('letterSpacing.wider'),
          borderRadius: theme('borderRadius.lg'),
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          border: 'none',
          outline: 'none',
          
          // Primary Button - Sport Mode
          '&.button-action--primary': {
            '.theme-sport &': {
              backgroundColor: theme('colors.sport.primary'),
              color: theme('colors.luxury.white'),
              
              '&:hover': {
                backgroundColor: theme('colors.luxury.deep-red'),
                boxShadow: theme('boxShadow.sport-glow'),
                transform: 'scale(1.02)',
              },
              
              '&:active': {
                transform: 'scale(0.98)',
              },
            },
            
            // Primary Button - Eco Mode
            '.theme-eco &': {
              backgroundColor: theme('colors.eco.primary'),
              color: theme('colors.luxury.white'),
              
              '&:hover': {
                backgroundColor: theme('colors.eco.accent'),
                boxShadow: theme('boxShadow.eco-soft'),
                transform: 'scale(1.02)',
              },
              
              '&:active': {
                transform: 'scale(0.98)',
              },
            },
          },

          // Secondary Button - Sport Mode
          '&.button-action--secondary': {
            '.theme-sport &': {
              backgroundColor: 'transparent',
              color: theme('colors.luxury.white'),
              border: `2px solid ${theme('colors.luxury.white')}`,
              
              '&:hover': {
                backgroundColor: theme('colors.luxury.white'),
                color: theme('colors.luxury.black'),
              },
            },
            
            // Secondary Button - Eco Mode
            '.theme-eco &': {
              backgroundColor: 'transparent',
              color: theme('colors.eco.primary'),
              border: `2px solid ${theme('colors.eco.primary')}`,
              
              '&:hover': {
                backgroundColor: theme('colors.eco.primary'),
                color: theme('colors.luxury.white'),
              },
            },
          },

          // Button Sizes
          '&.button-action--sm': {
            padding: `${theme('spacing.2')} ${theme('spacing.6')}`,
            fontSize: theme('fontSize.xs'),
            height: theme('spacing.10'),
          },

          '&.button-action--md': {
            padding: `${theme('spacing.3')} ${theme('spacing.8')}`,
            fontSize: theme('fontSize.sm[0]'),
            height: theme('spacing.12'),
          },

          '&.button-action--lg': {
            padding: `${theme('spacing.4')} ${theme('spacing.10')}`,
            fontSize: theme('fontSize.base'),
            height: theme('spacing.14'),
          },

          // Disabled State
          '&:disabled': {
            opacity: '0.5',
            cursor: 'not-allowed',
            
            '&:hover': {
              transform: 'none',
              boxShadow: 'none',
            },
          },
        },
      };

      addComponents(components);
    },
  ],
};
