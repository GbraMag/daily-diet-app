import { colors } from "./colors"

export const lightTheme = {
  colors,

  radius: {
    sm: "8px",
    md: "12px",
    lg: "14px",
    xl: "18px",
    xxl: "24px",
    pill: "999px",
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
    xxl: "24px",
  },

  fontSize: {
    sm: "13px",
    md: "14px",
    lg: "15px",
    xl: "18px",
    xxl: "24px",
    hero: "34px",
  },
} as const

export const theme = lightTheme