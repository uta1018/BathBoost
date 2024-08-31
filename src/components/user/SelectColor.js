import React, { memo, useContext, useEffect, useState } from "react";
import { Context } from "../../providers/Provider";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { themeContext } from "../../providers/Theme";

const SelectColor = memo(({ themeColor, themeColorList }) => {
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

  return (
    <div>
      <p style={{ color: "var(--main-300)" }}>てすと</p>
      {themeColorList &&
        themeColorList.map((color, index) => {
          return (
            <>
              <img
                key={index}
                src={`/themeColor/${color}.png`}
                alt="テーマカラー"
                onClick={() => changeColor(color)}
                style={{
                  width: "100px",
                  borderRadius: "20%",
                  outlineOffset: "1px",
                  outline: selectedColor === color ? "3px solid #B9B9B9" : "",
                }}
              />
              {selectedColor === color && <p>選択中</p>}
            </>
          );
        })}
    </div>
  );
});

export default SelectColor;
