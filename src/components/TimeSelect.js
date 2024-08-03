import React, { useContext, useEffect, useState } from "react";
import { Context } from "../providers/Provider";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const convertGoalTimeToDate = (goalTimeStr) => {
  const [date, time] = goalTimeStr.split("T");
  const [hours, minutes] = time.split(":").map(Number);
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day, hours, minutes);
};

const toLocalISOString = (date) => {
  const localDate = new Date(date - date.getTimezoneOffset() * 60000);
  localDate.setSeconds(null);
  localDate.setMilliseconds(null);
  return localDate.toISOString().slice(0, -1);
};

const TimeSelect = () => {
  const { roomID, setRoomID } = useContext(Context);
  const [goalTime, setGoalTime] = useState(toLocalISOString(new Date()));

  const navigate = useNavigate();

  const postData = async () => {
    const currentRoomID = roomID || localStorage.getItem("roomID");
    setRoomID(currentRoomID);
    const userID = auth.currentUser.uid;
    if (!currentRoomID || !userID) return;

    // 目標時間を Date オブジェクトに変換
    const goalTimeDate = convertGoalTimeToDate(goalTime);

    const postRef = await addDoc(collection(db, "posts"), {
      roomid: currentRoomID,
      author: userID,
      type: "setBathGoal",
      date: new Date().getTime(),
      goalTime: goalTimeDate,
    });

    navigate("/room");
  };

  return (
    <div>
      <h3>何時にお風呂入る?</h3>
      <input
        type="datetime-local"
        value={toLocalISOString(new Date())}
        onChange={(e) => setGoalTime(e.target.value)}
      />
      <button onClick={postData}>決定</button>
    </div>
  );
};

export default TimeSelect;
