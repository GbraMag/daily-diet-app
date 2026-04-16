import { NavigationContainer, DefaultTheme as NavigationLightTheme } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";

import { AppRoutes } from "./src/routes/app.routes";
import { lightTheme } from "./src/theme";

export default function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <NavigationContainer theme={NavigationLightTheme}>
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  );
}