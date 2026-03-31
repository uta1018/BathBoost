import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../providers/Provider";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import PageSubheading from "../common/PageSubheading";
import Loading from "../common/Loading";

const formatDate = (time) => {
  const date = new Date(time);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString();

  return `${month}月${day}日`;
};

const FortuneResult = ({ isPopup = true }) => {
  const { userID } = useContext(Context);
  const [result, setResult] = useState({ id: -1, results: [] });
  const [date, setDate] = useState(false);
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
        if (userData.lastFortuneDate && userData.lastFortuneResult) {
          setResult(userData.lastFortuneResult);
          setDate(formatDate(userData.lastFortuneDate));
        }
      } else {
        console.log("ユーザーデータが見つかりません");
      }
    };

    fetchData();
  }, []);

  const msg = ["超大吉", "大吉", "中吉", "小吉", "凶"];

  if (!result) {
    return <Loading />;
  }

  return (
    <div
      className={
        isPopup
          ? "fortune-result-container-popup fortune-result-container"
          : "fortune-result-container"
      }
    >
      {isPopup ? (
        <div className="header">
          <div className="title">
            <FontAwesomeIcon icon={faPaw} />
            <h3>アイスうらないの結果</h3>
          </div>
        </div>
      ) : (
        <div className="page-subheading">
          <PageSubheading title="前回のアイスうらない" />
          {date && <p>{date}</p>}
        </div>
      )}
      {date && (
        <>
          <img
            src={`/fortune/result_card_${result.id}.png`}
            alt={msg[result.id]}
          />
          <h2>~ 今日の運勢 ~</h2>
          <div className="fortune-wrapper-container">
            <div className="fortune-wrapper">
              <div>恋愛</div>
              <p>{result.results[0]}</p>
            </div>
            <div className="fortune-wrapper">
              <div>お金</div>
              <p>{result.results[1]}</p>
            </div>
            <div className="fortune-wrapper">
              <div>仕事</div>
              <p>{result.results[2]}</p>
            </div>
            <div className="fortune-wrapper">
              <div>健康</div>
              <p>{result.results[3]}</p>
            </div>
            <div className="fortune-wrapper">
              <div>人間関係</div>
              <p>{result.results[4]}</p>
            </div>
          </div>
          <div className="button-wrapper">
            {isPopup && (
              <button
                className="button button-w140 cancel-button"
                onClick={() => navigate("/fortune", { replace: true })}
              >
                もどる
              </button>
            )}
            <a
              href={`https://twitter.com/intent/tweet?url=https://bath-boost.web.app/fortune/${
                result.id
              }&text=今日のあなたの運勢は…【${
                msg[result.id]
              }】です！%0a&hashtags=今日のアイスうらない&hashtags=BathBoost`}
              className={
                isPopup
                  ? "button button-w140 ok-button-sub"
                  : "button ok-button-main button-w280"
              }
              target="_blank"
            >
              シェアする
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default FortuneResult;
