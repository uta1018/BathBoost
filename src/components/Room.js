import React, { useContext, useEffect } from "react";
import { Context } from "../providers/Provider";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const Room = () => {
  const { roomID } = useContext(Context);

  // useEffect(() => {
  //   const getRooms = async () => {
  //     const roomDocRef = doc(db, "rooms", roomID);
  //     const roomDocSnap = await getDoc(roomDocRef);
  //   };

  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       getRooms();
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);

  return <div>{roomID}</div>;
};

export default Room;
