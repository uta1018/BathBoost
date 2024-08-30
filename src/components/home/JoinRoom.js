import React, { useEffect, useRef, useState } from "react";
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
  const inputRef = useRef(null);

  console.log("JoinRoom");

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
    <div className="popup-content-h320 join-room-container">
      <PopupHeader title="ルームを探す" />
      <div className="flex-box">
        <h3>ルームのIDを入力してください</h3>
        <input
          ref={inputRef}
          className="input"
          type="text"
          placeholder="ルームID"
          value={inputRoomID}
          onChange={(e) => setInputRoomID(e.target.value)}
        />
        {showAlertRoomID && (
          <p className="room-undefind-messeage">
            ※ルームが見つかりませんでした
          </p>
        )}
        <div className="button-wrapper">
          <button
            className="button button-w140 cancel-button"
            onClick={() => {
              closeJoinRoom();
              removeOverlay();
            }}
          >
            キャンセル
          </button>
          <button
            className="button button-w140 ok-button-main"
            onClick={joinRoom}
            disabled={inputRoomID.length < 1}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
