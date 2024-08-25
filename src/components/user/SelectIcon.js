import React from "react";

const SelectIcon = ({ closeSelectIcon }) => {
  return (
    <div className="popup-content">
      アイコンの変更
      <button onClick={closeSelectIcon}>キャンセル</button>
    </div>
  );
};

export default SelectIcon;
