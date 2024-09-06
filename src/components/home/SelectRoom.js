import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { memo, useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import { Context } from "../../providers/Provider";
import { useNavigate } from "react-router-dom";

//アイコンのインポート
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

const SelectRoom = memo(() => {
  // グローバル変数を取得
  const { userID, setRoomID } = useContext(Context);
  // 入室済みのルーム情報を保存する配列を宣言
  const [roomList, setRoomList] = useState([]);
  // ロード状態を管理する変数を宣言
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  console.log("selectRoom");

  // 読み込み時に実行
  useEffect(() => {
    if (!userID) return;
    // 入室済みのルーム情報を読み込む関数
    const getRooms = async () => {
      try {
        // ローディング中に設定
        setIsLoading(true);
        // userドキュメントを取得
        const userDocSnap = await getDoc(doc(db, "user", userID));
        const userData = userDocSnap.data();
        // userドキュメントのrooms配列を保存
        const roomIDList = userData.rooms;

        // roomIDListに存在するルームについて情報を取得
        if (roomIDList && roomIDList.length > 0) {
          const roomsQuery = query(
            collection(db, "rooms"),
            where(documentId(), "in", roomIDList)
          );
          const roomsSnapshot = await getDocs(roomsQuery);
          const rooms = roomsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          // ルーム情報を変数に保存
          setRoomList(rooms);
        }

        // // それぞれのルームに対してデータを返す関数
        // const roomPromises = roomIDList.map(async (roomID) => {
        //   // roomドキュメントを取得
        //   const roomDocRef = doc(db, "rooms", roomID);
        //   const roomDocSnap = await getDoc(roomDocRef);
        //   // roomドキュメントのデータにルームIDを加えて返す
        //   return { id: roomID, ...roomDocSnap.data() };
        // });

        // // roomPromisesを非同期で実行
        // const rooms = await Promise.all(roomPromises);
      } finally {
        // ロード状態を解除
        setIsLoading(false);
      }
    };

    getRooms();
  }, []);

  // ボタンを押したときに実行する関数
  const handleRoute = (roomID) => {
    // console.log(roomID);
    setRoomID(roomID);
    localStorage.setItem("roomID", roomID);
    navigate("/room");
  };

  if (isLoading) return <div>ロード中</div>;

  return (
    roomList.length > 0 && (
      <div className="select-room-container">
        {roomList.map((room) => {
          const activeMemberCount = room.member.filter(
            (user) => !user.exit
          ).length;
          return (
            <button
              onClick={() => handleRoute(room.id)}
              key={room.id}
              className="home-button"
            >
              <FontAwesomeIcon icon={faPaw} />
              <div>
                <h3>{room.roomName}</h3>
                <p>
                  メンバー:{" "}
                  {(() => {
                    const membersText = room.member
                      .filter((user) => !user.exit)
                      .map((member) => member.userName)
                      .join("、");
                    return membersText.length > 13
                      ? `${membersText.slice(0, 13)}…(${activeMemberCount})`
                      : `${membersText} (${activeMemberCount})`;
                  })()}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    )
  );
});

export default SelectRoom;
