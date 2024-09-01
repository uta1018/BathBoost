import React, { useState } from "react";
import PageSubheading from "../common/PageSubheading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const Tutorial = ({ closeHelp, showCloseButton = false, currentPage }) => {
  const initialTab =
    {
      home: 0,
      room: 1,
      setting: 3,
    }[currentPage] || 0;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTab, setCurrentTab] = useState(initialTab);

  // チュートリアルページ
  const pages = [
    // ホーム
    [
      <div className="content">
        <p>
          ホームのルーム作成ボタンを押すと,
          <br />
          新しいルームを作れるよ
        </p>
        <img src="/tutorial/home/1.png" alt="" />
        <p>
          ルームを作って、
          <br />
          ルームIDを友達にシェアしよう!
        </p>
      </div>,
      <div className="content">
        <p>
          ルームIDを伝えれば、
          <br />
          友達もあなたが作ったルームに入れるよ
        </p>
        <img src="/tutorial/home/2.png" alt="" />
        <p>
          ホームのルーム検索ボタンに、
          <br />
          シェアしたルームIDを入れてもらおう!
        </p>
      </div>,
      <div className="content">
        <p>
          一度入室したルームは、
          <br />
          ホームに表示されるようになるよ
        </p>
        <img src="/tutorial/home/3.png" alt="" />
        <p>ルームボタンをタップして入室しよう!</p>
      </div>,
    ],
    // ルーム
    [
      <div className="content">
        <p>
          ルームでは、
          <br />
          おふろに関するやりとりができるよ
        </p>
        <img src="/tutorial/room1/1.png" alt="" />
        <p>
          ルーム名を押すと、
          <br />
          ルームIDやルームメンバーが確認できるよ
        </p>
      </div>,
      <div className="content">
        <p>
          おふろに入る時間を決めたら、
          <br />
          おふろ宣言をしよう!
        </p>
        <img src="/tutorial/room1/2.png" alt="" />
        <p>
          せんげんボタンを押して、
          <br />
          スタンプと目標時間を決めてね
        </p>
      </div>,
      <div className="content">
        <p>
          いざおふろに入るときは、
          <br />
          ルームで伝えよう!
        </p>
        <img src="/tutorial/room1/3.png" alt="" />
        <p>
          おふろボタンで、
          <br />
          おふろに入ることを伝えられるよ
        </p>
      </div>,
      <div className="content">
        <p>
          おふろから上がったら、
          <br />
          ルームで報告しよう!
        </p>
        <img src="/tutorial/room1/4.png" alt="" />
        <p>
          せいこうボタンで、
          <br />
          おふろに入れたことを報告できるよ
        </p>
      </div>,
      <div className="content">
        <p>
          もしおふろ宣言を取り消したかったら、
          <br />
          やめるボタンを押してね
        </p>
        <img src="/tutorial/room1/5.png" alt="" />
        <p>宣言がキャンセルされるよ</p>
      </div>,
    ],
    // おふろポイント
    [
      <div className="content">
        <p>
          おふろポイントは、
          <br />
          おふろに入れたらもらえるポイントだよ
        </p>
        <img src="/tutorial/room2/1.png" alt="" />
        <p>
          目標時間より早く入れたら+3pt、
          <br />
          目標時刻を過ぎて入っても+1ptもらえるよ
        </p>
        <p>
          ただし、やめるボタンでキャンセルすると、
          <br />
          -1ptになってしまうので注意!
        </p>
      </div>,
      <div className="content">
        <p>
          おふろポイントをためると、
          <br />
          おふろレベルが上がるよ
        </p>
        <img src="/tutorial/room2/2.png" alt="" />
        <p>
          おふろレベルが上がると、
          <br />
          新しいスタンプやアイコン、テーマカラーが
          <br />
          もらえるかも…!
        </p>
      </div>,
    ],
    // せってい
    [
      <div className="content">
        <p>
          せってい画面では、
          <br />
          ユーザーネームやルームネームが変更できるよ
        </p>
        <p>えんぴつマークを押して、変更してみよう!</p>
      </div>,
      <div className="content">
        <p>
          アイコンやテーマカラーも、
          <br />
          せってい画面で変更できるよ
        </p>
        <p>自分の好みにカスタマイズしよう!</p>
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

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  // 選択されたタブにクラスを動的に適用
  const getTabClass = (index) => {
    return index === currentTab && "active-tab";
  };

  // ページインジケーターのクラスを動的に適用
  const getIndicatorClass = (index) =>
    index === currentIndex ? "indicator active" : "indicator";

  // classNameの適用を条件付きで行う
  const tutorialContent = showCloseButton
    ? "tutorial-container tutorial-popup"
    : "tutorial-container tutorial-not-popup";

  return (
    <div className={tutorialContent}>
      {!showCloseButton && (
        <div className='page-subheading-container'>使い方</div>
      )}
      {/* タブの切り替え */}
      <div className="tub-wrapper">
        <button className={getTabClass(0)} onClick={() => handleTabClick(0)}>
          ホーム
        </button>
        <button className={getTabClass(1)} onClick={() => handleTabClick(1)}>
          ルーム1
        </button>
        <button className={getTabClass(2)} onClick={() => handleTabClick(2)}>
          ルーム2
        </button>
        <button className={getTabClass(3)} onClick={() => handleTabClick(3)}>
          せってい
        </button>
      </div>
      {/* 現在のページを表示 */}
      {pages[currentTab][currentIndex]}

      {showCloseButton ? (
        <div className="indicator-wrapper">
          {pages[currentTab].map((_, index) => (
            <span
              key={index}
              className={getIndicatorClass(index)}
              onClick={() => handleIndicatorClick(index)}
            ></span>
          ))}
        </div>
      ) : (
        <p>
          ページ ({currentIndex + 1}/{pages[currentTab].length})
        </p>
      )}
      <button onClick={handlePrev} className="angle angle-left">
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <button onClick={handleNext} className="angle angle-right">
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
      {/* ボタンを押したときチュートリアルを閉じる */}
      {showCloseButton && (
        <button className="close-button" onClick={closeHelp}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      )}
    </div>
  );
};

export default Tutorial;
