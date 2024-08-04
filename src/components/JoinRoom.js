import React, { useContext, useState } from "react";
import { Context } from "../providers/Provider";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import "./css/Home.css";

const JoinRoom = () => {
  const { setRoomID } = useContext(Context);
  const [inputRoomID, setInputRoomID] = useState("");

  const navigate = useNavigate();

  const joinRoom = async () => {
    const userID = auth.currentUser.uid;
    const roomID = inputRoomID;
    // const roomRef = await addDoc(collection(db, "rooms"), {
    //   roomName: roomName,
    //   author: userID,
    //   member: [userID],
    // });
    
    const roomDocRef = doc(db, "rooms", roomID);
    const roomrDocSnap = await getDoc(roomDocRef);
    if(!roomrDocSnap.exists()) {
      alert("存在しないルームIDです")
      setInputRoomID("");
      return;
    }

    await updateDoc(roomDocRef, {
      member: arrayUnion(userID),
    });

    const userDocRef = doc(db, "user", userID);
    await updateDoc(userDocRef, {
      rooms: arrayUnion(roomID),
    });

    setRoomID(roomID);

    navigate("/room");
  };

  return (
    <div className="input-field-container">
      <h3>ルームに入室</h3>
      <p>ルームIDを入力</p>
      <input
        type="text"
        placeholder="ルームIDを入力してね"
        value={inputRoomID}
        onChange={(e) => setInputRoomID(e.target.value)}
      />
      <button className="post-button" onClick={joinRoom}>
        参加！
      </button>
    </div>
  );
};

export default JoinRoom;
