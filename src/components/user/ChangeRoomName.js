import React, { useState } from "react";
import PopupHeader from "../common/PopupHeader";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const ChangeRoomName = ({
  closeChangeRoomName,
  roomData,
  changeRoomToggle,
}) => {
  const [inputRoomName, setInputRoomName] = useState("");
  // バリデーションのメッセージを管理する変数
  const [roomNameError, setRoomNameError] = useState({
    message: "※15文字まで入力することができます",
    color: "black",
  });

  // roonname のバリデーション関数
  const validateRoomName = (name) => {
    if (name.length < 1) {
      return { message: "ルームの名前を入力してください", color: "red" };
    } else if (1 <= name.length && name.length <= 15) {
      return { message: "※15文字まで入力することができます", color: "black" };
    } else if (15 < name.length) {
      return {
        message: "ルームの名前は15文字以内で入力してください",
        color: "red",
      };
    }
  };

  // roomname の入力変更時にバリデーションを実行
  const handleRoomNameChange = (e) => {
    const name = e.target.value;
    setInputRoomName(name);
    const error = validateRoomName(name);
    setRoomNameError(error);
  };

  // 変更ボタンを押したときの関数
  const changeRoomName = async () => {
    closeChangeRoomName();
    const roomID = roomData.id;
    // roomドキュメントを更新
    const roomDocRef = doc(db, "rooms", roomID);
    await updateDoc(roomDocRef, {
      roomName: inputRoomName,
    });

    changeRoomToggle();
  };

  return (
    <div className="popup-content">
      <PopupHeader title="ルームネームの変更" />
      <p>新しい名前を入力してください</p>
      <input
        type="text"
        placeholder={roomData.roomName}
        value={inputRoomName}
        onChange={handleRoomNameChange}
      />
      <p style={{ color: roomNameError.color }}>{roomNameError.message}</p>
      <button onClick={closeChangeRoomName}>キャンセル</button>
      <button
        onClick={changeRoomName}
        disabled={inputRoomName.length < 1 || 15 < inputRoomName.length}
      >
        決定
      </button>
    </div>
  );
};

export default ChangeRoomName;
