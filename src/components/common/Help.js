import React, { useState } from "react";
import Tutorial from "../login/Tutorial";

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
    <div>
      <button onClick={openHelp}>Help</button>
      {showTutorial ? <Tutorial closeHelp={closeHelp} showCloseButton={true} /> : <></>}
    </div>
  );
};

export default Help;
