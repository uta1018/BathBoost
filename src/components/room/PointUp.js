import React from "react";

const PointUp = ({ nextPoint, point, closePointUp }) => {
  console.log("ポイントUPポップアップ");

  return (
    <div>
      {point > 0 ? (
        <div>
          <p>おふろポイントUP</p>
        </div>
      ) : (
        <div>
          <p>おふろポイントDOWN</p>
        </div>
      )}
      <p>{point}pt</p>
      <p>つぎのレベルまであと{nextPoint}pt</p>
      <button onClick={closePointUp}>OK</button>
    </div>
  );
};

export default PointUp;
