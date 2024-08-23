import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db } from "../../firebase";
import { Context } from "../../providers/Provider";
// import "./css/Home.css";

const CreateRoom = ({closeCreateRoom, openRoomID}) => {
  // グローバル変数を取得
  const { userID, setRoomID } = useContext(Context);
  const [roomName, setRoomName] = useState("");

  console.log("CreateRoom");

  // ルーム作成ボタンを押したときの関数
  const createRoom = async () => {
    // 保存するものを増やす
    // roomsコレクションにドキュメントを保存
    const roomRef = await addDoc(collection(db, "rooms"), {
      roomName: roomName,
      author: userID,
      member: [userID],
    });

    const roomID = roomRef.id;
    // グローバル変数にルームIDを保存
    setRoomID(roomID);
    localStorage.setItem("roomID", roomID);

    // userドキュメントのrooms配列にルームIDを追加
    const userDocRef = doc(db, "user", userID);
    await updateDoc(userDocRef, {
      rooms: arrayUnion(roomID),
    });
    closeCreateRoom();
    openRoomID();
  };

  return (
    <div className="input-field-container">
      <h3>ルームを作成</h3>
      <p>ルーム名(必須)</p>
      <input
        type="text"
        placeholder="ルームの名前を入力してね"
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button onClick={closeCreateRoom}>キャンセル</button>
      <button className="post-button" onClick={createRoom}>
        決定
      </button>
    </div>
  );
};

export default CreateRoom;
