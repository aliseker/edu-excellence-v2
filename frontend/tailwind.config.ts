import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'signature-purple': '#6A3DF0',
        'academic-red': '#E63946',
        'dark-carbon': '#1F1F1F',
        'clean-white': '#FFFFFF',
        'soft-light-gray': '#F5F6FA',
        'soft-purple': '#E9E3FF',
      },
    },
  },
  plugins: [],
};

export default config;









