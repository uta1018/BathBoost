import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { Context } from "../providers/Provider";
import { useNavigate } from "react-router-dom";
import "./css/Home.css";

const SelectRoom = () => {
  const { isAuth, setRoomID } = useContext(Context);
  const [roomList, setRoomList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getRooms = async () => {
      setIsLoading(true);
      const userID = auth.currentUser.uid;
      const userDocSnap = await getDoc(doc(db, "user", userID));
      const userData = userDocSnap.data();
      const roomIDList = userData.rooms;

      const roomPromises = roomIDList.map(async (roomID) => {
        const roomDocRef = doc(db, "rooms", roomID);
        const roomDocSnap = await getDoc(roomDocRef);
        return { id: roomID, ...roomDocSnap.data() };
      });

      const rooms = await Promise.all(roomPromises);
      setRoomList(rooms);
      setIsLoading(false);
      // console.log(rooms);
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
