import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../providers/Provider";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const RoomInfo = ({ joinRoomID, closeRoomInfo }) => {
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
    const roomDocRef = doc(db, "rooms", joinRoomID);
    // roomドキュメントのmember配列にユーザーIDを追加する
    await updateDoc(roomDocRef, {
      member: arrayUnion(userID),
    });

    // userドキュメントのrooms配列にルームIDを追加する
    const userDocRef = doc(db, "user", userID);
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
    <div className="roominfo-container">
      <div className="content">
        {roomData && roomData.roomName}
        {/* {roomData.member} */}
        <button onClick={closeRoomInfo}>キャンセル</button>
        <button onClick={roomInfo}>OK</button>
      </div>
      <div className="footer">
        <p>@ライラック</p>
      </div>
    </div>
  );
};

export default RoomInfo;
