import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  safelist: ["bg-[#ffeb00]", "bg-[#181717]", "text-[#333333]", "text-[#666666]"],
  theme: {
    extend: {
      colors: {
        // primary: "#3B61B9", 색상 정의되면 사용 예정
        // background: "#FFFAF5",
        // warning: "#ef6f7e",
        // textDark: "#544A40",
        // textLight: "#AB9B8A",
      }
    }
  },
  plugins: []
};
export default config;
