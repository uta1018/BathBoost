import { useNavigate } from "react-router-dom";
import PageHeader from "../common/PageHeader";
import Navbar from "../common/Navbar";
import Help from "../common/Help";
import { IoTicket } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../providers/Provider";
import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Fortune = () => {
  const { userID } = useContext(Context);
  const [userData, setUserData] = useState(null);
  const [isAbleFortune, setIsAbleFortune] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ユーザーデータを取得");
    const fetchData = async () => {
      // ログインしていなかったらログイン画面へ
      if (!localStorage.getItem("userID")) {
        navigate("/login");
        return;
      }

      // ユーザーデータを取得
      const userDocRef = doc(db, "user", userID);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setUserData({
          id: userDocSnap.id,
          ...userData,
        });

        if (userData.lastFortuneDate && userData.ticket) {
          const now = new Date();
          const lastDate = new Date(userData.lastFortuneDate);
          // 今日の0:00のタイムスタンプを生成
          const todayStart = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
          ).getTime();

          // lastFortuneDateが今日の0:00より前かどうかを判定
          setIsAbleFortune(lastDate.getTime() < todayStart);
        } else {
          setIsAbleFortune(true);
        }
      } else {
        console.log("ユーザーデータが見つかりません");
      }
    };

    fetchData();
  }, []);

  const handleRandomNavigate = async () => {
    const userDocRef = doc(db, "user", userID);
    await updateDoc(userDocRef, {
      ticket: increment(-1),
      lastFortuneDate: new Date(),
    });

    // id選択の確率分布: 0, 1, 2, 3, 4
    const fortuneProbabilities = [0.05, 0.3, 0.3, 0.3, 0.05];

    let randomId = -1;
    let probabilitySum = 0;
    const randomValue = Math.random();

    for (let i = 0; i < fortuneProbabilities.length; i++) {
      probabilitySum += fortuneProbabilities[i];
      if (randomValue < probabilitySum) {
        randomId = i;
        break;
      }
    }

    navigate(`/fortune/${randomId}`, { state: { isAuthorized: true } });
  };

  return (
    <div className="fortune-container">
      <PageHeader title="うらない" />
      <Help />
      <div className="ticket-wrapper">
        <p>うらないチケット</p>
        <div className="ticket-count">
          <IoTicket className="ticket-icon" />
          <p>{userData?.ticket || 0}</p>
        </div>
      </div>
      <img src="/log/cat_book.png" alt="アイスうらない" />
      <button
        onClick={handleRandomNavigate}
        className="fortune-button button"
        disabled={!isAbleFortune || !userData.ticket || userData.ticket <= 0}
      >
        <div className="button-ticket-wrapper">
          <IoTicket className="ticket-icon" />
          <p>1</p>
        </div>
        <h1>運勢をうらなう</h1>
      </button>
      <div className="today-count">
        <div>今日のうらない回数</div>
        <h4>あと{isAbleFortune ? 1 : 0} 回</h4>
      </div>
      <Navbar currentPage="fortune" />
    </div>
  );
};

export default Fortune;
