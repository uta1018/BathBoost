import React from "react";
import PopupHeader from "../common/PopupHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const PointUp = ({ nextPoint, point, closePointUp, removeOverlay }) => {
  console.log("ポイントUPポップアップ");

  return (
    <div className="popup-content">
      <PopupHeader title="おふろポイント" />
      {point > 0 ? (
        <div>
          <p>おふろポイントUP!</p>
          <p>
            <FontAwesomeIcon icon={faPlus} />
            {point}pt
          </p>
          <img src="/pointUp/cat_nice.png" alt="すごい!!" width="100px" />
        </div>
      ) : (
        <div>
          <p>おふろポイントDOWN</p>
          <p>
            <FontAwesomeIcon icon={faMinus} />
            1pt
          </p>
          <img src="/pointUp/frog_sad.png" alt="残念…" width="100px" />
        </div>
      )}
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
