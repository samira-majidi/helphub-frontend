import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./widget/**/*.{js,ts,jsx,tsx,mdx}",   // 👈 این خط اضافه شد (برای Navbar)
    "./entities/**/*.{js,ts,jsx,tsx,mdx}", // 👈 این خط اضافه شد (برای Notifications)
    "./features/**/*.{js,ts,jsx,tsx,mdx}", // 👈 اگر پوشه features داری
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0A1E3F',
          yellow: '#FACC15',
          light: '#F8FAFC',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-merriweather)', 'serif'],
      }
    },
  },
  plugins: [],
};
export default config;