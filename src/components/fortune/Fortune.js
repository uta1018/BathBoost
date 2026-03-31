import { useNavigate } from "react-router-dom";
import PageHeader from "../common/PageHeader";
import Navbar from "../common/Navbar";
import Help from "../common/Help";
import { IoTicket } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../providers/Provider";
import {
  arrayUnion,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import FortuneResult from "./FortuneResult";
import Loading from "../common/Loading";

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

        if (userData.lastFortuneDate) {
          const now = new Date();
          // 今日の0:00のタイムスタンプを生成
          const todayStart = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
          ).getTime();

          // lastFortuneDateが今日の0:00より前かどうかを判定
          setIsAbleFortune(userData.lastFortuneDate < todayStart);
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
    // id選択の確率分布: 0, 1, 2, 3, 4
    const fortuneProbabilities = [0.04, 0.24, 0.24, 0.24, 0.24];

    let randomId = -1;
    let probabilitySum = 0;
    const randomValue = Math.random();

    // 〇吉か生成
    for (let i = 0; i < fortuneProbabilities.length; i++) {
      probabilitySum += fortuneProbabilities[i];
      if (randomValue < probabilitySum) {
        randomId = i;
        break;
      }
    }

    // 結果生成
    const resultCount = 5;
    const resultMarks = [
      "めっちゃいい感じ！",
      "いい感じ！",
      "まあまあかな",
      "だめそう…",
    ];

    // id と確率分布の対応
    const probabilities = new Map([
      // id: "◎", "○", "△", "×"
      ["0", [0.7, 0.3, 0.0, 0.0]],
      ["1", [0.5, 0.4, 0.1, 0.0]],
      ["2", [0.3, 0.4, 0.2, 0.1]],
      ["3", [0.2, 0.4, 0.3, 0.1]],
      ["4", [0.0, 0.3, 0.5, 0.2]],
      ["default", [0.0, 0.0, 0.0, 1.0]],
    ]);

    const selectedProbabilities =
      probabilities.get(randomId.toString()) || probabilities.get("default");

    const generateResults = (count) => {
      const results = [];
      for (let i = 0; i < count; i++) {
        const randomValue = Math.random();
        let probabilitySum = 0;

        for (let j = 0; j < resultMarks.length; j++) {
          probabilitySum += selectedProbabilities[j];
          if (randomValue < probabilitySum) {
            results.push(resultMarks[j]);
            break;
          }
        }
      }
      return results;
    };

    const results = generateResults(resultCount);

    // 結果の保存
    const userDocRef = doc(db, "user", userID);
    if (randomId == 0) {
      // スタンプ追加
      await updateDoc(userDocRef, {
        endBathStamp: arrayUnion("/endBathStamp/4.png"),
        lastFortuneResult: { id: randomId, results },
        ticket: increment(-1),
        lastFortuneDate: new Date().getTime(),
      });
    } else {
      await updateDoc(userDocRef, {
        lastFortuneResult: { id: randomId, results },
        ticket: increment(-1),
        lastFortuneDate: new Date().getTime(),
      });
    }

    navigate(`/fortune/${randomId}`, { state: { isAuthorized: true } });
  };

  if (!userData) {
    return <Loading />;
  }

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
      <img src="/fortune/fortune_cat_frog.png" alt="アイスうらない" />
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
      <FortuneResult isPopup={false} />
      <Navbar currentPage="fortune" />
    </div>
  );
};

export default Fortune;
