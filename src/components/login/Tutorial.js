import React, { useState } from "react";
import PopupHeader from "../common/PopupHeader";

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
      <div>
        <p>ホームのルーム作成ボタンを押すと新しいルームを作れるよ</p>
        <p>ルームを作って、ルームIDを友達にシェアしよう</p>
      </div>,
      <div>
        <p>ルームIDを伝えれば、友達もあなたが作ったルームに入れるよ</p>
        <p>
          ホームのルーム検索ボタンに、シェアしたルームIDを入れてもらおう
        </p>
      </div>,
      <div>
        <p>一度入室したルームは、ホームに表示されるようになるよ</p>
        <p>ルームボタンをタップして入室しよう</p>
      </div>,
    ],
    // ルーム
    [
      <div>
        <p>ルームでは、おふろに関するやりとりができるよ</p>
        <p>ルーム名を押すとルームIDやルームメンバーが確認できるよ</p>
        <p>ルームIDをシェアしてルームメンバーを集めよう</p>
      </div>,
      <div>
        <p>おふろに入る時間を決めたら、ルームでおふろ宣言をしよう</p>
        <p>
          ルームのせんげんボタンを押すと、目標時刻を設定しておふろ宣言ができるよ
        </p>
      </div>,
      <div>
        <p>いざおふろに入るときは、ルームで伝えよう</p>
        <p>
          ルームのおふろボタンでスタンプを選んで、おふろに入ることを伝えられるよ
        </p>
      </div>,
      <div>
        <p>おふろから上がったら、ルームで報告しよう</p>
        <p>
          ルームのせいこうボタンでスタンプを選んで、おふろに入れたことを報告できるよ
        </p>
      </div>,
      <div>
        <p>
          もし、おふろ宣言の後におふろに入れなかったら、ルームのやめるボタンを押そう
        </p>
        <p>宣言がキャンセルされるよ</p>
      </div>,
    ],
    // おふろポイント
    [
      <div>
        <p>
          おふろポイントは、ちゃんとおふろに入れたらもらえるポイントだよ
        </p>
        <p>
          おふろ宣言の目標時刻より早く入れたら+3pt、目標時刻を過ぎて入っても+1ptもらえるよ
        </p>
        <p>
          ただし、やめるボタンで宣言をキャンセルすると-1ptになってしまうので注意!
        </p>
      </div>,
      <div>
        <p>おふろポイントをためると、おふろレベルが上がるよ</p>
        <p>
          おふろレベルを上げると新しいスタンプやアイコン、テーマカラーがもらえるかも
        </p>
      </div>,
    ],
    // せってい
    [
      <div>
        <p>せってい画面では、ユーザーネームやルームネームが変更できるよ</p>
        <p>それぞれのネームをタップして変更してみよう</p>
      </div>,
      <div>
        <p>アイコンやテーマカラーもせってい画面で変更できるよ</p>
        <p>自分の好みにカスタマイズしよう</p>
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
  const tutorialContent = showCloseButton ? "tutorial-container tutorial-popup" : "tutorial-container";

  return (
    <div className={tutorialContent}>
       {showCloseButton && <PopupHeader title={`使い方`} />}
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
