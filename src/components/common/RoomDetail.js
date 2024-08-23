import React from "react";

const RoomDetail = ({ closeRoomDetail, id, roomName }) => {
  return (
    <div>
      <p>Room Name: {roomName}</p>
      <p>Room ID: {id}</p>
      <button onClick={closeRoomDetail}>とじる</button>
    </div>
  );
};

export default RoomDetail;
