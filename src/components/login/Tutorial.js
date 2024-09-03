import React, { useState } from "react";
import PopupHeader from "../common/PopupHeader";

const Tutorial = ({ closeHelp, showCloseButton = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTab, setCurrentTab] = useState(0);

  // チュートリアルページ
  const pages = [
    // ホーム
    [
      <div>
        <div>ホームのルーム作成ボタンを押すと新しいルームを作れるよ</div>
        <div>ルームを作って、ルームIDを友達にシェアしよう</div>
      </div>,
      <div>
        <div>ルームIDを伝えれば、友達もあなたが作ったルームに入れるよ</div>
        <div>
          ホームのルーム検索ボタンに、シェアしたルームIDを入れてもらおう
        </div>
      </div>,
      <div>
        <div>一度入室したルームは、ホームに表示されるようになるよ</div>
        <div>ルームボタンをタップして入室しよう</div>
      </div>,
    ],
    // ルーム
    [
      <div>
        <div>4ページ目 - グループ2</div>
      </div>,
      <div>
        <div>5ページ目 - グループ2</div>
      </div>,
      <div>
        <div>6ページ目 - グループ2</div>
      </div>,
    ],
    // おふろポイント
    [
      <div>
        <div>7ページ目 - グループ3</div>
      </div>,
      <div>
        <div>8ページ目 - グループ3</div>
      </div>,
      <div>
        <div>9ページ目 - グループ3</div>
      </div>,
    ],
    // せってい
    [
      <div>
        <div>10ページ目 - グループ4</div>
      </div>,
      <div>
        <div>11ページ目 - グループ4</div>
      </div>,
      <div>
        <div>12ページ目 - グループ4</div>
      </div>,
    ],
  ];

  const handleNext = () => {
    if (currentIndex < pages[currentTab].length - 1) {
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
      setCurrentIndex(pages[currentTab].length - 1);
    }
  };

  const handleTabClick = (tabIndex) => {
    setCurrentTab(tabIndex);
    setCurrentIndex(0); // タブを切り替えたらそのタブの最初のページに移動
  };

  // classNameの適用を条件付きで行う
  const tutorialContent = showCloseButton ? "popup-content" : "";

  return (
    <div className={tutorialContent}>
      <PopupHeader title={`使い方`}/>
      {/* タブの切り替え */}
      <div className="tab-buttons">
        <button onClick={() => handleTabClick(0)}>ホーム</button>
        <button onClick={() => handleTabClick(1)}>ルーム</button>
        <button onClick={() => handleTabClick(2)}>おふろポイント</button>
        <button onClick={() => handleTabClick(3)}>せってい</button>
      </div>
      {/* 現在のページを表示 */}
      {pages[currentTab][currentIndex]}
      ページ ({currentIndex + 1}/{pages[currentTab].length})
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
