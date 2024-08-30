import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db } from "../../firebase";
import { Context } from "../../providers/Provider";
import PopupHeader from "../common/PopupHeader";

const CreateRoom = ({ closeCreateRoom, openRoomID, removeOverlay }) => {
  // グローバル変数を取得
  const { userID, setRoomID } = useContext(Context);
  const [roomName, setRoomName] = useState("");

  console.log("CreateRoom");

  // バリデーションのメッセージを管理する変数
  const [roomNameError, setRoomNameError] = useState({
    message: "※15文字まで入力することができます。",
    color: "black",
  });

  // usename のバリデーション関数
  const validateRoomName = (name) => {
    if (name.length < 1) {
      return { message: "ルームの名前を入力してください。", color: "red" };
    } else if (1 <= name.length && name.length <= 15) {
      return { message: "※15文字まで入力することができます。", color: "black" };
    } else if (15 < name.length) {
      return {
        message: "ルームの名前は15文字以内で入力してください。",
        color: "red",
      };
    }
  };

  // username の入力変更時にバリデーションを実行
  const handleRoomNameChange = (e) => {
    const name = e.target.value;
    setRoomName(name);
    const error = validateRoomName(name);
    setRoomNameError(error);
  };

  // ルーム作成ボタンを押したときの関数
  const createRoom = async () => {
    closeCreateRoom();

    // userドキュメントを取得
    const userDocRef = doc(db, "user", userID);
    const userDocSnap = await getDoc(userDocRef);
    const userData = userDocSnap.data();
    const userName = userData.userName;
    const icon = userData.icon;

    // roomsコレクションにドキュメントを保存
    const roomRef = await addDoc(collection(db, "rooms"), {
      roomName: roomName,
      author: { userID: userID, userName: userName },
      date: new Date().getTime(),
      member: [{ userID: userID, userName: userName, icon: icon }],
    });

    const roomID = roomRef.id;

    // グローバル変数にルームIDを保存
    setRoomID(roomID);
    localStorage.setItem("roomID", roomID);

    // userドキュメントのrooms配列にルームIDを追加
    await updateDoc(userDocRef, {
      rooms: arrayUnion(roomID),
    });

    openRoomID();
  };

  return (
    <div className="popup-content">
      <div className="input-field-container">
        <PopupHeader title="ルームを作成" />
        <p>ルームの名前を入力してください</p>
        <input
          type="text"
          placeholder="ルームネーム"
          value={roomName}
          onChange={handleRoomNameChange}
        />
        <p style={{ color: roomNameError.color }}>{roomNameError.message}</p>
        <p>あとで設定で変更もできます。</p>
        <button onClick={() => {closeCreateRoom(); removeOverlay();}}>キャンセル</button>
        <button
          className="post-button"
          onClick={createRoom}
          disabled={roomName.length < 1 || 15 < roomName.length}
        >
          決定
        </button>
      </div>
    </div>
  );
};

export default CreateRoom;
