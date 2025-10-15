/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 👈 VERY IMPORTANT
  safelist: [
    'dark',
    'text-primary',
    'text-primary-dark',
    'dark:text-primary-dark',
  ],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-dark': 'var(--color-primary-dark)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-10%)' },
        },
      },
      animation: {
        marquee: 'marquee 10s linear infinite',
      },
    },
  },
  plugins: [],
};