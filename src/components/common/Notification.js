import React, { useState, useEffect } from "react";
import { onMessageListener } from "../../firebase";


const Notification = () => {
  const [notification, setNotification] = useState({ title: "", body: "" });
  useEffect(() => {
    if (notification?.title) {
      alert(notification?.title + "\n" + notification?.body);
    }
  }, [notification]);


  onMessageListener()
    .then((payload) => {
      setNotification({ title: payload?.notification?.title, body: payload?.notification?.body });
    })
    .catch((err) => console.log("failed: ", err));

  return <div />;
};

export default Notification;
