import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../providers/Provider";
import { db } from "../../firebase";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";

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
      if (userData.highestLevel === userData.level) {
        const rewardDocRef = doc(db, "reward", userData.level.toString());
        const rewardDocSnap = await getDoc(rewardDocRef);

        // Firestoreにドキュメントが存在するか確認
        if (rewardDocSnap.exists()) {
          const rewardData = { level: userData.level, ...rewardDocSnap.data() };

          // スタンプの場合のユーザーデータ更新
          if (rewardData.type === "stamp") {
            await updateDoc(userDocRef, {
              [rewardData.stampType]: arrayUnion(rewardData.path),
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
          <p>おふろレベルUP</p>
        </div>
      ) : (
        <div>
          <p>おふろレベルDOWN</p>
        </div>
      )}
      <p>Lv.{userData && userData.level}</p>
      {rewardData && (
        <div>
          <p>かくとく</p>
          <img src={rewardData.path} alt="" width="200px" height="100%" />
        </div>
      )}

      <p>つぎのレベルまであと{nextPoint}pt</p>
      <button onClick={closeLevelUp}>OK</button>
    </div>
  );
};

export default LevelUp;
