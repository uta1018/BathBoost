import React from "react";

const SelectStamp = ({ lastPostType, closeSelectStamp }) => {
  const handleSubmit = () => {
    if (lastPostType === "setBathGoal") {
    } else if (lastPostType === "startBath") {
    } else if (lastPostType === "endBath") {
    }
  };

  return (
    <div>
      <button onClick={closeSelectStamp}>とじる</button>
      <button onClick={handleSubmit}>決定</button>
      {/* スタンプ選択する部分 */}
    </div>
  );
};

export default SelectStamp;
