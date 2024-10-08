import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../providers/Provider";
import { db } from "../../firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import PopupHeader from "../common/PopupHeader";
import { faBath } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// 現在の時刻から10分後の時刻を "HH:MM" 形式で取得する関数
const getCurrentTimePlus10Minutes = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 10); // 10分を追加
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
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
  const [goalTime, setGoalTime] = useState(getCurrentTimePlus10Minutes);
  const inputRef = useRef(null);

  console.log("時間選択画面");

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // バリデーションのメッセージを管理する変数
  const [timeError, setTimeError] = useState({
    active: true,
    message: "※後から変更できません",
  });

  // バリデーション関数
  const validate = (value) => {
    if (!value) {
      return {
        active: false,
        message: "時間を選択してください",
      };
    }

    return { active: true, message: "※後から変更できません" };
  };

  // 入力時にバリデーション実行
  const handleTimeChange = (e) => {
    const time = e.target.value;
    setGoalTime(time);
    const error = validate(time);
    setTimeError(error);
  };

  // 決定ボタンを押したときに実行する関数
  const postData = async () => {
    if (!roomID || !userID) return;

    if (!validate(goalTime)) {
      return;
    }

    const [hours, minutes] = goalTime.split(":").map(Number);
    const now = new Date();
    const goalDateTime = new Date();
    goalDateTime.setHours(hours, minutes, 0, 0);

    // 現在時刻より過去の時間を選択した場合、次の日に設定する
    if (goalDateTime < now) {
      goalDateTime.setDate(now.getDate() + 1);
    }

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
      goalTime: goalDateTime,
    });

    await updateDoc(doc(db, "user", userID), {
      goalTime: goalDateTime,
    });
  };

  return (
    <div className="popup-content-h320 set-bath-goal-container">
      <PopupHeader title="おふろ宣言をする" />
      <div className="flex-box">
        <div className="text-wrapper">
          <FontAwesomeIcon icon={faBath} />
          <h3>おふろの時間</h3>
        </div>
        <input
          ref={inputRef}
          className="input"
          type="time"
          value={goalTime}
          onChange={handleTimeChange}
        />
        <p>お風呂に入る目標時間を選択してください</p>
        <p className="error-message">{timeError && timeError.message}</p>
        <div className="button-wrapper">
          <button
            className="button button-w140 cancel-button"
            onClick={() => {
              closeSetBathGoal();
              removeOverlay();
            }}
          >
            キャンセル
          </button>
          <button
            className="button button-w140 ok-button-main"
            onClick={postData}
            disabled={!timeError.active}
          >
            決定
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetBathGoal;
