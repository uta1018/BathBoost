import React, { useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import PopupHeader from "../common/PopupHeader";

const JoinRoom = ({
  closeJoinRoom,
  openRoomInfo,
  settingRoomID,
  removeOverlay,
}) => {
  // 入力されたルームIDを保存する変数を定義
  const [inputRoomID, setInputRoomID] = useState("");
  // 見つかりませんでした表示を管理
  const [showAlertRoomID, setShowAlertRoomID] = useState(false);

  console.log("JoinRoom");

  // ルーム入室ボタンを押したときの関数
  const joinRoom = async () => {
    const roomID = inputRoomID;

    // 何も入力されてないとき（クエリでエラーが出るため分けた）
    if (!roomID) {
      setShowAlertRoomID(true);
      setInputRoomID("");
      return;
    }

    // roomsコレクションからroomドキュメントを取得
    const roomDocRef = doc(db, "rooms", roomID);
    const roomDocSnap = await getDoc(roomDocRef);
    // 存在しない場合、アラートを表示
    if (!roomDocSnap.exists()) {
      setShowAlertRoomID(true);
      setInputRoomID("");
      return;
    }

    setShowAlertRoomID(false);
    closeJoinRoom();
    openRoomInfo();
    settingRoomID(roomID);
  };

  return (
    <div className="popup-content">
      <div className="input-field-container">
        <PopupHeader title="ルームを探す" />
        <p>ルームのIDを入力してください</p>
        <input
          type="text"
          placeholder="ルームID"
          value={inputRoomID}
          onChange={(e) => setInputRoomID(e.target.value)}
        />
        {showAlertRoomID && (
          <p style={{ color: "red" }}>※ルームが見つかりませんでした</p>
        )}
        <p>
          <button
            onClick={() => {
              closeJoinRoom();
              removeOverlay();
            }}
          >
            キャンセル
          </button>
          <button
            className="post-button"
            onClick={joinRoom}
            disabled={inputRoomID.length < 1}
          >
            OK
          </button>
        </p>
      </div>
    </div>
  );
};

export default JoinRoom;
