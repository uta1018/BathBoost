import React, { useContext, useEffect, useRef, useState } from "react";
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
    const now = new Date();
    const inputDate = new Date(value);
    if (!value) {
      return {
        active: false,
        message: "時間を選択してください",
      };
    } else if (inputDate < now) {
      return { active: false, message: "今より未来の時間を選択してください" };
    } else {
      return { active: true, message: "※後から変更できません" };
    }
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
    <div className="popup-content-h320 set-bath-goal-container">
      <PopupHeader title="おふろ宣言をする" />
      <div className="flex-box">
        <div className="text-wrapper">
          <FontAwesomeIcon icon={faBath} />
          <h3>おふろの日時</h3>
        </div>
        <input
          ref={inputRef}
          className="input"
          type="datetime-local"
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
