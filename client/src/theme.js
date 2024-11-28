// theme.js or theme/index.js
import { extendTheme } from "@chakra-ui/react";

// Define font sizes and weights as per the specifications
const theme = extendTheme({
  fonts: {
    body: "Montserrat, sans-serif",
    heading: "Montserrat, sans-serif",
  },
  fontSizes: {
    h1: "48px", // Primary H1
    h2: "36px", // Primary H2
    body: "16px", // Body text
    accent: "18px", // Accent Text
    secondaryH1: "46px", // Secondary H1
    secondaryH2: "34px", // Secondary H2
    secondaryBody: "16px", // Secondary body text
    tertiaryH1: "44px", // Tertiary H1
    tertiaryH2: "32px", // Tertiary H2
    caption: "14px", // Caption text
    documentationHeader: "24px", // Documentation header size
    documentationSubheader: "20px", // Documentation subheader size
  },
  fontWeights: {
    bold: 700,
    semiBold: 600,
    medium: 500,
    regular: 400,
    light: 300,
  },
  colors: {
    black: "#000000",
    yellowGold: "#D4AF37",
    darkGray: "#333333",
    red: "#FF0000",
    lightGray: "#E5E5E5",
    white: "#FFFFFF",
  },
});

export default theme;
