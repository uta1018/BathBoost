import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../providers/Provider";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
// import './css/TimeSelect.css';

const toLocalISOString = (date) => {
  const localDate = new Date(date - date.getTimezoneOffset() * 60000);
  localDate.setSeconds(0);
  localDate.setMilliseconds(0);
  return localDate.toISOString().slice(0, 16);
};

const SetBathGoal = ({ closeSetBathGoal, closeSelectStamp, stamp }) => {
  // グローバル変数を取得
  const { userID, roomID } = useContext(Context);
  // 目標時間を現在の時間に初期化
  const [goalTime, setGoalTime] = useState(toLocalISOString(new Date()));

  console.log("時間選択画面");

  // 決定ボタンを押したときに実行する関数
  const postData = async () => {
    if (!roomID || !userID) return;

    // ルーム画面へ
    closeSelectStamp();
    closeSetBathGoal();

    // ポストを保存
    await addDoc(collection(db, "posts"), {
      roomid: roomID,
      author: userID,
      type: "setBathGoal",
      date: new Date().getTime(),
      stamp: stamp,
      goalTime: new Date(goalTime),
    });
  };

  return (
    <div className="TimeSelect_container">
      <div className="timeSelect">
        <h3>何時に入る?</h3>
        <input
          type="datetime-local"
          value={goalTime}
          onChange={(e) => setGoalTime(e.target.value)}
        />
        <div className="button-container">
          <button onClick={closeSetBathGoal}>キャンセル</button>
          <button onClick={postData}>決定</button>
        </div>
      </div>
    </div>
  );
};

export default SetBathGoal;
