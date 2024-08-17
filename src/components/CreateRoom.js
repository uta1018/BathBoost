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
import "./css/Home.css";

const CreateRoom = () => {
  // グローバル変数を取得
  const { setRoomID } = useContext(Context);
  const [roomName, setRoomName] = useState("");

  const navigate = useNavigate();

  // ルーム作成ボタンを押したときの関数
  const createRoom = async () => {
    // ユーザーIDを保存
    const userID = auth.currentUser.uid;
    // roomsコレクションにドキュメントを保存
    const roomRef = await addDoc(collection(db, "rooms"), {
      roomName: roomName,
      author: userID,
      member: [userID],
    });

    // グローバル変数にルームIDを保存
    setRoomID(roomRef.id);
    const roomID = roomRef.id;
    // userドキュメントのrooms配列にルームIDを追加
    const userDocRef = doc(db, "user", userID);
    await updateDoc(userDocRef, {
      rooms: arrayUnion(roomID),
    });

    // ルーム入室画面にリダイレクト
    navigate("/roominfo");
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
      <button className="post-button" onClick={createRoom}>
        作成！
      </button>
    </div>
  );
};

export default CreateRoom;
