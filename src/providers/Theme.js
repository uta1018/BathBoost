import React, { createContext, useContext, useEffect, useState } from "react";

// setThemeColorの定義
const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem('themeColor'));

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
        document.documentElement.style.setProperty("--main-200", "#FCF4FF");
        document.documentElement.style.setProperty("--main-400", "#F3DFFB");
        document.documentElement.style.setProperty("--main-500", "#D8B1E4");
        document.documentElement.style.setProperty("--main-700", "#A782DE");
        document.documentElement.style.setProperty("--sub-100", "#FFFAE4");
        document.documentElement.style.setProperty("--sub-200", "#FEF6D4");
        document.documentElement.style.setProperty("--sub-300", "#FFEDA3");
        document.documentElement.style.setProperty("--sub-500", "#F6DE7A");
        document.documentElement.style.setProperty("--sub-700", "#ECCC49");
        document.documentElement.style.setProperty("--sub-800", "#E5B905");
        break;
      }
      case "theme3": {
        document.documentElement.style.setProperty("--main-200", "#FFF5E8");
        document.documentElement.style.setProperty("--main-400", "#FFDDB0");
        document.documentElement.style.setProperty("--main-500", "#F5BC71");
        document.documentElement.style.setProperty("--main-700", "#F39417");
        document.documentElement.style.setProperty("--sub-100", "#F0F8FF");
        document.documentElement.style.setProperty("--sub-200", "#DAEFFF");
        document.documentElement.style.setProperty("--sub-300", "#BFE3FF");
        document.documentElement.style.setProperty("--sub-500", "#A6D7FF");
        document.documentElement.style.setProperty("--sub-700", "#82BDEC");
        document.documentElement.style.setProperty("--sub-800", "#1597FF");
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
