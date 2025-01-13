import type { Config } from "tailwindcss";

const config: Config = {
  // darkMode: ["class"],
  content: ["./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  // dynamic으로 사용시 필요 리스트
  safelist: ["bg-[#ffeb00]", "bg-[#181717]", "text-[#333333]", "text-[#666666]"],
  theme: {
    fontSize: {
      heading: [
        "36px",
        {
          lineHeight: "150%",
          letterSpacing: "-0.25%"
        }
      ],
      title1: [
        "24px",
        {
          lineHeight: "150%",
          letterSpacing: "-0.25%"
        }
      ],
      subtitle: [
        "20px",
        {
          lineHeight: "150%",
          letterSpacing: "-0.15%"
        }
      ],
      title2: [
        "18px",
        {
          lineHeight: "150%",
          letterSpacing: "-0.15%"
        }
      ],
      body: [
        "15px",
        {
          lineHeight: "150%",
          letterSpacing: "0%"
        }
      ],
      caption: [
        "13px",
        {
          lineHeight: "150%",
          letterSpacing: "0%"
        }
      ],
      small: [
        "11px",
        {
          lineHeight: "150%",
          letterSpacing: "0%"
        }
      ]
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
  plugins: [require("tailwindcss-animate")]
};
export default config;
