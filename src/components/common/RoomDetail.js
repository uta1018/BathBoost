import React from "react";
import CopyButton from "./CopyButton";
import PopupHeader from "./PopupHeader";
import Subheading from "./Subheading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

// タイムスタンプを日付に変換する関数
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}年${month}月${day}日`;
};

const RoomDetail = ({
  closeRoomDetail,
  id,
  roomName,
  member,
  author,
  date,
}) => {
  const activeMemberCount = member.filter((user) => !user.exit).length;

  return (
    <div className="room-detail-container">
      <div className="header">
        <FontAwesomeIcon icon={faPaw} />
        <h3>
          {roomName} ({activeMemberCount})
        </h3>
      </div>
      <div className="flex-box">
        <Subheading title="ルームID" />
        <div className="roomid-wrapper">
          <p>{id}</p>
        </div>
        <div className="text-wrapper">
          <p>ルームIDを共有しよう!</p>
          <CopyButton text={id} />
        </div>
        <Subheading title="メンバー" />
        <div className="member-wrapper">
          {member
            .filter((user) => !user.exit)
            .map((user) => (
              <div className="user-wrapper" key={user.userID}>
                <img src={user.icon} alt="" width="40px" />
                <p>{user.userName}</p>
              </div>
            ))}
        </div>
        <Subheading title="インフォメーション" />
        <div className="info-container">
          <div className="info-wrapper">
            <p>作成日</p>
            <p>{formatDate(date)}</p>
          </div>
          <div className="info-wrapper">
            <p>作成者</p>
            <p>{author.userName}</p>
          </div>
        </div>
      </div>
      <button
        className="button cancel-button button-w280"
        onClick={closeRoomDetail}
      >
        とじる
      </button>
    </div>
  );
};

export default RoomDetail;
