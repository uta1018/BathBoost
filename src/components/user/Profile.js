import React, { useState } from "react";
import Overlay from "../common/Overlay";
import ChangeUserName from "./ChangeUserName";
import SelectIcon from "./SelectIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const Profile = ({ userName, icon, level, point, iconList }) => {
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

  const nextPoint = 2 * (level + 1) - point;

  return (
    <div>
      <div onClick={openSelectIcon}>
        <img src={icon} alt="アイコン" width="80px" />
        <button>アイコン変更</button>
      </div>
      <div onClick={openChangeUserName}>
        <p>ユーザーネーム変更</p>
        <h3>
          {userName}
          <FontAwesomeIcon icon={faPen} />
        </h3>
      </div>
      <p>おふろレベル Lv.{level}</p>
      <p>つぎのレベルまで{nextPoint}pt</p>
      {showOverlay && <Overlay />}
      {showChangeUserName && (
        <ChangeUserName closeChangeUserName={closeChangeUserName} />
      )}
      {showSelectIcon && <SelectIcon closeSelectIcon={closeSelectIcon} />}
    </div>
  );
};

export default Profile;
