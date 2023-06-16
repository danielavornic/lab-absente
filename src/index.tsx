import { createRoot } from "react-dom/client";
import "tailwindcss/tailwind.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AuthProvider } from "providers";
import Routes from "routes";

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);

const theme = extendTheme({
  colors: {
    brand: {
      100: "#8cc7f0",
      200: "#6fb2e6",
      300: "#528dde",
      400: "#3588d4",
      500: "#337ab7",
      600: "#2d68a3",
      700: "#26568f",
      800: "#1f447b",
      900: "#183367",
    },
  },
});

root.render(
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </ChakraProvider>,
);
