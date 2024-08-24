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
  console.log(roomData);

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
    <div className="roominfo-container">
      <div className="content">
        {roomData && roomData.roomName}
        {roomData && (
          <div>
            <p>メンバー:</p>
            {roomData.member.map((member, index) => (
              <span key={member.userID}>
                {member.userName}
                {index < roomData.member.length - 1 && ", "}
              </span>
            ))}
          </div>
        )}
        <button onClick={closeRoomInfo}>キャンセル</button>
        <button onClick={roomInfo}>OK</button>
      </div>
    </div>
  );
};

export default RoomInfo;
