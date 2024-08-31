import React, { memo, useContext, useEffect, useState } from "react";
import { Context } from "../../providers/Provider";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { themeContext } from "../../providers/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const SelectColor = memo(({ themeColor, themeColorList = [] }) => {
  const { userID } = useContext(Context);
  const setThemeColor = useContext(themeContext);
  // 選択されたアイコンを保存する変数
  const [selectedColor, setSelectedColor] = useState(themeColor);

  console.log("SelectColor");

  useEffect(() => {
    setSelectedColor(themeColor);
  }, [themeColor]);

  // 選択したときの関数
  const changeColor = async (color) => {
    setSelectedColor(color);
    setThemeColor(color);
    localStorage.setItem("themeColor", color);

    // userドキュメントを更新
    const userDocRef = doc(db, "user", userID);
    await updateDoc(userDocRef, {
      themeColor: color,
    });
  };

  // ロックされたテーマカラーの数を計算
  const lockedColorCount = 3 - themeColorList.length;

  return (
    <div className="select-color-container">
      {themeColorList &&
        themeColorList.map((color, index) => {
          return (
            <div
              className={`${
                selectedColor === color ? "selected-color-wrapper" : ""
              }`}
            >
              <img
                key={index}
                src={`/themeColor/${color}.png`}
                alt="テーマカラー"
                onClick={() => changeColor(color)}
                className={`color ${
                  selectedColor === color ? "selected-color" : ""
                }`}
              />
              {selectedColor === color && (
                <div className="selected-text">
                  <p>選択中</p>
                </div>
              )}
            </div>
          );
        })}
      {Array.from({ length: lockedColorCount }, (_, i) => (
        <div key={`locked-${i}`} className="color locked-color">
          <FontAwesomeIcon icon={faLock} />
        </div>
      ))}
    </div>
  );
});

export default SelectColor;
