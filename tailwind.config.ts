import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  // dynamic으로 사용시 필요 리스트
  safelist: ["bg-[#ffeb00]", "bg-[#181717]", "text-[#333333]", "text-[#666666]"],
  theme: {
    fontSize: {
      heading: ["36px", { lineHeight: "150%", letterSpacing: "-0.25%" }],     // Heading 36px
      title1: ["24px", { lineHeight: "150%", letterSpacing: "-0.25%" }],      // Title1 24px    
      subtitle: ["20px", { lineHeight: "150%", letterSpacing: "-0.15%" }],    // Subtitle 20px
      title2: ["18px", { lineHeight: "150%", letterSpacing: "-0.15%" }],      // Title2 18px
      body: ["15px", { lineHeight: "150%", letterSpacing: "0%" }],            // Body2 15px
      caption: ["13px", { lineHeight: "150%", letterSpacing: "0%" }],         // Caption 13px
      small: ["11px", { lineHeight: "150%", letterSpacing: "0%" }],           // Small1 11px
    },
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
