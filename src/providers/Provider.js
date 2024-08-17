import React, { createContext, useState } from "react";

export const Context = createContext({});

export const Provider = (props) => {
  const { children } = props;

  const [userID, setUserID] = useState(localStorage.getItem('userID'));
  const [roomID, setRoomID] = useState(localStorage.getItem('roomID'));

  return (
    // グローバル変数を宣言
    <Context.Provider value={{ userID, setUserID, roomID, setRoomID }}>
      {children}
    </Context.Provider>
  );
};
