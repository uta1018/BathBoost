import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Context } from '../providers/Provider';

const RoomInfo = () => {
  const { roomID } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("isAuth")) {
      navigate("/login");
    }
  }, []);

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
