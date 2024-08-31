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
import React, { memo, useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import { Context } from "../../providers/Provider";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SelectStamp = memo(
  ({
    lastPostType,
    closeSelectStamp,
    openSetBathGoal,
    openPointUp,
    openLevelUp,
    settingNextPoint,
    settingPoint,
    settingStamp,
    applyOverlay,
  }) => {
    // グローバル変数を取得
    const { userID, roomID } = useContext(Context);
    // スタンプの種類を保存する変数
    const [stampType, setStampType] = useState();
    // 選択されたスタンプを保存する変数
    const [stamp, setStamp] = useState("");
    // スタンプリストを保存する変数
    const [stampList, setStampList] = useState([]);
    // ユーザー情報を保存
    const [userData, setUserData] = useState();

    console.log("スタンプ選択画面");

    // 読み込み時に実行
    useEffect(() => {
      if (lastPostType === "setBathGoal") {
        setStampType("startBath");
      } else if (lastPostType === "startBath") {
        setStampType("endBath");
      } else if (
        !lastPostType ||
        lastPostType === "endBath" ||
        lastPostType === "cancelBath"
      ) {
        setStampType("setBathGoal");
      }
    }, []);

    // stampTypeが変わった後にスタンプリストを取得する
    useEffect(() => {
      // スタンプリストをuserドキュメントから取得
      const getStamps = async () => {
        if (stampType) {
          console.log("stampList");
          // userドキュメントを取得
          const userDocSnap = await getDoc(doc(db, "user", userID));
          const userData = userDocSnap.data();
          // userドキュメントのスタンプリストを保存
          const stamps = userData[`${stampType}Stamp`];
          // スタンプリストを変数に保存
          setStampList(stamps);
          // ユーザー情報を変数に保存
          setUserData({ id: userDocSnap.id, ...userData });
        }
      };
      getStamps();
    }, [stampType]);

    // stampListが変わった後に、stampを初期化する
    useEffect(() => {
      if (stampList.length > 0) {
        setStamp(stampList[0]);
      }
    }, [stampList]);

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
            stamp: stamp,
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

            const userDocRef = doc(db, "user", userID);
            const currentLevel = userData.level;
            let point = userData.point;

            if (
              lastPost.isGoalAchieved &&
              userData.goalStreakCount + 1 > userData.longestGoalStreakCount
            ) {
              await updateDoc(userDocRef, {
                point: increment(3),
                bathCount: increment(1),
                goalStreakCount: increment(1),
                longestGoalStreakCount: increment(1),
              });
              // ポイントの増減を更新
              settingPoint(+3);
              point += 3;
            } else if (lastPost.isGoalAchieved) {
              await updateDoc(userDocRef, {
                point: increment(3),
                bathCount: increment(1),
                goalStreakCount: increment(1),
              });
              // ポイントの増減を更新
              settingPoint(+3);
              point += 3;
            } else {
              await updateDoc(userDocRef, {
                point: increment(1),
                bathCount: increment(1),
                goalStreakCount: 0,
              });
              // ポイントの増減を更新
              settingPoint(+1);
              point += 1;
            }

            const level = Math.floor(point / 3);
            // 次のレベルまでのポイント
            settingNextPoint(3 * (level + 1) - point);

            // レベルが変わったとき
            if (currentLevel !== level) {
              // ユーザーのレベルを更新
              await updateDoc(userDocRef, {
                level,
              });
              openLevelUp();
            } else {
              openPointUp();
              applyOverlay();
            }

            // ポストを保存
            await addDoc(collection(db, "posts"), {
              roomid: roomID,
              author: userID,
              type: "endBath",
              date: new Date().getTime(),
              stamp: stamp,
            });
          }
        };

        closeSelectStamp();
        postData();
      } else if (
        !lastPostType ||
        lastPostType === "endBath" ||
        lastPostType === "cancelBath"
      ) {
        settingStamp(stamp);
        applyOverlay();
        // 時間選択ポップアップを表示
        openSetBathGoal();
      }
    };

    // ロックされたスタンプの数を計算
    const lockedStampsCount = 6 - stampList.length;

    return (
      <div className="select-stamp-container">
        <div className="button-wrapper">
          <button className="button back-button" onClick={closeSelectStamp}>
            とじる
          </button>
          <button className="room-button room-button-ok" onClick={handleSubmit}>
            決定
          </button>
        </div>
        {/* スタンプリストのスタンプを表示 */}
        <div className="stamp-wrapper">
          {stampList.map((s) => {
            return (
              <img
                src={s}
                alt="スタンプ"
                onClick={() => setStamp(s)}
                className={`stamp ${stamp === s && "stamp-selected"}`}
              />
            );
          })}
          {/* ロックされたスタンプを追加 */}
          {Array.from({ length: lockedStampsCount }, (_, i) => (
            <div key={`locked-${i}`} className="stamp locked-stamp">
              <FontAwesomeIcon icon={faLock} />
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default SelectStamp;
