import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Surfaces ─────────────────────────────────────────
        ink: '#14171B',
        slate: {
          DEFAULT: '#1C2025',
          raised: '#222830',
          border: '#2C333C',
        },

        // ── Text ─────────────────────────────────────────────
        paper: '#ECEDEE',
        quiet: '#8B919A',
        muted: '#555D67',

        // ── Academy Blue ──────────────────────────────────────
        blue: {
          DEFAULT: '#1E6FA8',
          light: '#2A8FD4',
          dim: '#1A5F8F',
          ghost: 'rgba(30,111,168,0.12)',
          border: 'rgba(30,111,168,0.30)',
        },

        // ── Brass ────────────────────────────────────────────
        brass: {
          DEFAULT: '#B08D57',
          light: '#C9A46E',
          dim: '#8A6D42',
          ghost: 'rgba(176,141,87,0.10)',
          border: 'rgba(176,141,87,0.25)',
        },

        // ── Semantic ──────────────────────────────────────────
        success: '#3D8E6B',
        warning: '#C08730',
        error: '#B04040',
      },

      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },

      fontSize: {
        'xs': ['0.694rem', { lineHeight: '1.5' }],
        'sm': ['0.833rem', { lineHeight: '1.5' }],
        'base': ['1rem', { lineHeight: '1.5' }],
        'md': ['1.200rem', { lineHeight: '1.5' }],
        'lg': ['1.440rem', { lineHeight: '1.3' }],
        'xl': ['1.728rem', { lineHeight: '1.3' }],
        '2xl': ['2.074rem', { lineHeight: '1.2' }],
        '3xl': ['2.488rem', { lineHeight: '1.15' }],
        '4xl': ['2.986rem', { lineHeight: '1.1' }],
        '5xl': ['3.583rem', { lineHeight: '1.1' }],
        '6xl': ['4.300rem', { lineHeight: '1.05' }],
      },

      letterSpacing: {
        tight: '-0.025em',
        normal: '0em',
        wide: '0.04em',
        wider: '0.08em',
        widest: '0.14em',
      },

      boxShadow: {
        'xs': '0 1px 2px rgba(0,0,0,0.40)',
        'sm': '0 1px 3px rgba(0,0,0,0.50), 0 1px 2px rgba(0,0,0,0.40)',
        'md': '0 4px 8px rgba(0,0,0,0.50), 0 2px 4px rgba(0,0,0,0.40)',
        'lg': '0 10px 24px rgba(0,0,0,0.60), 0 4px 8px rgba(0,0,0,0.40)',
        'xl': '0 20px 40px rgba(0,0,0,0.65), 0 8px 16px rgba(0,0,0,0.45)',
        '2xl': '0 32px 64px rgba(0,0,0,0.75)',
        'brass': '0 0 0 1px rgba(176,141,87,0.25), 0 8px 24px rgba(176,141,87,0.15)',
        'blue': '0 0 0 3px rgba(30,111,168,0.35)',
        'focus': '0 0 0 2px #14171B, 0 0 0 4px #1E6FA8',
        'inset': 'inset 0 2px 4px rgba(0,0,0,0.40)',
      },

      borderRadius: {
        'none': '0',
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        'full': '9999px',
      },

      spacing: {
        '0.5': '0.125rem',
        '1.5': '0.375rem',
        '2.5': '0.625rem',
        '3.5': '0.875rem',
      },

      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1.0)',
        'decel': 'cubic-bezier(0.0, 0.0, 0.1, 1.0)',
        'out': 'cubic-bezier(0.0, 0.0, 0.2, 1.0)',
      },

      transitionDuration: {
        'instant': '80ms',
        'fast': '150ms',
        'normal': '250ms',
        'slow': '400ms',
        'slower': '600ms',
      },

      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(24px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-600px 0' },
          '100%': { backgroundPosition: '600px 0' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
      },

      animation: {
        'fade-up': 'fade-up 400ms cubic-bezier(0.0, 0.0, 0.1, 1.0) both',
        'fade-in': 'fade-in 250ms ease-out both',
        'slide-in-right': 'slide-in-right 250ms ease-out both',
        'scale-in': 'scale-in 250ms cubic-bezier(0.34, 1.56, 0.64, 1.0) both',
        'shimmer': 'shimmer 1.4s ease-in-out infinite',
        'spin-slow': 'spin-slow 0.7s linear infinite',
      },

      maxWidth: {
        'prose': '72ch',
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1200px',
        '2xl': '1400px',
      },

      backdropBlur: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
      },
    },
  },
  plugins: [],
}

export default config
