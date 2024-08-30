import React, { useState } from "react";
import PopupHeader from "../common/PopupHeader";

const Tutorial = ({ closeHelp, showCloseButton = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // チュートリアルページを要素として定義
  const pages = [
    <div>
      <div>1ページ目</div>
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
    } else {
      // 最後のページから最初のページへ移動
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      // 最初のページから最後のページへ移動
      setCurrentIndex(pages.length - 1);
    }
  };

  // classNameの適用を条件付きで行う
  const tutorialContent = showCloseButton ? "popup-content" : "";

  return (
    <div className={tutorialContent}>
      <PopupHeader title={`使い方 (${currentIndex + 1}/${pages.length})`} />

      {/* 現在のページを表示 */}
      {pages[currentIndex]}

      <div>
        <button onClick={handlePrev}>&lt;</button>
        <button onClick={handleNext}>&gt;</button>
      </div>

      {/* ボタンを押したときチュートリアルを閉じる */}
      {showCloseButton && <button onClick={closeHelp}>とじる</button>}
    </div>
  );
};

export default Tutorial;
