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
import { auth, db } from "../firebase";
import { Context } from "../providers/Provider";
import LevelUp from "./LevelUp";
import { useNavigate } from "react-router-dom";

const EndBath = () => {
  const { roomID, setRoomID } = useContext(Context);

  const navigate = useNavigate();

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
    if (!querySnapshot.empty) {
      // 最新の投稿からgoalTimeを取得
      const lastPost = querySnapshot.docs[0].data();
      // console.log(lastPost);
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
      
      const userDocSnap = await getDoc(userDocRef);
      const currentLevel = userDocSnap.data().level;
      const level = Math.floor(userDocSnap.data().point / 2);
      await updateDoc(userDocRef, {
        level,
      });
      // console.log(currentLevel);
      // console.log(level);
      if(currentLevel !== level) {
        navigate("/levelup", {
          state: {
            currentLevel,
            newLevel: level,
            point: userDocSnap.data().point,
          },
        });
      }
    }

    await addDoc(collection(db, "posts"), {
      roomid: currentRoomID,
      author: userID,
      type: "endBath",
      date: new Date().getTime(),
    });
  };

  return (
    <div>
      <button onClick={postData}>上がった!</button>
    </div>
  );
};

export default EndBath;
