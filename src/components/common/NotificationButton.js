// NotificationButton.js
import React, { useState } from "react";
import { requestNotificationPermission } from "../../firebase";

const NotificationButton = () => {
  const [token, setToken] = useState(null);

  const handleClick = async () => {
    const token = await requestNotificationPermission();
    if (token) {
      setToken(token);
    } else {
      console.log("Permission denied or no token available");
    }
  };

  return (
    <div>
      <button onClick={handleClick}>
        通知を許可
      </button>
      {token && <p>あなたのトークンは: {token}</p>}
    </div>
  );
};

export default NotificationButton;
