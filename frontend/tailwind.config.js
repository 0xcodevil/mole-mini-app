import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
        margarine: ['Margarine', ...defaultTheme.fontFamily.sans],
        marcellus: ['Marcellus', ...defaultTheme.fontFamily.sans],
        lily: ['Lily Script One', ...defaultTheme.fontFamily.sans],
        lemon: ['Lemon', ...defaultTheme.fontFamily.sans],
        lilita: ['Lilita One', ...defaultTheme.fontFamily.sans],
        madimi: ['Madimi One', ...defaultTheme.fontFamily.sans],
        sawarabi: ['Sawarabi Gothic', ...defaultTheme.fontFamily.sans],
        press: ["'Press Start 2P'", ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}

