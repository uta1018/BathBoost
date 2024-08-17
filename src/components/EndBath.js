import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useContext } from "react";
import { db } from "../firebase";
import { Context } from "../providers/Provider";
import { useNavigate } from "react-router-dom";

const EndBath = () => {
  const { roomID, userID } = useContext(Context);

  const navigate = useNavigate();

  // ボタンを押したときに実行される関数
  const postData = async () => {
    if (!roomID || !userID) return;

    // 同じルームの自分の最新の投稿を1件取得
    const postsQuery = query(
      collection(db, "posts"),
      where("roomid", "==", roomID),
      where("author", "==", userID),
      orderBy("date", "desc"),
      limit(1) // 最新の1件のみ取得
    );

    const querySnapshot = await getDocs(postsQuery);
    if (!querySnapshot.empty) {
      // 最新の投稿からgoalTimeを取得
      const lastPost = querySnapshot.docs[0].data();
      // 目標を達成できたか否かでユーザーのポイントを更新
      const userDocRef = doc(db, "user", userID);
      if (lastPost.isGoalAchieved) {
        await updateDoc(userDocRef, {
          point: increment(3),
        });
      } else {
        await updateDoc(userDocRef, {
          point: increment(1),
        });
      }

      // ユーザー情報を取得
      const userDocSnap = await getDoc(userDocRef);
      const currentLevel = userDocSnap.data().level;
      const level = Math.floor(userDocSnap.data().point / 2);
      // レベルが変わったとき
      if (currentLevel !== level) {
        // ユーザーのレベルを更新
        await updateDoc(userDocRef, {
          level,
        });
        // レベルアップ画面へ
        navigate("/levelup", {
          state: {
            currentLevel,
            newLevel: level,
            point: userDocSnap.data().point,
          },
        });
      }
    }
    // ポストを保存
    await addDoc(collection(db, "posts"), {
      roomid: roomID,
      author: userID,
      type: "endBath",
      date: new Date().getTime(),
    });
  };

  return <button onClick={postData}>上がった!</button>;
};

export default EndBath;
