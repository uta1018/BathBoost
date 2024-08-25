import React, { useState } from "react";
import Overlay from "../common/Overlay";
import ChangeUserName from "./ChangeUserName";
import SelectIcon from "./SelectIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const Profile = ({
  changeLevelToggle,
  userName,
  icon,
  level,
  point,
  iconList,
  rooms
}) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showChangeUserName, setShowChangeUserName] = useState(false);
  const [showSelectIcon, setShowSelectIcon] = useState(false);

  console.log("Profile");

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

  const nextPoint = 3 * (level + 1) - point;

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
      {showSelectIcon && (
        <SelectIcon
          closeSelectIcon={closeSelectIcon}
          iconList={iconList}
          icon={icon}
          changeLevelToggle={changeLevelToggle}
          rooms={rooms}
        />
      )}
      {showChangeUserName && (
        <ChangeUserName
          closeChangeUserName={closeChangeUserName}
          changeLevelToggle={changeLevelToggle}
          userName={userName}
          rooms={rooms}
        />
      )}
    </div>
  );
};

export default Profile;
