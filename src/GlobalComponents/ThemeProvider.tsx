import { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const defaultTheme =
    JSON.parse(localStorage.getItem("theme") as string) || false;

  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const setThemeMode = (mode: string) => setTheme(mode);

  return (
    <ThemeContext.Provider value={{ theme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

const useThemeHook = () => {
  const { theme } = useContext(ThemeContext);
  return [theme];
};

export { ThemeProvider, ThemeContext, useThemeHook };
