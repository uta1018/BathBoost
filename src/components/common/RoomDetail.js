import React from "react";
import CopyButton from "./CopyButton";
import PopupHeader from "./PopupHeader";
import Subheading from "./Subheading";

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
  return (
    <div className="popup-content">
      <PopupHeader title={`${roomName}(${member.length})`} />
      <Subheading title="ルームID" />
      <p>{id}</p>
      <p>
        ルームIDを共有しよう！ <CopyButton text={id} />
      </p>
      <div>
        <Subheading title="メンバー" />
        {member.map((user, index) => (
          <span key={user.userID}>
            <img src={user.icon} alt="" width="40px" />
            {user.userName}
          </span>
        ))}
      </div>
      <Subheading title="インフォメーション" />
      {/* <p>作成日: {date}</p> */}
      <p>作成日: {formatDate(date)}</p>
      <p>作成者: {author.userName}</p>
      <button onClick={closeRoomDetail}>とじる</button>
    </div>
  );
};

export default RoomDetail;
