import React, { createContext, useContext, useEffect, useState } from "react";

// setThemeColorの定義
const useTheme = () => {
  const [theme, setTheme] = useState("theme1");

  useEffect(() => {
    switch (theme) {
      case "theme1": {
        document.documentElement.style.setProperty("--main-300", "#FFD4BC");
        break;
      }
      case "theme2": {
        document.documentElement.style.setProperty("--main-300", "#d1bada");
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
