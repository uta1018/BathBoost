import React, { memo, useContext, useEffect, useState } from "react";
import { Context } from "../../providers/Provider";

const SelectColor = memo(({ themeColor, themeColorList }) => {
  const { userID } = useContext(Context);
  // 選択されたアイコンを保存する変数
  const [selectedColor, setSelectedColor] = useState(themeColor);

  console.log("SelectColor");

  useEffect(() => {
    setSelectedColor(themeColor);
  }, [themeColor]);

  return (
    <div>
      {themeColorList &&
        themeColorList.map((color, index) => {
          return (
            <img
              key={index}
              src={`/themeColor/${color}.png`}
              alt="テーマカラー"
              onClick={() => setSelectedColor(color)}
              style={{
                width: "40px",
                borderRadius: "100%",
                outlineOffset: "3px",
                outline: selectedColor === color ? "3px solid #B9B9B9" : "",
              }}
            />
          );
        })}
    </div>
  );
});

export default SelectColor;
