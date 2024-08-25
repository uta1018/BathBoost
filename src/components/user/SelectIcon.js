import React, { useContext, useState } from "react";
import PopupHeader from "../common/PopupHeader";
import { Context } from "../../providers/Provider";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const SelectIcon = ({ closeSelectIcon, iconList, icon, changeLevelToggle }) => {
  const { userID } = useContext(Context);
  // 選択されたアイコンを保存する変数
  const [selectedIcon, setSelectedIcon] = useState(icon);

  console.log("アイコン変更");

  // 変更ボタンを押したときの関数
  async function changeIcon() {
    closeSelectIcon();
    // userドキュメントを更新
    const userDocRef = doc(db, "user", userID);
    await updateDoc(userDocRef, {
      icon: selectedIcon,
    });

    changeLevelToggle();
  }

  return (
    <div className="popup-content">
      <PopupHeader title="アイコンの変更" />
      <p>アイコンを選択してください</p>
      <div>
        {iconList.map((i) => {
          return (
            <img
              src={i}
              alt="アイコン"
              onClick={() => setSelectedIcon(i)}
              style={{
                width: "40px",
                borderRadius: "100%",
                outlineOffset: "3px",
                outline: selectedIcon === i ? "3px solid #B9B9B9" : "",
              }}
            />
          );
        })}
      </div>

      <button onClick={closeSelectIcon}>キャンセル</button>
      <button onClick={changeIcon}>変更</button>
    </div>
  );
};

export default SelectIcon;
