import { useState } from "react";
import PageHeader from "../common/PageHeader";
import Navbar from "../common/Navbar";

const Fortune = () => {
  const [showExtraButtons, setShowExtraButtons] = useState(false);

  const handleShowExtraButtons = () => {
    setShowExtraButtons(true);
  };

  const handleGoBack = () => {
    setShowExtraButtons(false);
  };

  return (
    <div>
      <PageHeader title="うらない" />
      <div style={{ position: "relative", top: "100px" }}>
        {!showExtraButtons ? (
          // 最初のボタン
          <button onClick={handleShowExtraButtons}>交換する</button>
        ) : (
          // 追加の3つのボタンと戻るボタン
          <div>
            <button onClick={handleGoBack}>戻る</button>
            <div>
              <button>ボタン1</button>
              <button>ボタン2</button>
              <button>ボタン3</button>
            </div>
          </div>
        )}
      </div>
      <Navbar currentPage="fortune" />
    </div>
  );
};

export default Fortune;
