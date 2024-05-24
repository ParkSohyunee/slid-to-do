import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: "376px",
        tablet: "745px",
        desktop: "1920px",
      },
      fontFamily: {
        pretendard: ["Pretendard"],
      },
      fontSize: {
        xs: ["12px", "16px"],
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["18px", "28px"],
        xl: ["20px", "28px"],
        "2xl": ["24px", "32px"],
        "3xl": ["30px", "36px"],
      },
      colors: {
        primary: "#3B82F6", // blue-500
        "bland-blue": "#3182F6",
        error: "#B91C1C", // red
        basic: "#1E293B", // slate-800
      },
      borderRadius: {
        button: "8px",
        sm: "12px",
        md: "32px",
      },
    },
  },
  plugins: [],
}
export default config
