import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { db } from "../../firebase";
import { Context } from "../../providers/Provider";
import PopupHeader from "../common/PopupHeader";

const CreateRoom = ({ closeCreateRoom, openRoomID, removeOverlay }) => {
  // グローバル変数を取得
  const { userID, setRoomID } = useContext(Context);
  const [roomName, setRoomName] = useState("");
  const inputRef = useRef(null);

  console.log("CreateRoom");

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // バリデーションのメッセージを管理する変数
  const [roomNameError, setRoomNameError] = useState({
    message: "※15文字まで入力することができます。",
    color: "black",
  });

  // usename のバリデーション関数
  const validateRoomName = (name) => {
    if (name.length < 1) {
      return {
        message: "ルームの名前を入力してください。",
        className: "error-mesesage",
      };
    } else if (1 <= name.length && name.length <= 15) {
      return { message: "※15文字まで入力することができます。", className: "" };
    } else if (15 < name.length) {
      return {
        message: "ルームの名前は15文字以内で入力してください。",
        className: "error-mesesage",
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
    <div className="popup-content create-room-container">
      <PopupHeader title="ルームを作成" />
      <div className="flex-box">
        <h3>ルームの名前を入力してください</h3>
        <input
          ref={inputRef}
          className="input"
          type="text"
          placeholder="ルームネーム"
          value={roomName}
          onChange={handleRoomNameChange}
        />
        <dev className="text-wrapper">
          <p className={roomNameError.className}>{roomNameError.message}</p>
          <p>あとで設定で変更もできます。</p>
        </dev>
        <div className="button-wrapper">
          <button
            className="button button-w140 cancel-button"
            onClick={() => {
              closeCreateRoom();
              removeOverlay();
            }}
          >
            キャンセル
          </button>
          <button
            className="button button-w140 ok-button-main "
            onClick={createRoom}
            disabled={roomName.length < 1 || 15 < roomName.length}
          >
            決定
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
