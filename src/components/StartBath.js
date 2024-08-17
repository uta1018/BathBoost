import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useContext } from "react";
import { auth, db } from "../firebase";
import { Context } from "../providers/Provider";

const StartBath = () => {
  // グローバル変数を取得
  const { roomID, setRoomID } = useContext(Context);

  // ボタンを押したときに実行される関数
  const postData = async () => {
    const currentRoomID = roomID || localStorage.getItem("roomID");
    setRoomID(currentRoomID);
    // console.log(currentRoomID)
    const userID = auth.currentUser.uid;
    // console.log(userID)
    if (!currentRoomID || !userID) return;

    // 同じルームの自分の最新の投稿を1件取得
    const postsQuery = query(
      collection(db, "posts"),
      where("roomid", "==", currentRoomID),
      where("author", "==", userID),
      orderBy("date", "desc"),
      limit(1) // 最新の1件のみ取得
    );

    const querySnapshot = await getDocs(postsQuery);
    let isGoalAchieved = false;
    if (!querySnapshot.empty) {
      // 最新の投稿からgoalTimeを取得
      const lastPost = querySnapshot.docs[0].data();
      // console.log(lastPost);
      const goalTime = lastPost.goalTime ? lastPost.goalTime.toDate() : null;
      // console.log("Goal Time:", goalTime);
      // isGoalAchievedに目標が達成されているか保存
      if (goalTime) {
        const now = new Date();
        // console.log("Now Time:", now);
        // console.log("isGoalAchieved", now <= goalTime);
        isGoalAchieved = now <= goalTime;
      }
    }
    // ポストを保存
    await addDoc(collection(db, "posts"), {
      roomid: currentRoomID,
      author: userID,
      type: "startBath",
      date: new Date().getTime(),
      isGoalAchieved,
    });
  };

  return <button onClick={postData}>今からお風呂に入る!</button>;
};

export default StartBath;
