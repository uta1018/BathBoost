import React from "react";
import CopyButton from "./CopyButton";
import PopupHeader from "./PopupHeader";
import Subheading from "./Subheading";

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
            {index < member.length - 1 && ", "}
          </span>
        ))}
      </div>
      <Subheading title="インフォメーション" />
      <p>作成日: {date}</p>
      <p>作成者: {author.userName}</p>
      <button onClick={closeRoomDetail}>とじる</button>
    </div>
  );
};

export default RoomDetail;
