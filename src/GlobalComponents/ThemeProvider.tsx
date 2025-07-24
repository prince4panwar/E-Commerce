import {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactElement,
} from "react";

interface ThemeContextType {
  theme: boolean;
  setThemeMode: (mode: string) => void;
}

interface ThemeProviderProps {
  children: ReactElement;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function ThemeProvider({ children }: ThemeProviderProps) {
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
  const { theme, setThemeMode } = useContext(ThemeContext) as ThemeContextType;
  return [theme, setThemeMode];
};

export { ThemeProvider, ThemeContext, useThemeHook };
