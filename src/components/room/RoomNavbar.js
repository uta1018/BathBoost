import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CancelDialog from "./CancelDialog";
import SelectStamp from "./SelectStamp";
import SetBathGoal from "./SetBathGoal";
import LevelUp from "./LevelUp";
import PointUp from "./PointUp";

const RoomNavbar = ({ lastPostType }) => {
  const [showSelectStamp, setShowSelectStamp] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showSetBathGoal, setShowSetBathGoal] = useState(false);
  const [showPointUp, setShowPointUp] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [nextPoint, setNextPoint] = useState();
  const [point, setPoint] = useState();

  const navigate = useNavigate();
  console.log("RoomNavbar");

  const openSelectStamp = () => {
    setShowSelectStamp(true);
  };

  const closeSelectStamp = () => {
    setShowSelectStamp(false);
  };

  const openCancelDialog = () => {
    setShowCancelDialog(true);
  };

  const closeCancelDialog = () => {
    setShowCancelDialog(false);
  };

  const openSetBathGoal = () => {
    setShowSetBathGoal(true);
  };

  const closeSetBathGoal = () => {
    setShowSetBathGoal(false);
  };

  const openPointUp = () => {
    setShowPointUp(true);
  };

  const closePointUp = () => {
    setShowPointUp(false);
  };

  const openLevelUp = () => {
    setShowLevelUp(true);
  };

  const closeLevelUp = () => {
    setShowLevelUp(false);
  };

  const settingNextPoint = (point) => {
    setNextPoint(point);
  };

  const settingPoint = (point) => {
    setPoint(point);
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
      {showCancelDialog && (
        <CancelDialog
          closeCancelDialog={closeCancelDialog}
          openPointUp={openPointUp}
          openLevelUp={openLevelUp}
          settingNextPoint={settingNextPoint}
          settingPoint={settingPoint}
        />
      )}
      {showSelectStamp && (
        <SelectStamp
          closeSelectStamp={closeSelectStamp}
          lastPostType={lastPostType}
          openSetBathGoal={openSetBathGoal}
          openPointUp={openPointUp}
          openLevelUp={openLevelUp}
          settingNextPoint={settingNextPoint}
          settingPoint={settingPoint}
        />
      )}
      {showSetBathGoal && (
        <SetBathGoal
          closeSetBathGoal={closeSetBathGoal}
          closeSelectStamp={closeSelectStamp}
        />
      )}
      {showPointUp && <PointUp nextPoint={nextPoint} point={point} closePointUp={closePointUp}/>}
      {showLevelUp && <LevelUp nextPoint={nextPoint} point={point} closeLevelUp={closeLevelUp} />}
    </div>
  );
};

export default RoomNavbar;
