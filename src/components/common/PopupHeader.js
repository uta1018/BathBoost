import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

// ポップアップのタイトルを受け取って表示
const PopupHeader = ({ title }) => {
  return (
    <div className="popup-header-container popup-header-main">
      <FontAwesomeIcon icon={faPaw} />
      <p>{title}</p>
    </div>
  );
};

export default PopupHeader;
