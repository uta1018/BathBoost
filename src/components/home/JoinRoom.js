import React, { useContext, useState } from "react";
import { Context } from "../../providers/Provider";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
// import "./css/Home.css";

const JoinRoom = () => {
  // グローバル変数を取得
  const { userID, setRoomID } = useContext(Context);
  // 入力されたルームIDを保存する変数を定義
  const [inputRoomID, setInputRoomID] = useState("");

  const navigate = useNavigate();
  console.log("JoinRoom");

  // ルーム入室ボタンを押したときの関数
  const joinRoom = async () => {
    const roomID = inputRoomID;

    // roomsコレクションからroomドキュメントを取得
    const roomDocRef = doc(db, "rooms", roomID);
    const roomDocSnap = await getDoc(roomDocRef);
    // 存在しない場合、アラート
    if (!roomDocSnap.exists()) {
      alert("存在しないルームIDです");
      setInputRoomID("");
      return;
    }

    // roomドキュメントのmember配列にユーザーIDを追加する
    await updateDoc(roomDocRef, {
      member: arrayUnion(userID),
    });

    // userドキュメントのrooms配列にルームIDを追加する
    const userDocRef = doc(db, "user", userID);
    await updateDoc(userDocRef, {
      rooms: arrayUnion(roomID),
    });

    // グローバル変数にルームIDを保存
    setRoomID(roomID);
    localStorage.setItem("roomID", roomID);

    // ルーム画面にリダイレクト
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
