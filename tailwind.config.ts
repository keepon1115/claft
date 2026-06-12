import type { Config } from 'tailwindcss';

// 色の実体は app/globals.css の :root（CSS変数）が単一ソース。
// ここでは RGB トリプレット変数を参照し、brand/10 のような不透明度修飾子も使えるようにする。
const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: 'rgb(var(--brand-rgb) / <alpha-value>)',
        pink: 'rgb(var(--pink-rgb) / <alpha-value>)',
        cream: 'rgb(var(--cream-rgb) / <alpha-value>)',
        green: 'rgb(var(--green-rgb) / <alpha-value>)',
        violet: 'rgb(var(--violet-rgb) / <alpha-value>)',
        ink: {
          900: 'rgb(var(--ink-900-rgb) / <alpha-value>)',
          800: 'rgb(var(--ink-800-rgb) / <alpha-value>)',
          700: 'rgb(var(--ink-700-rgb) / <alpha-value>)',
          600: 'rgb(var(--ink-600-rgb) / <alpha-value>)',
          500: 'rgb(var(--ink-500-rgb) / <alpha-value>)'
        },
        paper: 'var(--paper)',
        desk: 'var(--desk)'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(31,41,55,.08)',
        paper: 'var(--shadow-paper)',
        'paper-lift': 'var(--shadow-paper-lift)',
        sticker: 'var(--shadow-sticker)'
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
