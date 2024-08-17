import React, { useContext } from "react";
import { Context } from "../providers/Provider";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const CancelBath = () => {
  const { roomID, userID } = useContext(Context);

  const navigate = useNavigate();

  const postData = async () => {
    if (!roomID || !userID) return;

    // ユーザーのポイントを更新
    const userDocRef = doc(db, "user", userID);
    await updateDoc(userDocRef, {
      point: increment(-1),
    });
    const userDocSnap = await getDoc(userDocRef);
    const currentLevel = userDocSnap.data().level;
    const level = Math.floor(userDocSnap.data().point / 2);
    // レベルダウンした際、レベルアップ画面へ
    if (currentLevel !== level) {
      // レベルを更新
      await updateDoc(userDocRef, {
        level,
      });
      navigate("/levelup", {
        state: {
          currentLevel,
          newLevel: level,
          point: userDocSnap.data().point,
        },
      });
    }

    // ポストを保存
    await addDoc(collection(db, "posts"), {
      roomid: roomID,
      author: userID,
      type: "cancelBath",
      date: new Date().getTime(),
    });
  };

  return <button onClick={postData}>お風呂キャンセル…</button>;
};

export default CancelBath;
