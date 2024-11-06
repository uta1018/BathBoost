import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const FortuneResult = ({ id }) => {
  const navigate = useNavigate();
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

  const msg = ["超大吉", "大吉", "中吉", "小吉", "凶"];

  const selectedProbabilities =
    probabilities.get(id) || probabilities.get("default");

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

  return (
    <div className="fortune-result-container">
      <div className="header">
        <div className="title">
          <FontAwesomeIcon icon={faPaw} />
          <h3>アイスうらないの結果</h3>
        </div>
      </div>
      <img src={`/fortune/result_card_${id}.png`} alt={msg[id]} />
      <h2>~ 今日の運勢 ~</h2>
      <div className="fortune-wrapper-container">
        <div className="fortune-wrapper">
          <div>恋愛</div>
          <p>{results[0]}</p>
        </div>
        <div className="fortune-wrapper">
          <div>お金</div>
          <p>{results[1]}</p>
        </div>
        <div className="fortune-wrapper">
          <div>仕事</div>
          <p>{results[2]}</p>
        </div>
        <div className="fortune-wrapper">
          <div>健康</div>
          <p>{results[3]}</p>
        </div>
        <div className="fortune-wrapper">
          <div>人間関係</div>
          <p>{results[4]}</p>
        </div>
      </div>
      <div className="button-wrapper">
        <button
          className="button button-w140 cancel-button"
          onClick={() => navigate("/fortune", { replace: true })}
        >
          もどる
        </button>
        <a
          href={`https://twitter.com/intent/tweet?url=https://bath-boost-dev.web.app/fortune/${id}&text=今日のあなたの運勢は…【${msg[id]}】です！%0a&hashtags=今日のアイスうらない&hashtags=bathboost`}
          className="button button-w140 ok-button-sub"
          target="_blank"
        >
          シェアする
        </a>
      </div>
    </div>
  );
};

export default FortuneResult;
