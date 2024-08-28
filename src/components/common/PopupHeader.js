import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

// ポップアップのタイトルを受け取って表示
const PopupHeader = ({ title }) => {
  return (
    <div>
      <FontAwesomeIcon icon={faPaw} />
      {title}
    </div>
  );
};

export default PopupHeader;
