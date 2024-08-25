import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../providers/Provider";
import { db } from "../../firebase";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const LevelUp = ({ nextPoint, point, closeLevelUp }) => {
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
        const rewardDocRef = doc(db, "reward", userData.level.toString());
        const rewardDocSnap = await getDoc(rewardDocRef);

        // Firestoreにドキュメントが存在するか確認
        if (rewardDocSnap.exists()) {
          const rewardData = { level: userData.level, ...rewardDocSnap.data() };

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
          }
          setRewardData(rewardData);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="levelup-content">
      {point > 0 ? (
        <div>
          <p>おふろレベルUP!</p>
        </div>
      ) : (
        <div>
          <p>おふろレベルDOWN…</p>
        </div>
      )}
      <FontAwesomeIcon icon={faStar} />
      <p>Lv.{userData && userData.level}</p>
      {rewardData && (
        <div>
          <p>かくとく</p>
          <img src={rewardData.path} alt="" width="200px" height="100%" />
        </div>
      )}
      {point < 0 && (
        <div>
          <img
            src="/levelUp/cat_sad.png"
            alt="ねこが悲しむイラスト"
            width="200px"
          />
          <p>時間までにお風呂に入る +3pt</p>
          <p>遅れてお風呂に入る +1pt</p>
          <p>お風呂キャンセル -1pt</p>
        </div>
      )}
      <p>つぎのレベルまであと{nextPoint}pt</p>
      <button onClick={closeLevelUp}>OK</button>
    </div>
  );
};

export default LevelUp;
