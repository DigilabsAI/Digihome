import type { TailwindConfig } from "@react-email/tailwind";

export const emailTailwindConfig: TailwindConfig = {
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#37352F",
        muted: "#F7F6F3",
        border: "#E9E9E7",
        card: "#FFFFFF",
        hover: "#F1F1EF",
        primary: "#1f1f1f",
        green: "#27AE60",
        red: "#EB5757",
        yellow: "#F2C94C",
        purple: "#9B51E0",
        pink: "#ED64A6",
      },
      borderRadius: {
        md: "6px",
        lg: "8px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.04)",
        md: "0 3px 6px rgba(0,0,0,0.06)",
      },
    },
  },
};