import { useNavigate } from "react-router-dom";

const FortuneResult = ({ id }) => {
  const navigate = useNavigate();
  const resultCount = 5;
  const resultMarks = ["◎", "○", "△", "×"];

  const probabilities = new Map([
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
      <div>結果: {results.join(", ")}</div>
      <button onClick={() => navigate("/fortune", { replace: true })}>
        もどる
      </button>
    </div>
  );
};

export default FortuneResult;
