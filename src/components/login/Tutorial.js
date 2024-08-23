import React from 'react'

const Tutorial = ({closeHelp, showCloseButton=false}) => {
  return (
    <div>
      Tutorial
      {/* ボタンを押したときチュートリアルを閉じる */}
      {showCloseButton &&<button onClick={closeHelp}>閉じる</button>}
    </div>
  )
}

export default Tutorial
