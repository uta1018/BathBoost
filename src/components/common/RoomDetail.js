import React from "react";

const RoomDetail = ({
  closeRoomDetail,
  id,
  roomName,
  member,
  author,
  date,
}) => {
  return (
    <div>
      <p>Room Name: {roomName}</p>
      <p>Room ID: {id}</p>
      <div>
        <p>メンバー:</p>
        {member.map((user, index) => (
          <span key={user.userID}>
            <img src={user.icon} alt="" />
            {user.userName}
            {index < member.length - 1 && ", "}
          </span>
        ))}
      </div>
      <p>作成日: {date}</p>
      <p>作成者: {author.userName}</p>
      <button onClick={closeRoomDetail}>とじる</button>
    </div>
  );
};

export default RoomDetail;
