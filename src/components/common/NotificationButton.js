import React, { useContext, useEffect, useState } from "react";
import { db, requestNotificationPermission } from "../../firebase";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { Context } from "../../providers/Provider";

const NotificationButton = () => {
  const { userID } = useContext(Context);
  const [deviceToken, setDeviceToken] = useState(null); // デバイスごとのトークンを管理
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [deniedMessage, setDeniedMessage] = useState(false);

  // デバイスがFirestoreに登録されているか確認
  const checkDeviceSubscription = async (deviceToken) => {
    const userDocRef = doc(db, "user", userID);
    const userDoc = await getDoc(userDocRef);
    const userData = userDoc.data();
    const devices = userData.devices || [];
    return devices.includes(deviceToken);
  };

  // Firestoreにデバイス情報を登録
  const subscribeDevice = async (deviceToken) => {
    const userDocRef = doc(db, "user", userID);
    await updateDoc(userDocRef, {
      devices: arrayUnion(deviceToken),
    });
    setIsSubscribed(true);
  };

  // Firestoreからデバイス情報を削除
  const unsubscribeDevice = async (deviceToken) => {
    const userDocRef = doc(db, "user", userID);
    await updateDoc(userDocRef, {
      devices: arrayRemove(deviceToken),
    });
    setIsSubscribed(false);
  };

  // 初回レンダリング時に通知の許可状態をチェックし、登録状況を確認
  useEffect(() => {
    const init = async () => {
      // 通知の許可状態をチェック
      if (Notification.permission === "granted") {
        const token = await requestNotificationPermission(); // トークンを取得
        if (token) {
          setDeviceToken(token);
          const isRegistered = await checkDeviceSubscription(token);
          setIsSubscribed(isRegistered); // Firestoreに登録されているかどうかを確認
        }
      } else if (Notification.permission === "default") {
        console.log("通知の許可が未決定です");
      } else if (Notification.permission === "denied") {
        console.log("通知の許可が拒否されています");
        setDeniedMessage(true);
      }
    };

    init();
  }, [userID]);

  // トグルボタンの処理
  const handleToggleChange = async () => {
    if (isSubscribed) {
      await unsubscribeDevice(deviceToken); // Firestoreから削除
    } else {
      const token = await requestNotificationPermission(); // トークンを取得
      if (token) {
        await subscribeDevice(token); // Firestoreに登録
      }
    }
  };

  return (
    <div className="notification-button-container">
      <div className="flex-box">
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
      {deniedMessage ? (
        <p>※通知が拒否されています。端末の設定で通知を許可してください。</p>
      ) : (
        <p>※通知機能をONにする場合は、ホーム画面に追加してください。</p>
      )}
    </div>
  );
};

export default NotificationButton;
