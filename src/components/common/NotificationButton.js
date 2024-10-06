import React, { useContext, useEffect, useState } from "react";
import { db, requestNotificationPermission } from "../../firebase";
import { Context } from "../../providers/Provider";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const NotificationButton = () => {
  const { userID } = useContext(Context);
  const [token, setToken] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // コンポーネントがマウントされたときにトークンを取得
  useEffect(() => {
    const fetchToken = async () => {
      const userDocRef = doc(db, "user", userID);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const data = userDoc.data();
        setToken(data.token || null); // トークンを状態にセット
        setIsSubscribed(!!data.token);
      } else {
        console.log("ユーザードキュメントが見つかりません");
      }
    };

    fetchToken();
  }, [userID]);

  const handleSubscribe = async () => {
    const newToken = await requestNotificationPermission();
    if (newToken) {
      const userDocRef = doc(db, "user", userID);
      await updateDoc(userDocRef, {
        token: newToken,
      });
      setToken(newToken);
      setIsSubscribed(true);
    }
  };

  const handleUnsubscribe = async () => {
    const userDocRef = doc(db, "user", userID);
    await updateDoc(userDocRef, {
      token: null, // トークンを削除
    });
    setToken(null); // トークンをクリア
    setIsSubscribed(false); // サブスクリプションをオフに
  };

  const handleToggleChange = () => {
    if (isSubscribed) {
      handleUnsubscribe();
    } else {
      handleSubscribe();
    }
  };

  return (
    <div className="notification-button-container">
      <p>通知</p>
      <label className="toggle-button">
        <input
          type="checkbox"
          checked={isSubscribed}
          onChange={handleToggleChange}
        />
        <p>{isSubscribed ? "ON" : "OFF"}</p>
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default NotificationButton;
