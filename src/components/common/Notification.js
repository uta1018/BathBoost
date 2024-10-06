import React, { useState, useEffect, useContext } from "react";
import { db, onMessageListener } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Context } from "../../providers/Provider";


const Notification = () => {
  const {userID} = useContext(Context);
  const [notification, setNotification] = useState({ title: "", body: "" });


  useEffect(() => {
    const fetchToken = async () => {
      const userDocRef = doc(db, "user", userID);
      const userDoc = await getDoc(userDocRef);
      if (notification?.title && userDoc.exists()) {
        const data = userDoc.data();
        if(data.token) {
          alert(notification?.title + "\n" + notification?.body);
        }
      } else {
        console.log("ユーザードキュメントが見つかりません");
      }
    };

    fetchToken();
  }, [notification]);


  onMessageListener()
    .then((payload) => {
      setNotification({ title: payload?.notification?.title, body: payload?.notification?.body });
    })
    .catch((err) => console.log("failed: ", err));

  return <div />;
};

export default Notification;
