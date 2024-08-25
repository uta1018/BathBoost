import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Context } from '../../providers/Provider';

const RoomID = () => {
  const { roomID } = useContext(Context);
  console.log("RoomID");

  return (
    <div className="roominfo-container">
      <div className="content">
        <div className="speech-bubble">
          <p>ルームIDは</p>
          <h1>{roomID}</h1>
          <p>です</p>
        </div>
        <p>友達にルームIDをシェアしよう！</p>
      {/* ルーム画面へのリンク */}
      <Link to="/room" className="room-link">OK</Link>
      </div>
      <div className="footer">
        <p>@ライラック</p>
      </div>
    </div>
  )
}

export default RoomID
