import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: 'var(--brand)',
        pink: 'var(--pink)',
        cream: 'var(--cream)',
        green: 'var(--green)',
        ink: {
          900: 'var(--ink-900)',
          800: 'var(--ink-800)',
          700: 'var(--ink-700)',
          600: 'var(--ink-600)',
          500: 'var(--ink-500)'
        }
      },
      boxShadow: {
        soft: 'var(--shadow)'
      },
      borderRadius: {
        xl: 'var(--radius)',
        '2xl': 'var(--radius-lg)'
      }
    }
  },
  plugins: []
};

export default config;
