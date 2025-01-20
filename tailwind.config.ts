import type { Config } from "tailwindcss";

const config: Config = {
  // darkMode: ["class"],
  content: ["./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  // dynamic으로 사용시 필요 리스트
  safelist: ["bg-[#ffeb00]", "bg-[#181717]", "text-[#1a1a1a]", "text-[#6e6e6e]", "border-[#d6d6d6]"],
  theme: {
    fontSize: {
      heading: ["36px", { lineHeight: "150%", letterSpacing: "-0.025em" }], // Heading 36px
      title1: ["24px", { lineHeight: "150%", letterSpacing: "-0.025em" }], // Title1 24px
      subtitle: ["20px", { lineHeight: "150%", letterSpacing: "-0.015em" }], // Subtitle 20px
      title2: ["18px", { lineHeight: "150%", letterSpacing: "-0.015em" }], // Title2 18px
      body: ["15px", { lineHeight: "150%", letterSpacing: "0" }], // Body2 15px
      caption: ["13px", { lineHeight: "150%", letterSpacing: "0" }], // Caption 13px
      small: ["11px", { lineHeight: "150%", letterSpacing: "0" }] // Small1 11px
    },
    extend: {
      colors: {
        primary: {
          default: "#FF3365",
          light: "#FF85A3",
          strong: "#E81D4E",
          "50": "#FFEBF0",
          "100": "#FFD6E0",
          "200": "#FFADC2",
          "300": "#FF85A3",
          "400": "#FF5C85",
          "500": "#FF3365",
          "600": "#E81D4E",
          "700": "#C00C37",
          "800": "#7A001F",
          "900": "#3D000F",
          "950": "#1F0008"
        },
        secondary: {
          default: "#0C0C0E",
          light: "#464653"
        },
        status: {
          success: "#00F050",
          danger: "#E74646",
          warning: "#FFCD38",
          info: "#3F8CFD"
        },
        black: {
          DEFAULT: "#000000",
          "50": "#F1F1F3",
          "100": "#E3E3E8",
          "200": "#C8C8D0",
          "300": "#ACACB9",
          "400": "#9191A1",
          "500": "#75758A",
          "600": "#5E5E6E",
          "700": "#464653",
          "800": "#2F2F37",
          "900": "#17171B",
          "950": "#0C0C0E"
        },
        bg: {
          "01": "#FFFFFF",
          "02": "#F5F5F5",
          "03": "#1A1A1A"
        },
        line: {
          "01": "#F5F5F5",
          "02": "#E8E8E8",
          "03": "#D1D1D1",
          "04": "#B8B8B8"
        },
        text: {
          "01": "#FFFFFF",
          "02": "#B8B8B8",
          "03": "#6E6E6E",
          "04": "#1A1A1A"
        },
        gray: {
          "50": "#F5F5F5",
          "100": "#E8E8E8",
          "200": "#D1D1D1",
          "300": "#B8B8B8",
          "400": "#9E9E9E",
          "500": "#878787",
          "600": "#6E6E6E",
          "700": "#575757",
          "800": "#3D3D3D",
          "900": "#242424",
          "950": "#1A1A1A"
        },
        green: {
          "100": "#F0FFF5",
          "200": "#BDFFD3",
          "300": "#8AFFB1",
          "400": "#57FF8F",
          "500": "#24FF6D",
          "600": "#00F050",
          "700": "#00BF40",
          "800": "#008A2E",
          "900": "#00571D",
          "950": "#00240C"
        },
        red: {
          "100": "#FEFAFA",
          "200": "#F9CDCD",
          "300": "#F3A0A0",
          "400": "#ED7373",
          "500": "#E74646",
          "600": "#DF1D1D",
          "700": "#B01717",
          "800": "#831111",
          "900": "#560B0B",
          "950": "#290505"
        },
        yellow: {
          "100": "#FFF4D1",
          "200": "#FFE79E",
          "300": "#FFDA6B",
          "400": "#FFCD38",
          "500": "#FFC107",
          "600": "#D19D00",
          "700": "#9E7700",
          "800": "#6B5000",
          "900": "#382A00",
          "950": "#050400"
        },
        blue: {
          "100": "#D7E7FF",
          "200": "#A4C8FE",
          "300": "#71AAFE",
          "400": "#3F8CFD",
          "500": "#0C6EFD",
          "600": "#0257D4",
          "700": "#0142A2",
          "800": "#012E6F",
          "900": "#01193D",
          "950": "#00040A"
        }
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" }
        },
        fadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" }
        },
        scaleUp: {
          from: { transform: "scale(0.95)" },
          to: { transform: "scale(1)" }
        },
        scaleDown: {
          from: { transform: "scale(1)" },
          to: { transform: "scale(0.95)" }
        },
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" }
        }
      },
      animation: {
        gradient: "gradient 4s linear infinite",
        fadeIn: "fadeIn 0.3s ease-out",
        fadeOut: "fadeOut 0.3s ease-out",
        scaleUp: "scaleUp 0.3s ease-out",
        scaleDown: "scaleDown 0.3s ease-out"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
export default config;
