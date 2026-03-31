import { useCallback, useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import FortuneResult from "./FortuneResult";
import Overlay from "../common/Overlay";

const FortuneAnimation = () => {
  const [animation, setAnimation] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // ボタン操作以外でのアクセス（stateが空の場合）はホームにリダイレクト
    if (!location.state || !location.state.isAuthorized) {
      navigate("/", { replace: true });
    }
  }, []);

  // ブラウザバックを禁止
  const blockBrowserBack = useCallback(() => {
    window.history.go(1);
  }, []);

  useEffect(() => {
    // 直前の履歴に現在のページを追加
    window.history.pushState(null, "", window.location.href);

    // 直前の履歴と現在のページのループ
    window.addEventListener("popstate", blockBrowserBack);

    // クリーンアップは忘れない
    return () => {
      window.removeEventListener("popstate", blockBrowserBack);
    };
  }, [blockBrowserBack]);

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
    <div className="fortune-animation-container">
      {animation == 0 && (
        <div className="fortune-0">
          <div className="ice-wrapper">
            <img
              src="/fortune/ice.png"
              alt="アイス"
              onClick={() => {
                setAnimation(1);
              }}
            />
            <img
              src="/fortune/ice.png"
              alt="アイス"
              onClick={() => {
                setAnimation(1);
              }}
            />
            <img
              src="/fortune/ice.png"
              alt="アイス"
              onClick={() => {
                setAnimation(1);
              }}
            />
          </div>
          <p>タップして選んでね</p>
        </div>
      )}
      {animation == 1 && (
        <div className="fortune-1">
          <img
            src="/fortune/eating_ice1.png"
            alt="食べかけのアイス"
            onClick={() => {
              setAnimation(2);
            }}
          />
          <p>タップしてね</p>
        </div>
      )}
      {animation == 2 && (
        <div className="fortune-2">
          <img
            src="/fortune/eating_ice2.png"
            alt="食べかけのアイス"
            onClick={() => {
              setAnimation(3);
            }}
          />
          <p>タップしてね</p>
        </div>
      )}
      {animation == 3 && (
        <div className="fortune-3">
          <img
            src="/fortune/eating_ice3.png"
            alt="食べかけのアイス"
            onClick={() => {
              setAnimation(4);
            }}
          />
          <p>タップしてね</p>
        </div>
      )}
      {(animation == 4 || animation == 5) && (
        <div className="fortune-4">
          <img
            src={`/fortune/result_${id}.png`}
            alt={`結果が書かれたアイスの棒 ${id}`}
            onClick={() => {
              setAnimation(5);
            }}
          />
          <p>タップしてね</p>
        </div>
      )}
      {animation == 5 && (
        <>
          <Overlay />
          <FortuneResult />
        </>
      )}
    </div>
  );
};

export default FortuneAnimation;
