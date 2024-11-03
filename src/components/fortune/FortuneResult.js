import { useParams, useNavigate } from "react-router-dom";

const FortuneResult = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div>
      <h2>Fortune Result {id}</h2>
      <button onClick={() => navigate("/fortune")}>戻る</button>
    </div>
  );
};

export default FortuneResult;
