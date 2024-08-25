import React, { useState } from "react";
import Overlay from "../common/Overlay";
import ChangeUserName from "./ChangeUserName";
import SelectIcon from "./SelectIcon";

const Profile = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showChangeUserName, setShowChangeUserName] = useState(false);
  const [showSelectIcon, setShowSelectIcon] = useState(false);

  console.log("Profile");

  const removeOverlay = () => {
    setShowOverlay(false);
  };

  const openChangeUserName = () => {
    setShowOverlay(true);
    setShowChangeUserName(true);
  };

  const closeChangeUserName = () => {
    setShowOverlay(false);
    setShowChangeUserName(false);
  };

  const openSelectIcon = () => {
    setShowOverlay(true);
    setShowSelectIcon(true);
  };

  const closeSelectIcon = () => {
    setShowOverlay(false);
    setShowSelectIcon(false);
  };

  return (
    <div>
      <button onClick={openSelectIcon}>アイコン変更</button>
      <button onClick={openChangeUserName}>ユーザーネーム変更</button>
      {showOverlay && <Overlay />}
      {showChangeUserName && (
        <ChangeUserName closeChangeUserName={closeChangeUserName} />
      )}
      {showSelectIcon && <SelectIcon closeSelectIcon={closeSelectIcon} />}
    </div>
  );
};

export default Profile;
