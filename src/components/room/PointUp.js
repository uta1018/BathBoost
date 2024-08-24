import React from "react";

const PointUp = ({ nextPoint, point, closePointUp, removeOverlay }) => {
  console.log("ポイントUPポップアップ");

  return (
    <div className="popup-content">
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
      <button
        onClick={() => {
          closePointUp();
          removeOverlay();
        }}
      >
        OK
      </button>
    </div>
  );
};

export default PointUp;
