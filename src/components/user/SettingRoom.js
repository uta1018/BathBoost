import React, { memo, useContext, useEffect, useState } from "react";
// import { Context } from "../../providers/Provider";
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faPen } from "@fortawesome/free-solid-svg-icons";
// import DeleteRoom from "./DeleteRoom";
import ExitRoom from "./ExitRoom";
import Overlay from "../common/Overlay";

const SettingRoom = memo(({ rooms, changeLevelToggle }) => {
  // const { userID } = useContext(Context);
  const [roomList, setRoomList] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  // const [showDeleteRoom, setShowDeleteRoom] = useState(false);
  const [showExitRoom, setShowExitRoom] = useState(false);
  const [roomData, setRoomData] = useState();

  console.log("SettingRoom");

  // const openDeleteRoom = (room) => {
  //   setRoomData(room);
  //   setShowOverlay(true);
  //   setShowDeleteRoom(true);
  // };

  // const closeDeleteRoom = () => {
  //   setShowOverlay(false);
  //   setShowDeleteRoom(false);
  // };

  const openExitRoom = (room) => {
    setRoomData(room);
    setShowOverlay(true);
    setShowExitRoom(true);
  };

  const closeExitRoom = () => {
    setShowOverlay(false);
    setShowExitRoom(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      // ルーム情報を取得
      if (rooms && rooms.length > 0) {
        console.log("ユーザーデータ取得");
        const roomsQuery = query(
          collection(db, "rooms"),
          where(documentId(), "in", rooms)
        );
        const roomsSnapshot = await getDocs(roomsQuery);
        const roomData = roomsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // ルーム情報を変数に保存
        setRoomList(roomData);
      }
    };

    fetchData();
  }, [rooms]);

  return (
    <div>
      {roomList.map((room) => {
        return (
          <div key={room.id}>
            <FontAwesomeIcon icon={faPaw} />
            <div>{room.roomName}</div>
            <div>
              <FontAwesomeIcon icon={faPen} />
            </div>
            <button onClick={() => openExitRoom(room)}>退出</button>
            {/* {room.author.userID === userID ? (
              <button onClick={() => openDeleteRoom(room)}>削除</button>
            ) : (
              <button onClick={() => openExitRoom(room)}>退出</button>
            )} */}
          </div>
        );
      })}
      {showOverlay && <Overlay />}
      {/* {showDeleteRoom && (
        <DeleteRoom
          closeDeleteRoom={closeDeleteRoom}
          roomData={roomData}
          changeLevelToggle={changeLevelToggle}
        />
      )} */}
      {showExitRoom && (
        <ExitRoom
          closeExitRoom={closeExitRoom}
          roomData={roomData}
          changeLevelToggle={changeLevelToggle}
        />
      )}
    </div>
  );
});

export default SettingRoom;
