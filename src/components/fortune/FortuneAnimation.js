import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import FortuneResult from "./FortuneResult";
import Overlay from "../common/Overlay";

const FortuneAnimation = () => {
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
          <FortuneResult id={id} />
        </>
      )}
    </div>
  );
};

export default FortuneAnimation;
