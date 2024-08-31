import React, { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import CancelDialog from "./CancelDialog";
import SelectStamp from "./SelectStamp";
import SetBathGoal from "./SetBathGoal";
import LevelUp from "./LevelUp";
import PointUp from "./PointUp";
import Overlay from "../common/Overlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBath,
  faBullhorn,
  faFaceSmile,
} from "@fortawesome/free-solid-svg-icons";

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
    changeLevelToggle();
    setShowLevelUp(false);
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
    <div className="room-navbar-container">
      <div className="flex-box">
        <button className="button back-button" onClick={() => navigate("/")}>
          もどる
        </button>
        {/* 最後のポストの種類によって表示するボタンを変える */}
        <div className="room-button-wrapper">
          {lastPostType === "setBathGoal" && (
            <>
              <button
                className="room-button room-button-start-bath"
                onClick={openSelectStamp}
              >
                <FontAwesomeIcon icon={faBath} />
                おふろ
              </button>
              <button
                className="room-button room-button-cancel"
                onClick={() => {
                  openCancelDialog();
                  applyOverlay();
                }}
              >
                やめる
              </button>
            </>
          )}
          {lastPostType === "startBath" && (
            <>
              <button
                className="room-button room-button-end-bath"
                onClick={openSelectStamp}
              >
                <FontAwesomeIcon icon={faFaceSmile} />
                せいこう
              </button>
              <button
                className="room-button room-button-cancel"
                onClick={() => {
                  openCancelDialog();
                  applyOverlay();
                }}
              >
                やめる
              </button>
            </>
          )}
          {(!lastPostType ||
            lastPostType === "endBath" ||
            lastPostType === "cancelBath") && (
            <>
              <button
                className="room-button room-button-set-bath-goal"
                onClick={openSelectStamp}
              >
                <FontAwesomeIcon icon={faBullhorn} />
                せんげん
              </button>
            </>
          )}
        </div>
      </div>
      {showOverlay && <Overlay />}
      {showCancelDialog && (
        <CancelDialog
          closeCancelDialog={closeCancelDialog}
          openPointUp={openPointUp}
          openLevelUp={openLevelUp}
          settingNextPoint={settingNextPoint}
          settingPoint={settingPoint}
          removeOverlay={removeOverlay}
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
          removeOverlay={removeOverlay}
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
