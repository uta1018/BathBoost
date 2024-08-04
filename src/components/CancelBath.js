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
  const { roomID, setRoomID } = useContext(Context);

  const navigate = useNavigate();

  const postData = async () => {
    const currentRoomID = roomID || localStorage.getItem("roomID");
    setRoomID(currentRoomID);
    const userID = auth.currentUser.uid;
    if (!currentRoomID || !userID) return;

    const userDocRef = doc(db, "user", userID);
    await updateDoc(userDocRef, {
      point: increment(-1),
    });
    const userDocSnap = await getDoc(userDocRef);
    const currentLevel = userDocSnap.data().level;
    const level = Math.floor(userDocSnap.data().point / 2);
    await updateDoc(userDocRef, {
      level,
    });

    if(currentLevel !== level) {
      navigate("/levelup", {
        state: {
          currentLevel,
          newLevel: level,
          point: userDocSnap.data().point,
        },
      });
    }

    await addDoc(collection(db, "posts"), {
      roomid: currentRoomID,
      author: userID,
      type: "cancelBath",
      date: new Date().getTime(),
    });
  };

  return (
    <div>
      <button onClick={postData}>やっぱりお風呂キャンセル…</button>
    </div>
  );
};

export default CancelBath;
