import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { Context } from "../providers/Provider";
import { useNavigate } from "react-router-dom";

const SelectRoom = () => {
  const { isAuth, setRoomID } = useContext(Context);
  const [roomList, setRoomList] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const getRooms = async () => {
      const userID = auth.currentUser.uid;
      const userDocSnap = await getDoc(doc(db, "user", userID));
      const userData = userDocSnap.data();
      const roomIDList = userData.rooms;

      const roomPromises = roomIDList.map(async (roomID) => {
        const roomDocRef = doc(db, "rooms", roomID);
        const roomDocSnap = await getDoc(roomDocRef);
        return roomDocSnap.exists() ? roomDocSnap.data() : null;
      });

      const rooms = await Promise.all(roomPromises);
      setRoomList(rooms);
      // console.log(rooms);
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        getRooms();
      } else {
        setRoomList([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleRoute = (roomID) => {
    setRoomID(roomID);
    navigate("/room");
  };

  return (
    <div>
      <h3>ルームを選択</h3>
      {roomList.map((room) => {
        return (
          <div key={room}>
            <div>
              <button  onClick={() => handleRoute(room)}>{room.roomName}</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SelectRoom;
