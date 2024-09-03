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
        <div>ルームでは、おふろに関するやりとりができるよ</div>
        <div>ルーム名を押すとルームIDやルームメンバーが確認できるよ</div>
        <div>ルームIDをシェアしてルームメンバーを集めよう</div>
      </div>,
      <div>
        <div>おふろに入る時間を決めたら、ルームでおふろ宣言をしよう</div>
        <div>
          ルームのせんげんボタンを押すと、目標時刻を設定しておふろ宣言ができるよ
        </div>
      </div>,
      <div>
        <div>いざおふろに入るときは、ルームで伝えよう</div>
        <div>
          ルームのおふろボタンでスタンプを選んで、おふろに入ることを伝えられるよ
        </div>
      </div>,
      <div>
        <div>おふろから上がったら、ルームで報告しよう</div>
        <div>
          ルームのせいこうボタンでスタンプを選んで、おふろに入れたことを報告できるよ
        </div>
      </div>,
      <div>
        <div>
          もし、おふろ宣言の後におふろに入れなかったら、ルームのやめるボタンを押そう
        </div>
        <div>宣言がキャンセルされるよ</div>
      </div>,
    ],
    // おふろポイント
    [
      <div>
        <div>
          おふろポイントは、ちゃんとおふろに入れたらもらえるポイントだよ
        </div>
        <div>
          おふろ宣言の目標時刻より早く入れたら+3pt、目標時刻を過ぎて入っても+1ptもらえるよ
        </div>
        <div>
          ただし、やめるボタンで宣言をキャンセルすると-1ptになってしまうので注意！
        </div>
      </div>,
      <div>
        <div>おふろポイントをためると、おふろレベルが上がるよ</div>
        <div>
          おふろレベルを上げると新しいスタンプやアイコン、テーマカラーがもらえるかも
        </div>
      </div>,
    ],
    // せってい
    [
      <div>
        <div>せってい画面では、ユーザーネームやルームネームが変更できるよ</div>
        <div>それぞれのネームをタップして変更してみよう</div>
      </div>,
      <div>
        <div>アイコンやテーマカラーもせってい画面で変更できるよ</div>
        <div>自分の好みにカスタマイズしよう</div>
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
      <PopupHeader title={`使い方`} />
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
