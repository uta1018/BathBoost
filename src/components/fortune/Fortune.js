import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../common/PageHeader";
import Navbar from "../common/Navbar";

const Fortune = () => {
  const fortuneResultCount = 5;
  const [showChoices, setShowChoices] = useState(false);
  const navigate = useNavigate();

  const handleShowChoices = () => {
    setShowChoices((prev) => !prev);
  };

  const handleRandomNavigate = () => {
    // 0 から 4 までのランダムな整数
    const randomId = Math.floor(Math.random() * fortuneResultCount);
    navigate(`/fortune/${randomId}`, { state: { isAuthorized: true } });
  };

  return (
    <div>
      <PageHeader title="うらない" />
      <div style={{ position: "relative", top: "100px" }}>
        {!showChoices ? (
          // 最初のボタン
          <button onClick={handleShowChoices}>交換する</button>
        ) : (
          // 追加の3つのボタンと戻るボタン
          <div>
            <button onClick={handleShowChoices}>戻る</button>
            <div>
              <button onClick={handleRandomNavigate}>ボタン1</button>
              <button onClick={handleRandomNavigate}>ボタン2</button>
              <button onClick={handleRandomNavigate}>ボタン3</button>
            </div>
          </div>
        )}
      </div>
      <Navbar currentPage="fortune" />
    </div>
  );
};

export default Fortune;
