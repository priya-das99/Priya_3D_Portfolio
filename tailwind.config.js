/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: {
          DEFAULT: 'var(--color-surface)',
          2: 'var(--color-surface-2)',
          3: 'var(--color-surface-3)',
        },
        primary: {
          blue: 'var(--color-primary-blue)',
          purple: 'var(--color-primary-purple)',
          pink: 'var(--color-primary-pink)',
        },
        cyan: 'var(--color-cyan)',
        teal: 'var(--color-teal)',
        orange: 'var(--color-orange)',
        status: {
          success: 'var(--color-success)',
          warning: 'var(--color-warning)',
          danger: 'var(--color-danger)',
          info: 'var(--color-info)',
        },
        content: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          disabled: 'var(--color-text-disabled)',
        },
        border: {
          subtle: 'var(--border-subtle)',
          medium: 'var(--border-medium)',
          strong: 'var(--border-strong)',
        }
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        destomed: ['Destomed', 'sans-serif'],
      },
      spacing: {
        '4': 'var(--space-4)',
        '8': 'var(--space-8)',
        '12': 'var(--space-12)',
        '16': 'var(--space-16)',
        '24': 'var(--space-24)',
        '32': 'var(--space-32)',
        '40': 'var(--space-40)',
        '48': 'var(--space-48)',
        '64': 'var(--space-64)',
        '80': 'var(--space-80)',
        '96': 'var(--space-96)',
        '128': 'var(--space-128)',
        '160': 'var(--space-160)',
        'section-desktop': 'var(--section-spacing-desktop)',
        'section-tablet': 'var(--section-spacing-tablet)',
        'section-mobile': 'var(--section-spacing-mobile)',
      },
      borderRadius: {
        '6': 'var(--radius-6)',
        '10': 'var(--radius-10)',
        '14': 'var(--radius-14)',
        '18': 'var(--radius-18)',
        '24': 'var(--radius-24)',
        '32': 'var(--radius-32)',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'glow-blue': 'var(--shadow-glow-blue)',
        'glow-purple': 'var(--shadow-glow-purple)',
        'glow-pink': 'var(--shadow-glow-pink)',
        'glow-white': 'var(--shadow-glow-white)',
      },
      transitionDuration: {
        '150': 'var(--duration-150)',
        '300': 'var(--duration-300)',
        '500': 'var(--duration-500)',
        '800': 'var(--duration-800)',
      },
      transitionTimingFunction: {
        'premium': 'var(--ease-premium)',
      },
      maxWidth: {
        '640': 'var(--container-640)',
        '768': 'var(--container-768)',
        '1024': 'var(--container-1024)',
        '1280': 'var(--container-1280)',
        '1440': 'var(--container-1440)',
      }
    },
  },
  plugins: [],
}
