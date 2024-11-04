import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../providers/Provider";
import { db } from "../../firebase";
import {
  arrayUnion,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";

// 報酬
const rewardDatas = {
  1: {
    path: "/setBathGoalStamp/2.png",
    stampType: "setBathGoalStamp",
    type: "stamp",
  },
  3: {
    path: "/icon/1.png",
    type: "icon",
  },
  5: {
    path: "/themeColor/theme2.png",
    themeColor: "theme2",
    type: "themeColor",
  },
  7: {
    path: "/startBathStamp/2.png",
    stampType: "startBathStamp",
    type: "stamp",
  },
  9: {
    path: "/icon/2.png",
    type: "icon",
  },
  11: {
    path: "/endBathStamp/2.png",
    stampType: "endBathStamp",
    type: "stamp",
  },
  13: {
    path: "/icon/3.png",
    type: "icon",
  },
  15: {
    path: "/setBathGoalStamp/3.png",
    stampType: "setBathGoalStamp",
    type: "stamp",
  },
  17: {
    path: "/icon/4.png",
    type: "icon",
  },
  19: {
    path: "/themeColor/theme3.png",
    themeColor: "theme3",
    type: "themeColor",
  },
  21: {
    path: "/startBathStamp/3.png",
    stampType: "startBathStamp",
    type: "stamp",
  },
  23: {
    path: "/icon/5.png",
    type: "icon",
  },
  25: {
    path: "/endBathStamp/3.png",
    stampType: "endBathStamp",
    type: "stamp",
  },
  27: {
    path: "/icon/6.png",
    type: "icon",
  },
};

const LevelUp = ({ point, closeLevelUp }) => {
  const { userID } = useContext(Context);
  const [userData, setUserData] = useState();
  const [rewardData, setRewardData] = useState();

  console.log("レベルUPポップアップ");

  useEffect(() => {
    const fetchData = async () => {
      if (!userID) return;

      // 自分のユーザー情報を取得
      const userDocRef = doc(db, "user", userID);
      const userDocSnap = await getDoc(userDocRef);
      const userData = { id: userDocSnap.id, ...userDocSnap.data() };
      setUserData(userData);

      // 報酬を取得
      if (userData.highestLevel < userData.level) {
        let rewardData;
        if (rewardDatas[userData.level]) {
          rewardData = {
            level: userData.level,
            ...rewardDatas[userData.level],
          };
        } else {
          rewardData = {
            level: userData.level,
            path: "",
            type: "ticket",
          };
        }

        // スタンプの場合のユーザーデータ更新
        if (rewardData.type === "stamp") {
          await updateDoc(userDocRef, {
            [rewardData.stampType]: arrayUnion(rewardData.path),
            highestLevel: userData.level,
          });
        } else if (rewardData.type === "icon") {
          await updateDoc(userDocRef, {
            iconList: arrayUnion(rewardData.path),
            highestLevel: userData.level,
          });
        } else if (rewardData.type === "themeColor") {
          await updateDoc(userDocRef, {
            themeColorList: arrayUnion(rewardData.themeColor),
            highestLevel: userData.level,
          });
        } else if (rewardData.type === "ticket") {
          await updateDoc(userDocRef, {
            ticket: increment(1),
            highestLevel: userData.level,
          });
        }
        setRewardData(rewardData);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="level-up-container">
      {point > 0 ? (
        <div className="level-up flex-box">
          <img className="cat" src="levelUp/cat_level_change.png" alt="猫" />
          <img
            className="frog"
            src="levelUp/frog_level_up.png"
            alt="おふろレベルUP!"
          />
          <h3>
            <span>Lv.</span>
            {userData && userData.level}
          </h3>
          {rewardData ? (
            <div className="reward-wrapper">
              <img
                className={rewardData.type}
                src={rewardData.path}
                alt="ほうしゅう"
              />
              <p>
                {rewardData.type === "stamp" && "スタンプをかくとくしました"}
                {rewardData.type === "themeColor" &&
                  "テーマカラーをかくとくしました"}
                {rewardData.type === "icon" && "アイコンをかくとくしました"}
                {rewardData.type === "ticket" &&
                  "うらないチケットをかくとくしました"}
              </p>
              <p>
                {(rewardData.type === "themeColor" ||
                  rewardData.type === "icon") &&
                  "※せっていから変更できます"}
                {rewardData.type === "ticket" && "※うらないで使用できます"}
              </p>
            </div>
          ) : (
            <div className="point-wrapper">
              <div>
                <p>時間までにお風呂に入る</p>
                <p>+3pt</p>
              </div>
              <div>
                <p>遅れてお風呂に入る</p>
                <p>+1pt</p>
              </div>
              <div>
                <p>お風呂キャンセル</p>
                <p>-1pt</p>
              </div>
            </div>
          )}
          <button
            className="button button-w280 ok-button-sub"
            onClick={closeLevelUp}
          >
            OK
          </button>
        </div>
      ) : (
        <div className="level-down flex-box">
          <img
            className="frog"
            src="levelUp/frog_level_down.png"
            alt="おふろレベルDOWN…"
          />
          <img className="cat" src="levelUp/cat_level_change.png" alt="猫" />
          <h3>
            <span>Lv.</span>
            {userData && userData.level}
          </h3>
          <div className="point-wrapper">
            <div>
              <p>時間までにお風呂に入る</p>
              <p>+3pt</p>
            </div>
            <div>
              <p>遅れてお風呂に入る</p>
              <p>+1pt</p>
            </div>
            <div>
              <p>お風呂キャンセル</p>
              <p>-1pt</p>
            </div>
          </div>
          <button
            className="button button-w280 ok-button-main"
            onClick={closeLevelUp}
          >
            OK
          </button>
        </div>
      )}
    </div>
  );
};

export default LevelUp;
