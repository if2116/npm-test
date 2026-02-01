import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Manrope', 'Noto Sans SC', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Monaco', 'Courier New', 'monospace'],
        display: ['Manrope', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#155EEF',
          foreground: '#ffffff',
          50: '#e8f2ff',
          100: '#d1e7ff',
          200: '#a3c9ff',
          300: '#75abff',
          400: '#468dff',
          500: '#155EEF',
          600: '#0041c2',
          700: '#003294',
          800: '#002466',
          900: '#001637',
          950: '#000b1f',
        },
        secondary: {
          DEFAULT: '#f4f4f5',
          foreground: '#18181b',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#f4f4f5',
          foreground: '#71717a',
        },
        accent: {
          DEFAULT: '#0F4761',
          foreground: '#ffffff',
          50: '#e0f4ff',
          100: '#b4e9ff',
          200: '#7ddcff',
          300: '#46cfff',
          400: '#10c2ff',
          500: '#0F4761',
          600: '#0c384e',
          700: '#09293b',
          800: '#061a28',
          900: '#030c16',
        },
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#18181b',
        },
        card: {
          DEFAULT: '#ffffff',
          foreground: '#18181b',
        },
        success: {
          DEFAULT: '#10B981',
          foreground: '#ffffff',
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10B981',
          600: '#059669',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      borderRadius: {
        lg: '0.75rem',
        md: 'calc(0.75rem - 2px)',
        sm: 'calc(0.75rem - 4px)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(21, 94, 239, 0.08), 0 10px 20px -2px rgba(21, 94, 239, 0.04)',
        'glow': '0 0 20px rgba(21, 94, 239, 0.15)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'slide-in': {
          from: { transform: 'translateY(-10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'scale-in': {
          from: { transform: 'scale(0.95)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        'shimmer': {
          '0%, 100%': { backgroundPosition: '200% 0' },
          '50%': { backgroundPosition: '0 0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
