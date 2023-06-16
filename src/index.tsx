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
      100: "#DAE6F2",
      200: "#B7CEE3",
      300: "#95B6D4",
      400: "#729EC6",
      500: "#0B5493",
      600: "#0A4B83",
      700: "#08406F",
      800: "#06365B",
      900: "#042C47",
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
