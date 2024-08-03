import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { Context } from "../providers/Provider";

const CreateRoom = () => {
  const { setRoomID } = useContext(Context);
  const [roomName, setRoomName] = useState("");

  const navigate = useNavigate();

  const createRoom = async () => {
    const userID = auth.currentUser.uid;
    const roomRef = await addDoc(collection(db, "rooms"), {
      roomName: roomName,
      author: userID,
      member: [userID],
    });

    setRoomID(roomRef.id);
    const roomID = roomRef.id;
    const userDocRef = doc(db, "user", userID);
    await updateDoc(userDocRef, {
      rooms: arrayUnion(roomID),
    });

    navigate("/roominfo");
  };

  return (
    <div>
      <h3>ルームを作成</h3>
      <p>ルーム名(必須)</p>
      <input
        type="text"
        placeholder="ルームの名前を入力してね"
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button className="postButton" onClick={createRoom}>
        作成！
      </button>
    </div>
  );
};

export default CreateRoom;
