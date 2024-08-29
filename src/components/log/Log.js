import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../providers/Provider";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar";
import PageHeader from "../common/PageHeader";
import PageSubheading from "../common/PageSubheading";
import Help from "../common/Help";

// アイコンのインポート
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";

const Log = () => {

    const { userID } = useContext(Context);
    const [userData, setUserData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
      console.log("ユーザーデータを取得");
      const fetchData = async () => {
        // ログインしていなかったらログイン画面へ
        if (!userID) {
          navigate("/login");
          return;
        }

        // ユーザーデータを取得
        const userDocRef = doc(db, "user", userID);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUserData({ id: userDocSnap.id, ...userDocSnap.data() });
        } else {
          console.log("ユーザーデータが見つかりません");
        }
      };

      fetchData();
    }, [userID, navigate]);

    if (!userData) {
      return <div>Loading...</div>;
    }

  return (
    <div>
      <PageHeader title="きろく" />
      <Help />
      <div>
        <FontAwesomeIcon icon={faFilePen} color={"#FFD4BC"} />
        おふろレベル Lv.{userData.level}
      </div>
      <div>
        <FontAwesomeIcon icon={faFilePen} color={"#FFD4BC"} />
        おふろポイント {userData.point}pt
      </div>
      <div>
        <FontAwesomeIcon icon={faFilePen} color={"#FFD4BC"} />
        おふろ回数 {userData.bathCount}回
      </div>
      <div>
        <FontAwesomeIcon icon={faFilePen} color={"#FFD4BC"} />
        登録から {userData.date}日
      </div>
      <PageSubheading title="れんぞくおふろきろく" />
      <div>現在　最長</div>
      <div>
        {userData.goalStreakCount}回　{userData.longestGoalStreakCount}回
      </div>
      <Navbar currentPage="log" />
    </div>
  );
};

export default Log;
