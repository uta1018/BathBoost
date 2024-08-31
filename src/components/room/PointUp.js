import React from "react";
import PopupHeader from "../common/PopupHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const PointUp = ({ nextPoint, point, closePointUp, removeOverlay }) => {
  console.log("ポイントUPポップアップ");

  return (
    <div className="point-up-container">
      <PopupHeader title="おふろポイント" color="sub" />
      <div className="flex-box">
        {point > 0 ? (
          <>
            <h4>おふろポイントUP!</h4>
            <div className="point-wrapper">
              <FontAwesomeIcon icon={faPlus} />
              <h3>{point}pt</h3>
            </div>
            <img src="/pointUp/cat_nice.png" alt="すごい!!" />
          </>
        ) : (
          <>
            <h4>おふろポイントDOWN…</h4>
            <div className="point-wrapper">
              <FontAwesomeIcon icon={faMinus} />
              <h3>1pt</h3>
            </div>
            <img src="/pointUp/frog_sad.png" alt="残念…" />
          </>
        )}
        <p>つぎのレベルまであと{nextPoint}pt</p>
        <button
          className="button ok-button-sub button-w280"
          onClick={() => {
            closePointUp();
            removeOverlay();
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default PointUp;
