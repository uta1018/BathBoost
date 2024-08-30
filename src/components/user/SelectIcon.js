import React, { useContext, useState } from "react";
import PopupHeader from "../common/PopupHeader";
import { Context } from "../../providers/Provider";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const SelectIcon = ({
  closeSelectIcon,
  iconList,
  icon,
  changeLevelToggle,
  rooms,
}) => {
  const { userID } = useContext(Context);
  // 選択されたアイコンを保存する変数
  const [selectedIcon, setSelectedIcon] = useState(icon);

  console.log("アイコン変更");

  // 変更ボタンを押したときの関数
  const changeIcon = async () => {
    closeSelectIcon();

    // userドキュメントを更新
    const userDocRef = doc(db, "user", userID);
    await updateDoc(userDocRef, {
      icon: selectedIcon,
    });

    // ユーザーが所属するルームのアイコンも更新
    const updatePromises = rooms.map(async (roomID) => {
      const roomRef = doc(db, "rooms", roomID);
      const roomDocSnap = await getDoc(roomRef);
      const roomData = roomDocSnap.data();

      // ルームのメンバー情報を更新
      const updatedMembers = roomData.member.map((member) =>
        member.userID === userID ? { ...member, icon: selectedIcon } : member
      );

      return updateDoc(roomRef, {
        member: updatedMembers,
      });
    });

    await Promise.all(updatePromises);

    changeLevelToggle();
  };

  return (
    <div className="popup-content">
      <PopupHeader title="アイコンの変更" />
      <p>アイコンを選択してください</p>
      <div>
        {iconList.map((i, index) => {
          return (
            <img
              key={index}
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
