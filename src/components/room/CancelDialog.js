import React, { useContext } from "react";
import { Context } from "../../providers/Provider";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";
import PopupHeader from "../common/PopupHeader";

const CancelDialog = ({
  closeCancelDialog,
  openPointUp,
  openLevelUp,
  settingNextPoint,
  settingPoint,
  removeOverlay,
}) => {
  const { roomID, userID } = useContext(Context);

  console.log("キャンセルポップアップ");

  // はいボタンを押したときの関数
  const postData = async () => {
    if (!roomID || !userID) return;
    closeCancelDialog();

    // ユーザーのポイントを更新
    const userDocRef = doc(db, "user", userID);
    await updateDoc(userDocRef, {
      point: increment(-1),
      goalStreakCount: 0,
    });
    const userDocSnap = await getDoc(userDocRef);
    const currentLevel = userDocSnap.data().level;
    const point = userDocSnap.data().point;
    const level = Math.floor(point / 3);

    // レベルアップポップアップ・ポイントアップポップアップに渡す変数を更新
    // 次のレベルまでのポイント
    settingNextPoint(3 * (currentLevel + 1) - point);
    // ポイントの増減
    settingPoint(-1);
    // レベルダウンした際、レベルアップ画面へ
    if (currentLevel !== level) {
      // レベルを更新
      await updateDoc(userDocRef, {
        level,
      });
      removeOverlay();
      openLevelUp();
    } else {
      openPointUp();
    }

    // ポストを保存
    await addDoc(collection(db, "posts"), {
      roomid: roomID,
      author: userID,
      type: "cancelBath",
      date: new Date().getTime(),
      stamp: "/cancelBathStamp/1.png",
    });
  };

  return (
    <div className="cancel-dialog-container">
      <PopupHeader title="おふろ報告の確認" />
      <div className="flex-box">
        <h3>本当にやめますか？</h3>
        <p>※おふろポイントが1ポイント減ります</p>
        <div className="button-wrapper">
          <button
            className="button button-w140 cancel-button"
            onClick={() => {
              closeCancelDialog();
              removeOverlay();
            }}
          >
            いいえ
          </button>
          <button
            className="button button-w140 ok-button-main"
            onClick={postData}
          >
            はい
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelDialog;
