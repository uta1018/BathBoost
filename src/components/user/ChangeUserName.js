import React from 'react'

const ChangeUserName = ({closeChangeUserName}) => {
  return (
    <div className="popup-content">
      ユーザーネームの変更
      <button onClick={closeChangeUserName}>キャンセル</button>
    </div>
  )
}

export default ChangeUserName
