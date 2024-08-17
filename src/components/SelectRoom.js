import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { Context } from "../providers/Provider";
import { useNavigate } from "react-router-dom";
import "./css/Home.css";

const SelectRoom = () => {
  // グローバル変数を取得
  const { setRoomID } = useContext(Context);
  // 入室済みのルーム情報を保存する配列を宣言
  const [roomList, setRoomList] = useState([]);
  // 読み込み中か否かを保存する変数を宣言
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // 読み込み時に実行
  useEffect(() => {
    // 入室済みのルーム情報を読み込む関数
    const getRooms = async () => {
      // ロード中に設定
      setIsLoading(true);
      const userID = auth.currentUser.uid;
      // userドキュメントを取得
      const userDocSnap = await getDoc(doc(db, "user", userID));
      const userData = userDocSnap.data();
      // userドキュメントのrooms配列を保存
      const roomIDList = userData.rooms;

      // それぞれのルームに対してデータを返す関数
      const roomPromises = roomIDList.map(async (roomID) => {
        // roomドキュメントを取得
        const roomDocRef = doc(db, "rooms", roomID);
        const roomDocSnap = await getDoc(roomDocRef);
        // roomドキュメントのデータにルームIDを加えて返す
        return { id: roomID, ...roomDocSnap.data() };
      });

      // roomPromisesを非同期で実行
      const rooms = await Promise.all(roomPromises);
      // ルーム情報を変数に保存
      setRoomList(rooms);
      // ロード中を解除
      setIsLoading(false);
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        getRooms();
      } else {
        setRoomList([]);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleRoute = (roomID) => {
    // console.log(roomID);
    setRoomID(roomID);
    localStorage.setItem("roomID", roomID);
    navigate("/room");
  };

  return (
    roomList.length > 0 && (
      <div className="input-field-container">
        <h3>ルームを選択</h3>
        {isLoading ? <div>Loading...</div> : null}
        {roomList.map((room) => {
          return (
            <div key={room.id}>
              <div>
                <button className="room-select-button" onClick={() => handleRoute(room.id)}>
                  {room.roomName}  に入室
                  {/* {room.id} */}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default SelectRoom;
