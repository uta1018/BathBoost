import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../providers/Provider";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import PopupHeader from "../common/PopupHeader";
import { faBath } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const toLocalISOString = (date) => {
  const localDate = new Date(date - date.getTimezoneOffset() * 60000);
  localDate.setSeconds(0);
  localDate.setMilliseconds(0);
  return localDate.toISOString().slice(0, 16);
};

const SetBathGoal = ({
  closeSetBathGoal,
  closeSelectStamp,
  stamp,
  removeOverlay,
}) => {
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
    removeOverlay();

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
    <div className="popup-content">
      <PopupHeader title="おふろ宣言をする" />
      <div className="timeSelect">
        <h3>
          <FontAwesomeIcon icon={faBath} />
          おふろの日時
        </h3>
        <input
          type="datetime-local"
          value={goalTime}
          onChange={(e) => setGoalTime(e.target.value)}
        />
        <p>お風呂に入る目標時間を選択してください</p>
        <p>※後から変更できません</p>
        <div className="button-container">
          <button
            onClick={() => {
              closeSetBathGoal();
              removeOverlay();
            }}
          >
            キャンセル
          </button>
          <button onClick={postData}>決定</button>
        </div>
      </div>
    </div>
  );
};

export default SetBathGoal;
