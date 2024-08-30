import React, { memo, useContext, useEffect, useState } from "react";
import { Context } from "../../providers/Provider";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const SelectColor = memo(({ themeColor, themeColorList }) => {
  const { userID } = useContext(Context);
  // 選択されたアイコンを保存する変数
  const [selectedColor, setSelectedColor] = useState(themeColor);

  console.log("SelectColor");

  useEffect(() => {
    setSelectedColor(themeColor);
  }, [themeColor]);

  // 選択したときの関数
  const changeColor = async (color) => {
    setSelectedColor(color);

    // userドキュメントを更新
    const userDocRef = doc(db, "user", userID);
    await updateDoc(userDocRef, {
      theme: selectedColor,
    });
  };

  return (
    <div>
      {themeColorList &&
        themeColorList.map((color, index) => {
          return (
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
          );
        })}
    </div>
  );
});

export default SelectColor;
