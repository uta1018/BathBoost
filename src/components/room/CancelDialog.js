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

const CancelDialog = ({
  closeCancelDialog,
  openPointUp,
  openLevelUp,
  settingNextPoint,
  settingPoint,
}) => {
  const { roomID, userID } = useContext(Context);

  // はいボタンを押したときの関数
  const postData = async () => {
    if (!roomID || !userID) return;

    // ポストを保存
    await addDoc(collection(db, "posts"), {
      roomid: roomID,
      author: userID,
      type: "cancelBath",
      date: new Date().getTime(),
    });

    // ユーザーのポイントを更新
    const userDocRef = doc(db, "user", userID);
    await updateDoc(userDocRef, {
      point: increment(-1),
    });
    const userDocSnap = await getDoc(userDocRef);
    const currentLevel = userDocSnap.data().level;
    const point = userDocSnap.data().point;
    const level = Math.floor(point / 2);

    // レベルアップポップアップ・ポイントアップポップアップに渡す変数を更新
    // 次のレベルまでのポイント
    settingNextPoint(2 * (currentLevel + 1) - point);
    // ポイントの増減
    settingPoint(-1);
    // レベルダウンした際、レベルアップ画面へ
    if (currentLevel !== level) {
      // レベルを更新
      await updateDoc(userDocRef, {
        level,
      });
      openLevelUp();
    } else {
      openPointUp();
    }

    closeCancelDialog();
  };

  return (
    <div>
      <p>本当にやめますか？</p>
      <button onClick={closeCancelDialog}>いいえ</button>
      <button onClick={postData}>はい</button>
    </div>
  );
};

export default CancelDialog;
