import { darkTheme, lightTheme } from "./theme/theme.ts";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ThemeType from "./enums/themeType.enum.ts";
import { useThemeSelection } from "./context/themeContext.tsx";
import { useMemo } from "react";
import HomePage from "./pages/home.page.tsx";
import Page from "./components/page.tsx";
import { ToastContainer } from "react-toastify";

function App() {
  const { theme } = useThemeSelection();
  const selectedTheme = useMemo(() => (
    theme === ThemeType.Light ? lightTheme : darkTheme
  ), [theme]);

  return (
    <ThemeProvider theme={selectedTheme}>
      <CssBaseline />
      <Page>
        <HomePage />
      </Page>
      <ToastContainer position="bottom-right" />
    </ThemeProvider>
  )
}

export default App
