import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { Context } from '../providers/Provider';

const RoomInfo = () => {
  const { roomID } = useContext(Context);

  return (
    <div>
      <div>
        <p>ルームIDは{roomID}です</p>
      </div>
      <p>友達にルームIDをシェアしよう!</p>
      <Link to="/room">ルームへ</Link>
    </div>
  )
}

export default RoomInfo
