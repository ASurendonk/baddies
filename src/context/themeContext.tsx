import { createContext, useState, useContext, type Dispatch, type SetStateAction, type ReactNode } from 'react';
import ThemeType from "../enums/themeType.enum.ts";

interface ThemeSelectionContextType {
  theme: ThemeType;
  setTheme: Dispatch<SetStateAction<ThemeType>>;
}

const ThemeSelectionContext = createContext<ThemeSelectionContextType | undefined>(undefined);

interface ThemeSelectionProviderProps {
  children: ReactNode;
}

export const ThemeSelectionProvider = ({ children }: ThemeSelectionProviderProps) => {
  const [theme, setTheme] = useState<ThemeType>(ThemeType.Light);

  return (
    <ThemeSelectionContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeSelectionContext.Provider>
  );
};

export const useThemeSelection = () => {
  const context = useContext(ThemeSelectionContext);
  if (context === undefined) {
    throw new Error('useThemeSelection must be used within a ThemeSelectionProvider');
  }
  return context;
};
