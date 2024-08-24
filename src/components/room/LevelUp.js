import React from "react";

const LevelUp = ({ nextPoint, point, closeLevelUp }) => {


  return (
    <div>
      {point > 0 ? (
        <div>
          <p>おふろレベルUP</p>
        </div>
      ) : (
        <div>
          <p>おふろレベルDOWN</p>
        </div>
      )}
      {/* レベル表示（DBに問い合わせ） */}
      {/* 報酬表示（DB更新処理） */}
      <p>つぎのレベルまであと{nextPoint}pt</p>
      <button onClick={closeLevelUp}>OK</button>
    </div>
  );
};

export default LevelUp;
