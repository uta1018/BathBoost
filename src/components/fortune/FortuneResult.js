import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const FortuneResult = () => {
  const [animation, setAnimation] = useState(0);
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
      {animation == 0 && (
        <div>
          <img
            src="/fortune/ice.png"
            alt="アイス"
            width={100}
            onClick={() => {
              setAnimation(1);
            }}
          />
          <img
            src="/fortune/ice.png"
            alt="アイス"
            width={100}
            onClick={() => {
              setAnimation(1);
            }}
          />
          <img
            src="/fortune/ice.png"
            alt="アイス"
            width={100}
            onClick={() => {
              setAnimation(1);
            }}
          />
          <p>タップして選んでね</p>
        </div>
      )}
      {animation == 1 && (
        <div>
          <img
            src="/fortune/eating_ice1.png"
            alt="食べかけのアイス"
            width={300}
            onClick={() => {
              setAnimation(2);
            }}
          />
          <p>タップしてね</p>
        </div>
      )}
      {animation == 2 && (
        <div>
          <img
            src="/fortune/eating_ice2.png"
            alt="食べかけのアイス"
            width={300}
            onClick={() => {
              setAnimation(3);
            }}
          />
          <p>タップしてね</p>
        </div>
      )}
      {animation == 3 && (
        <div>
          <img
            src="/fortune/eating_ice3.png"
            alt="食べかけのアイス"
            width={300}
            onClick={() => {
              setAnimation(4);
            }}
          />
          <p>タップしてね</p>
        </div>
      )}
      {animation == 4 && id == 1 && (
        <div>
          <img
            src="/fortune/result_1.png"
            alt="大吉のアイスの棒"
            width={300}
            onClick={() => {
              setAnimation(5);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default FortuneResult;
