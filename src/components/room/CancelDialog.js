import React from 'react'

const CancelDialog = ({closeCancelDialog}) => {
  // はいボタンを押したときの関数
  const handleCancel = () => {
    closeCancelDialog();
  };

  return (
    <div>
      <p>本当にやめますか？</p>
      <button onClick={closeCancelDialog}>いいえ</button>
      <button onClick={handleCancel}>はい</button>
    </div>
  )
}

export default CancelDialog
