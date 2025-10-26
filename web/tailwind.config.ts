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
        brand: '#34c6be',
        pink: '#f06a6a',
        cream: '#ffd66b',
        green: '#58c3a2',
        ink: {
          900: '#1f2937',
          800: '#273446',
          700: '#374151',
          600: '#4b5563',
          500: '#6b7280'
        }
      },
      boxShadow: {
        soft: '0 10px 30px rgba(31,41,55,.08)'
      },
      borderRadius: {
        xl: '20px',
        '2xl': '28px'
      }
    }
  },
  plugins: []
};

export default config;
