import React, { useState } from "react";
import Tutorial from "../login/Tutorial";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import Overlay from "./Overlay";

const Help = ({ currentPage }) => {
  // チュートリアルポップアップの表示を管理する変数
  const [showTutorial, setShowTutorial] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const openHelp = () => {
    setShowTutorial(true);
    setShowOverlay(true);
  };

  const closeHelp = () => {
    setShowTutorial(false);
    setShowOverlay(false);
  };

  return (
    <div className="help-container">
      <div onClick={openHelp} className="icon-wrapper">
        <FontAwesomeIcon icon={faCircleQuestion} />
      </div>
      {showTutorial ? (
        <Tutorial
          closeHelp={closeHelp}
          showCloseButton={true}
          currentPage={currentPage}
        />
      ) : (
        <></>
      )}
      {showOverlay && <Overlay />}
    </div>
  );
};

export default Help;
