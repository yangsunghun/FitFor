import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  // dynamic으로 사용시 필요 리스트
  safelist: ["bg-[#ffeb00]", "bg-[#181717]", "text-[#333333]", "text-[#666666]"],
  theme: {
    fontSize: {
      heading: ["36px", { lineHeight: "150%", letterSpacing: "-0.25%" }], // Heading 36px
      title1: ["24px", { lineHeight: "150%", letterSpacing: "-0.25%" }], // Title1 24px
      subtitle: ["20px", { lineHeight: "150%", letterSpacing: "-0.15%" }], // Subtitle 20px
      title2: ["18px", { lineHeight: "150%", letterSpacing: "-0.15%" }], // Title2 18px
      body: ["15px", { lineHeight: "150%", letterSpacing: "0%" }], // Body2 15px
      caption: ["13px", { lineHeight: "150%", letterSpacing: "0%" }], // Caption 13px
      small: ["11px", { lineHeight: "150%", letterSpacing: "0%" }] // Small1 11px
    },
    extend: {
      colors: {
        primary: {
          active: "#FF3365",
          hover: "#FF85A3",
          pressed: "#E81D4E"
        },
        secondary: {
          active: "#2659C0",
          hover: "#5D88DF",
          pressed: "#1F499E"
        },
        status: {
          success: "#00BF40",
          danger: "#DF1D1D",
          warning: "#FFC107",
          info: "#0D6EFD"
        },
        line: {
          "01": "#F5F5F5",
          "02": "#E8E8E8",
          "03": "#D1D1D1",
          "04": "#B8B8B8"
        },
        text: {
          "01": "#B8B8B8",
          "02": "#6E6E6E",
          "03": "#1A1A1A"
        }
      }
    }
  },
  plugins: []
};
export default config;
