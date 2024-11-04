import { useNavigate } from "react-router-dom";

const FortuneResult = ({ id }) => {
  const navigate = useNavigate();
  const resultCount = 5;
  const resultMarks = ["◎", "○", "△", "×"];

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
    <div>
      <h2>うらない結果</h2>
      <div>お金: {results[0]}</div>
      <div>恋愛: {results[1]}</div>
      <div>仕事: {results[2]}</div>
      <div>健康: {results[3]}</div>
      <div>人間関係: {results[4]}</div>
      <button onClick={() => navigate("/fortune", { replace: true })}>
        もどる
      </button>
    </div>
  );
};

export default FortuneResult;
