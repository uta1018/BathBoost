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
  const { roomID, setRoomID } = useContext(Context);

  const postData = async () => {
    const currentRoomID = roomID || localStorage.getItem("roomID");
    setRoomID(currentRoomID);
    // console.log(currentRoomID)
    const userID = auth.currentUser.uid;
    // console.log(userID)
    if (!currentRoomID || !userID) return;

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

      if (goalTime) {
        const now = new Date();
        // console.log("Now Time:", now);
        // console.log("isGoalAchieved", now <= goalTime);
        isGoalAchieved = now <= goalTime;
      }
    }

    await addDoc(collection(db, "posts"), {
      roomid: currentRoomID,
      author: userID,
      type: "startBath",
      date: new Date().getTime(),
      isGoalAchieved,
    });
  };

  return (
    <div>
      <button onClick={postData}>今からお風呂に入る!</button>
    </div>
  );
};

export default StartBath;
