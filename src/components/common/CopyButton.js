import React, { useState } from "react";

const CopyButton = ({ text }) => {
  // ボタンの表示テキストを管理する変数
  const [copyStatus, setCopyStatus] = useState("コピー");

  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // コピー成功時にボタンのテキストを変更
        setCopyStatus("コピー完了");
        // 3秒後に元のテキストに戻す
        setTimeout(() => setCopyStatus("コピー"), 3000);
      })
      .catch((err) => {
        console.error("コピーに失敗しました:", err);
      });
  };

  return <button onClick={handleCopy} className="copy-button">{copyStatus}</button>;
};

export default CopyButton;
