import React, { useState } from "react";
import Tutorial from "../login/Tutorial";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

const Help = () => {
  // チュートリアルポップアップの表示を管理する変数
  const [showTutorial, setShowTutorial] = useState(false);

  const openHelp = () => {
    setShowTutorial(true);
  };

  const closeHelp = () => {
    setShowTutorial(false);
  };

  return (
    <div className="help-container">
      <div onClick={openHelp} className="icon-wrapper">
        <FontAwesomeIcon icon={faCircleQuestion} />
      </div>
      {showTutorial ? (
        <Tutorial closeHelp={closeHelp} showCloseButton={true} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Help;
