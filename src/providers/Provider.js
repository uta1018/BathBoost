import React, { createContext, useState } from "react";

export const Context = createContext({});

export const Provider = (props) => {
  const { children } = props;

  const [isAuth, setIsAuth] = useState(false);
  const [roomID, setRoomID] = useState("");
  return (
    <Context.Provider value={{ isAuth, setIsAuth, roomID, setRoomID }}>
      {children}
    </Context.Provider>
  );
};
