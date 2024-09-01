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
import {
  faBath,
  faCalendar,
  faCalendarPlus,
  faClock,
  faPaw,
  faShower,
} from "@fortawesome/free-solid-svg-icons";

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
        const userData = userDocSnap.data();
        // 現在の日付を取得
        const currentDate = new Date();
        // 登録日をUnix timeから日付に変換
        const registrationDate = new Date(userData.date);
        registrationDate.setHours(0, 0, 0, 0);
        // 登録日からの経過日数を計算
        const daysSinceRegistration = Math.floor(
          (currentDate - registrationDate) / (1000 * 60 * 60 * 24)
        );
        setUserData({
          id: userDocSnap.id,
          ...userData,
          daysSinceRegistration,
        });
      } else {
        console.log("ユーザーデータが見つかりません");
      }
    };

    fetchData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="log-container">
      <PageHeader title="きろく" />
      <Help />
      <img src="/log/cat_book.png" alt="本を読む猫" />
      <div className="user-info-wrapper">
        <div>
          <div className="head">
            <FontAwesomeIcon icon={faPaw} />
            <p className="head-text">おふろレベル</p>
          </div>
          <p>
            Lv.<span>{userData.level}</span>
          </p>
        </div>
        <div>
          <div className="head">
            <FontAwesomeIcon icon={faShower} />
            <p>おふろポイント</p>
          </div>
          <p>
            <span>{userData.point}</span>pt
          </p>
        </div>
        <div>
          <div className="head">
            <FontAwesomeIcon icon={faBath} />
            <p>おふろ回数</p>
          </div>
          <p>
            <span>{userData.bathCount}</span>回
          </p>
        </div>
        <div>
          <div className="head">
            <FontAwesomeIcon icon={faClock} />
            <p>登録から</p>
          </div>
          <p>
            <span>{userData.daysSinceRegistration}</span>日
          </p>
        </div>
      </div>
      <PageSubheading title="れんぞくおふろきろく" />
      <h4>連続でおふろ宣言を達成した回数は…</h4>
      <div className="user-info-wrapper">
        <div>
          <div className="head">
            <FontAwesomeIcon icon={faCalendar} />
            <p>現在の回数</p>
          </div>
          <p>
            <span>{userData.goalStreakCount}</span>回
          </p>
        </div>
        <div>
          <div className="head">
            <FontAwesomeIcon icon={faCalendarPlus} />
            <p>最長の回数</p>
          </div>
          <p>
            <span>{userData.longestGoalStreakCount}</span>回
          </p>
        </div>
      </div>
      <Navbar currentPage="log" />
    </div>
  );
};

export default Log;
