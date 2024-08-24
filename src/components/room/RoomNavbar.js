import React, { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import CancelDialog from "./CancelDialog";
import SelectStamp from "./SelectStamp";
import SetBathGoal from "./SetBathGoal";
import LevelUp from "./LevelUp";
import PointUp from "./PointUp";
import Overlay from "../common/Overlay";

const RoomNavbar = memo(({ lastPostType, changeLevelToggle }) => {
  const [showSelectStamp, setShowSelectStamp] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showSetBathGoal, setShowSetBathGoal] = useState(false);
  const [showPointUp, setShowPointUp] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [nextPoint, setNextPoint] = useState();
  const [point, setPoint] = useState();
  const [stamp, setStamp] = useState();
  const [showOverlay, setShowOverlay] = useState(false);

  const navigate = useNavigate();
  console.log("RoomNavbar");

  const openSelectStamp = useCallback(() => {
    setShowSelectStamp(true);
  }, []);

  const closeSelectStamp = useCallback(() => {
    setShowSelectStamp(false);
  }, []);

  const openCancelDialog = useCallback(() => {
    setShowCancelDialog(true);
  }, []);

  const closeCancelDialog = useCallback(() => {
    setShowCancelDialog(false);
  }, []);

  const openSetBathGoal = useCallback(() => {
    setShowSetBathGoal(true);
  }, []);

  const closeSetBathGoal = useCallback(() => {
    setShowSetBathGoal(false);
  }, []);

  const openPointUp = useCallback(() => {
    setShowPointUp(true);
  }, []);

  const closePointUp = useCallback(() => {
    setShowPointUp(false);
  }, []);

  const openLevelUp = useCallback(() => {
    setShowLevelUp(true);
  }, []);

  const closeLevelUp = useCallback(() => {
    setShowLevelUp(false);
    changeLevelToggle();
  }, []);

  const settingNextPoint = useCallback((point) => {
    setNextPoint(point);
  }, []);

  const settingPoint = useCallback((point) => {
    setPoint(point);
  }, []);

  const settingStamp = useCallback((stamp) => {
    setStamp(stamp);
  }, []);

  const applyOverlay = () => {
    setShowOverlay(true);
  };

  const removeOverlay = () => {
    setShowOverlay(false);
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
        {(!lastPostType ||
          lastPostType === "endBath" ||
          lastPostType === "cancelBath") && (
          <>
            <button onClick={openSelectStamp}>せんげん</button>
          </>
        )}
      </div>
      {showOverlay && <Overlay />}
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
          settingStamp={settingStamp}
          applyOverlay={applyOverlay}
        />
      )}
      {showSetBathGoal && (
        <SetBathGoal
          closeSetBathGoal={closeSetBathGoal}
          closeSelectStamp={closeSelectStamp}
          removeOverlay={removeOverlay}
          stamp={stamp}
        />
      )}
      {showPointUp && (
        <PointUp
          nextPoint={nextPoint}
          point={point}
          closePointUp={closePointUp}
        />
      )}
      {showLevelUp && (
        <LevelUp
          nextPoint={nextPoint}
          point={point}
          closeLevelUp={closeLevelUp}
        />
      )}
    </div>
  );
});

export default RoomNavbar;
