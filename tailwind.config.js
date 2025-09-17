/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 🔹 نضيف radial gradient
      backgroundImage: {
        'radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      },
      // 🔹 نربط خط Exo 2 اللي ضفناه في layout.tsx
      fontFamily: {
        exo: ['var(--font-exo2)', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}