import React, { useEffect, useRef, useState } from "react";
import PopupHeader from "../common/PopupHeader";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const ChangeRoomName = ({
  closeChangeRoomName,
  roomData,
  changeRoomToggle,
}) => {
  const [inputRoomName, setInputRoomName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // バリデーションのメッセージを管理する変数
  const [roomNameError, setRoomNameError] = useState({
    message: "※10文字まで入力することができます",
    className: "",
  });

  // roonname のバリデーション関数
  const validateRoomName = (name) => {
    if (name.length < 1) {
      return {
        message: "ルームの名前を入力してください",
        className: "error-mesesage",
      };
    } else if (1 <= name.length && name.length <= 10) {
      return { message: "※10文字まで入力することができます", className: "" };
    } else if (10 < name.length) {
      return {
        message: "ルームの名前は10文字以内で入力してください",
        className: "error-mesesage",
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
    <div className="popup-content-h320 change-room-name-container">
      <PopupHeader title="ルームネームの変更" />
      <div className="flex-box">
        <h3>新しい名前を入力してください</h3>
        <input
          ref={inputRef}
          className="input"
          type="text"
          placeholder={roomData.roomName}
          value={inputRoomName}
          onChange={handleRoomNameChange}
        />
        <p className={roomNameError.className}>{roomNameError.message}</p>
        <div className="button-wrapper">
          <button
            className="button button-w140 cancel-button"
            onClick={closeChangeRoomName}
          >
            キャンセル
          </button>
          <button
            className="button button-w140 ok-button-main"
            onClick={changeRoomName}
            disabled={inputRoomName.length < 1 || 10 < inputRoomName.length}
          >
            決定
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeRoomName;
