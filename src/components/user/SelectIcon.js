import React, { useContext, useState } from "react";
import PopupHeader from "../common/PopupHeader";
import { Context } from "../../providers/Provider";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const SelectIcon = ({
  closeSelectIcon,
  iconList = [],
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

  // ロックされたアイコンの数を計算
  const lockedIconCount = 9 - iconList.length;

  return (
    <div className="popup-content-h320 select-icon-container">
      <PopupHeader title="アイコンの変更" />
      <div className="flex-box">
        <h3>アイコンを選択してください</h3>
        <div className="scroll-box">
          <div className="icon-wrapper">
            {iconList.map((i, index) => {
              return (
                <img
                  className={`icon ${
                    selectedIcon === i ? "selected-icon" : ""
                  }`}
                  key={index}
                  src={i}
                  alt="アイコン"
                  onClick={() => setSelectedIcon(i)}
                />
              );
            })}
            {Array.from({ length: lockedIconCount }, (_, i) => (
              <div key={`locked-${i}`} className="icon locked-icon">
                <FontAwesomeIcon icon={faLock} />
              </div>
            ))}
          </div>
        </div>
        <div className="button-wrapper">
          <button
            className="button button-w140 cancel-button"
            onClick={closeSelectIcon}
          >
            キャンセル
          </button>
          <button
            className="button button-w140 ok-button-main"
            onClick={changeIcon}
          >
            変更
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectIcon;
