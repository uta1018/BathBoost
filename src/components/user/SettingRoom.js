import React, { memo, useContext, useEffect, useState } from "react";

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
import ChangeRoomName from "./ChangeRoomName";
import RoomDetail from "../common/RoomDetail";

const SettingRoom = memo(({ rooms, changeLevelToggle }) => {
  // const { userID } = useContext(Context);
  const [roomList, setRoomList] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  // const [showDeleteRoom, setShowDeleteRoom] = useState(false);
  const [showExitRoom, setShowExitRoom] = useState(false);
  const [roomData, setRoomData] = useState();
  const [showChangeRoomName, setShowChangeRoomName] = useState(false);
  const [changeRoom, setChangeRoom] = useState(false);
  const [showRoomDetail, setShowRoomDetail] = useState(false);

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

  const openChangeRoomName = (room) => {
    setRoomData(room);
    setShowOverlay(true);
    setShowChangeRoomName(true);
  };

  const closeChangeRoomName = () => {
    setShowOverlay(false);
    setShowChangeRoomName(false);
  };

  const changeRoomToggle = () => {
    console.log("SettingRoomトグル");
    setChangeRoom((prevChangeRoom) => !prevChangeRoom);
  };

  const openRoomDetail = (room) => {
    setRoomData(room);
    setShowOverlay(true);
    setShowRoomDetail(true);
  };

  const closeRoomDetail = () => {
    setShowOverlay(false);
    setShowRoomDetail(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      // ルーム情報を取得
      if (rooms && rooms.length > 0) {
        console.log("ルームデータ取得");
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
      } else {
        setRoomList([]);
      }
    };

    fetchData();
  }, [rooms, changeRoom]);

  return (
    <div>
      {roomList.map((room) => {
        return (
          <div key={room.id}>
            <FontAwesomeIcon icon={faPaw} />
            <div onClick={() => openRoomDetail(room)}>{room.roomName}</div>
            <div onClick={() => openChangeRoomName(room)}>
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
      {showRoomDetail && (
        <RoomDetail closeRoomDetail={closeRoomDetail} {...roomData} />
      )}
      {showChangeRoomName && (
        <ChangeRoomName
          closeChangeRoomName={closeChangeRoomName}
          roomData={roomData}
          changeRoomToggle={changeRoomToggle}
        />
      )}
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
