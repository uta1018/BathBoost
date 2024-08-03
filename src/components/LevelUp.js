import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./css/LevelUp.css";

const LevelUp = () => {
  const location = useLocation();
  const { state } = location;

  const { currentLevel, newLevel, point } = state;

  return (
    <div className="levelUpContainer">
      <div className="header">
        <div className="logo-box">
          <img src="/logo.png" className="logoImg"></img>
          <div className="logo">BATH BOOST</div>
        </div>
      </div>

      <div className="text">
        {currentLevel < newLevel ? (
          <div>
            <h3>Level up!</h3>
            <h3>おめでとう！！</h3>
            <img src="/LevelUp.png" alt="レベルアップ" />
          </div>
        ) : (
          <div>
            <h3>お風呂レベルが下がっちゃった…</h3>
            <h3>また頑張ろう…！</h3>
            <img src="/LevelDown.png" alt="レベルダウン" />
          </div>
        )}

        <h3 className="level">
          レベル{currentLevel} → レベル{newLevel}
        </h3>
        <div className="point">
          <p>現在のポイント: {point}pt</p>
          <p>次のレベルまで: {2 * (newLevel + 1) - point}pt</p>
        </div>
        <div className="pointList">
          <p>目標時間までにお風呂に入る　+3pt</p>
          <p>遅れたけどお風呂に入る　+1pt</p>
          <p>お風呂キャンセル　-1pt</p>
        </div>
        <Link to="/room" className="room">ルームへ戻る</Link>
      </div>
      <div className="footer">
        <h2>@ライラック</h2>
      </div>
    </div>
  );
};

export default LevelUp;
