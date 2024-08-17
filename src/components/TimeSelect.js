import React, { useContext, useEffect, useState } from "react";
import { Context } from "../providers/Provider";
import { db } from "../firebase";
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
  // グローバル変数を取得
  const { userID, roomID } = useContext(Context);
  // 目標時間を現在の時間に初期化
  const [goalTime, setGoalTime] = useState(toLocalISOString(new Date()));

  const navigate = useNavigate();
  console.log("時間選択画面");

  // ログインしていなかったらログイン画面へ
  useEffect(() => {
    if (!userID) {
      navigate("/login");
    } else if(!roomID) {
      navigate("/");
    }
  }, []);

  // 決定ボタンを押したときに実行する関数
  const postData = async () => {
    if (!roomID || !userID) return;
    // ポストを保存
    await addDoc(collection(db, "posts"), {
      roomid: roomID,
      author: userID,
      type: "setBathGoal",
      date: new Date().getTime(),
      goalTime: new Date(goalTime),
    });

    // ルーム画面へ
    navigate("/room");
  };

  return (
    <div className="TimeSelect_container">
      <div className="header">
        <div className="logo-box">
          <img src="/logo.png" className="logoImg"></img>
          <div className="logo">BATH BOOST</div>
        </div>
      </div>
      <div className="timeSelect">
        <h3>何時に入る?</h3>
        <input
          type="datetime-local"
          value={goalTime}
          onChange={(e) => setGoalTime(e.target.value)}
        />
        <div className="button-container">
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
