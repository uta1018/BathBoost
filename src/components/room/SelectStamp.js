import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { memo, useContext } from "react";
import { db } from "../../firebase";
import { Context } from "../../providers/Provider";

const SelectStamp = memo(
  ({
    lastPostType,
    closeSelectStamp,
    openSetBathGoal,
    openPointUp,
    openLevelUp,
    settingNextPoint,
    settingPoint,
  }) => {
    // グローバル変数を取得
    const { userID, roomID } = useContext(Context);

    console.log("スタンプ選択画面");

    const handleSubmit = () => {
      if (lastPostType === "setBathGoal") {
        // 入浴をポスト
        const postData = async () => {
          if (!roomID || !userID) return;

          // 同じルームの自分の最新の投稿を1件取得
          const postsQuery = query(
            collection(db, "posts"),
            where("roomid", "==", roomID),
            where("author", "==", userID),
            orderBy("date", "desc"),
            limit(1) // 最新の1件のみ取得
          );

          const querySnapshot = await getDocs(postsQuery);
          let isGoalAchieved = false;
          if (!querySnapshot.empty) {
            // 最新の投稿からgoalTimeを取得
            const lastPost = querySnapshot.docs[0].data();
            const goalTime = lastPost.goalTime
              ? lastPost.goalTime.toDate()
              : null;
            // isGoalAchievedに目標が達成されているか保存
            if (goalTime) {
              const now = new Date();
              isGoalAchieved = now <= goalTime;
            }
          }
          // ポストを保存
          await addDoc(collection(db, "posts"), {
            roomid: roomID,
            author: userID,
            type: "startBath",
            date: new Date().getTime(),
            isGoalAchieved,
          });
        };

        closeSelectStamp();
        postData();
      } else if (lastPostType === "startBath") {
        // ボタンを押したときに実行される関数
        const postData = async () => {
          if (!roomID || !userID) return;

          // 同じルームの自分の最新の投稿を1件取得
          const postsQuery = query(
            collection(db, "posts"),
            where("roomid", "==", roomID),
            where("author", "==", userID),
            orderBy("date", "desc"),
            limit(1) // 最新の1件のみ取得
          );

          const querySnapshot = await getDocs(postsQuery);
          if (!querySnapshot.empty) {
            // 最新の投稿からgoalTimeを取得
            const lastPost = querySnapshot.docs[0].data();
            // 目標を達成できたか否かでユーザーのポイントを更新
            const userDocRef = doc(db, "user", userID);
            if (lastPost.isGoalAchieved) {
              await updateDoc(userDocRef, {
                point: increment(3),
              });
              // ポイントの増減を更新
              settingPoint(+3);
            } else {
              await updateDoc(userDocRef, {
                point: increment(1),
              });
              // ポイントの増減を更新
              settingPoint(+1);
            }

            // ユーザー情報を取得
            const userDocSnap = await getDoc(userDocRef);
            const currentLevel = userDocSnap.data().level;
            const point = userDocSnap.data().point;
            const level = Math.floor(point / 2);

            // レベルアップポップアップ・ポイントアップポップアップに渡す変数を更新
            // 次のレベルまでのポイント
            settingNextPoint(2 * (level + 1) - point);

            // レベルが変わったとき
            if (currentLevel !== level) {
              // ユーザーのレベルを更新
              await updateDoc(userDocRef, {
                level,
              });
              openLevelUp();
            } else {
              openPointUp();
            }

            // ポストを保存
            await addDoc(collection(db, "posts"), {
              roomid: roomID,
              author: userID,
              type: "endBath",
              date: new Date().getTime(),
            });
          }
        };

        closeSelectStamp();
        postData();
      } else if (
        lastPostType === null ||
        lastPostType === "endBath" ||
        lastPostType === "cancelBath"
      ) {
        // 時間選択ポップアップを表示
        openSetBathGoal();
      }
    };

    return (
      <div>
        <button onClick={closeSelectStamp}>とじる</button>
        <button onClick={handleSubmit}>決定</button>
        {/* スタンプ選択する部分 */}
      </div>
    );
  }
);

export default SelectStamp;
