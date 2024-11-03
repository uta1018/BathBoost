import { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const FortuneResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    // ボタン操作以外でのアクセス（stateが空の場合）はホームにリダイレクト
    if (!location.state || !location.state.isAuthorized) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div>
      <h2>Fortune Result {id}</h2>
      <button onClick={() => navigate("/fortune")}>戻る</button>
    </div>
  );
};

export default FortuneResult;
