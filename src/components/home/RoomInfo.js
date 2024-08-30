import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../providers/Provider";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import PopupHeader from "../common/PopupHeader";

const RoomInfo = ({ joinRoomID, closeRoomInfo, removeOverlay }) => {
  const { userID, setRoomID } = useContext(Context);
  // ルーム情報を保存する配列を宣言
  const [roomData, setRoomData] = useState(null);

  const navigate = useNavigate();
  console.log("RoomInfo");

  // 読み込み時に実行
  useEffect(() => {
    // ルーム情報を取得
    const fetchData = async () => {
      const roomDocRef = doc(db, "rooms", joinRoomID);
      const roomDocSnap = await getDoc(roomDocRef);
      const roomData = { id: joinRoomID, ...roomDocSnap.data() };
      setRoomData(roomData);
    };

    fetchData();
  }, []);

  // OKボタンを押したときの関数
  const roomInfo = async () => {
    // userドキュメントを取得
    const userDocRef = doc(db, "user", userID);
    const userDocSnap = await getDoc(userDocRef);
    const userData = userDocSnap.data();
    const userName = userData.userName;
    const icon = userData.icon;

    const roomDocRef = doc(db, "rooms", joinRoomID);
    // roomドキュメントのmember配列にユーザー情報を追加する
    await updateDoc(roomDocRef, {
      member: arrayUnion({ userID: userID, userName: userName, icon: icon }),
    });

    // userドキュメントのrooms配列にルームIDを追加する
    await updateDoc(userDocRef, {
      rooms: arrayUnion(joinRoomID),
    });

    // グローバル変数にルームIDを保存
    setRoomID(joinRoomID);
    localStorage.setItem("roomID", joinRoomID);

    // ルーム画面へ
    navigate("/room");
  };

  return (
    <div className="popup-content-h320 room-info-container">
      <PopupHeader title="ルームを探す" />
      <div className="flex-box">
        <h3>{roomData && <p>このルームに入室しますか？</p>}</h3>
        <div className="room-info-wrapper">
          <h3>{roomData && roomData.roomName}</h3>
          {roomData && (
            <p>
              メンバー:{" "}
              {(() => {
                const membersText = roomData.member
                  .map((member) => member.userName)
                  .join("、");
                return membersText.length > 13
                  ? `${membersText.slice(0, 13)}…(${roomData.member.length})`
                  : `${membersText} (${roomData.member.length})`;
              })()}
            </p>
          )}
        </div>
        <div className="button-wrapper">
          <button
            className="button button-w140 cancel-button"
            onClick={() => {
              closeRoomInfo();
              removeOverlay();
            }}
          >
            キャンセル
          </button>
          <button
            onClick={roomInfo}
            className="button button-w140 ok-button-main"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomInfo;
