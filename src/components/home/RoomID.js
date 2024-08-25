import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { Context } from '../../providers/Provider';

const RoomID = () => {
  const { roomID } = useContext(Context);
  console.log("RoomID");

  // ボタンの表示テキストを管理する変数
  const [copyStatus, setCopyStatus] = useState('コピー');

  // クリップボードにroomIDをコピーする関数
  const copyRoomID = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        // コピー成功時にボタンのテキストを変更
        setCopyStatus('コピー完了！');
        // 3秒後に元のテキストに戻す
        setTimeout(() => setCopyStatus('コピー'), 3000);
      })
      .catch(err => {
        console.error('コピーに失敗しました', err);
      });
  };

  return (
    <div className="roominfo-container">
      <div className="content">
        <div className="speech-bubble">
          <p>ルームIDは</p>
          <h1>
            {/* コピーボタン */}
            {roomID} <button onClick={() => copyRoomID(roomID)}>{copyStatus}</button>
          </h1>
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
