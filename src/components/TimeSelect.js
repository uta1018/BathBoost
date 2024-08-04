import React, { useContext, useEffect, useState } from "react";
import { Context } from "../providers/Provider";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import './css/TimeSelect.css';

const toLocalISOString = (date) => {
  const localDate = new Date(date - date.getTimezoneOffset() * 60000);
  localDate.setSeconds(0); 
  localDate.setMilliseconds(0);
  return localDate.toISOString().slice(0, 16);
};

const TimeSelect = () => {
  const { roomID, setRoomID } = useContext(Context);
  const [goalTime, setGoalTime] = useState(toLocalISOString(new Date()));

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("isAuth")) {
      navigate("/login");
    }
  }, []);

  const postData = async () => {
    const currentRoomID = roomID || localStorage.getItem("roomID");
    setRoomID(currentRoomID);
    const userID = auth.currentUser.uid;
    if (!currentRoomID || !userID) return;

    await addDoc(collection(db, "posts"), {
      roomid: currentRoomID,
      author: userID,
      type: "setBathGoal",
      date: new Date().getTime(),
      goalTime: new Date(goalTime),
    });

    navigate("/room");
  };

  return (
    <div class="TimeSelect_container">
      <div className="header">
        <div className="logo-box">
          <img src="/logo.png" className="logoImg"></img>
          <div className="logo">BATH BOOST</div>
        </div>
      </div>
      <div class="timeSelect">
        <h3>何時に入る?</h3>
        <input
          type="datetime-local"
          value={goalTime}
          onChange={(e) => setGoalTime(e.target.value)}
        />
        <div class="button-container">
          <button onClick={postData}>決定</button>
        </div>
      </div>
      <img src='TimeQuestion.png' className="image" alt="Time Question"/>
      <div className="footer">
        <h2>@ライラック</h2>
      </div>
    </div>
  );
};

export default TimeSelect;
