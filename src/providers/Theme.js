import React, { createContext, useContext, useEffect, useState } from "react";

// setThemeColorの定義
const useTheme = () => {
  const [theme, setTheme] = useState("theme1");

  useEffect(() => {
    switch (theme) {
      case "theme1": {
        document.documentElement.style.setProperty("--main-200", "#F5FFFC");
        document.documentElement.style.setProperty("--main-400", "#D4F1E8");
        document.documentElement.style.setProperty("--main-500", "#97D0BE");
        document.documentElement.style.setProperty("--main-700", "#54937F");
        document.documentElement.style.setProperty("--sub-100", "#FFF7F2");
        document.documentElement.style.setProperty("--sub-200", "#FEE2D3");
        document.documentElement.style.setProperty("--sub-300", "#FFD4BC");
        document.documentElement.style.setProperty("--sub-500", "#FACBB1");
        document.documentElement.style.setProperty("--sub-700", "#E3A481");
        document.documentElement.style.setProperty("--sub-800", "#F39C6C");
        break;
      }
      case "theme2": {
        document.documentElement.style.setProperty("--main-200", "#d1bada");
        break;
      }
    }
  }, [theme]);

  const setThemeColor = (theme) => setTheme(theme);

  return setThemeColor;
};

export const themeContext = createContext({});

export const ThemeProvider = (props) => {
  const setThemeColor = useTheme();

  return (
    <themeContext.Provider value={setThemeColor}>
      {props.children}
    </themeContext.Provider>
  );
};
