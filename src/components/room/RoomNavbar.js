import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CancelDialog from "./CancelDialog";
import SelectStamp from "./SelectStamp";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

const RoomNavbar = ({ lastPostType }) => {
  const [showSelectStamp, setShowSelectStamp] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showPointUp, setShowPointUp] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);

  const navigate = useNavigate();
  console.log("RoomNavbar");
  console.log(lastPostType);

  const openSelectStamp = () => {
    setShowSelectStamp(true);
  };

  const closeSelectStamp = () => {
    setShowSelectStamp(false);
  };

  const openCancelDialog= () => {
    setShowCancelDialog(true);
  };

  const closeCancelDialog = () => {
    setShowCancelDialog(false);
  };

  return (
    <div>
      <button onClick={() => navigate("/")}>もどる</button>
      {/* 最後のポストの種類によって表示するボタンを変える */}
      <div className="menu">
        {lastPostType === "setBathGoal" && (
          <>
            <button onClick={openSelectStamp}>おふろ</button>
            <button onClick={openCancelDialog}>やめる</button>
          </>
        )}
        {lastPostType === "startBath" && (
          <>
            <button onClick={openSelectStamp}>せいこう</button>
            <button onClick={openCancelDialog}>やめる</button>
          </>
        )}
        {(lastPostType === null ||
          lastPostType === "endBath" ||
          lastPostType === "cancelBath") && (
          <>
            <button onClick={openSelectStamp}>せんげん</button>
          </>
        )}
      </div>
      {showCancelDialog && <CancelDialog closeCancelDialog={closeCancelDialog}/>}
      {showSelectStamp && <SelectStamp closeSelectStamp={closeSelectStamp} lastPostType={lastPostType}/>}
    </div>
  );
};

export default RoomNavbar;
