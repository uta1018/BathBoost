import React, { useState } from "react";
import PopupHeader from "../common/PopupHeader";

const Tutorial = ({ closeHelp, showCloseButton = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // チュートリアルページを要素として定義
  const pages = [
    <div>
      <div>ルームを作ってルームIDを友達にシェアしよう！</div>
      <div>ホームのルーム作成ボタンを押すと新しいルームを作れるよ</div>
    </div>,
    <div>
      <div>2ページ目</div>
    </div>,
    <div>
      <div>3ページ目</div>
    </div>,
    <div>
      <div>4ページ目</div>
    </div>,
    <div>
      <div>5ページ目</div>
    </div>,
  ];

  const handleNext = () => {
    if (currentIndex < pages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="tutorial-popup">
      <PopupHeader title={`使い方 (${currentIndex + 1}/${pages.length})`} />

      {/* 現在のページを表示 */}
      {pages[currentIndex]}

      <div className="tutorial-popup-controls">
        <button onClick={handlePrev} disabled={currentIndex === 0}>
          &lt;
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === pages.length - 1}
        >
          &gt;
        </button>
      </div>

      {/* ボタンを押したときチュートリアルを閉じる */}
      {showCloseButton && <button onClick={closeHelp}>とじる</button>}
    </div>
  );
};

export default Tutorial;
