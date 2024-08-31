import React, { useContext, useState } from "react";
import PopupHeader from "../common/PopupHeader";
import { Context } from "../../providers/Provider";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const ChangeUserName = ({
  closeChangeUserName,
  changeLevelToggle,
  userName,
  rooms,
}) => {
  const { userID } = useContext(Context);
  // 入力されたユーザーネームを保存する変数
  const [inputUserName, setInputUserName] = useState("");
  // バリデーションのメッセージを管理する変数
  const [usernameError, setUsernameError] = useState({
    message: "※8文字まで入力することができます",
    color: "black",
  });

  // usename のバリデーション関数
  const validateUsername = (name) => {
    if (name.length < 1) {
      return { message: "名前を入力してください", color: "red" };
    } else if (1 <= name.length && name.length <= 8) {
      return { message: "※8文字まで入力することができます", color: "black" };
    } else if (8 < name.length) {
      return { message: "名前は8文字以内で入力してください", color: "red" };
    }
  };

  // username の入力変更時にバリデーションを実行
  const handleUsernameChange = (e) => {
    const name = e.target.value;
    setInputUserName(name);
    const error = validateUsername(name);
    setUsernameError(error);
  };

  // 変更ボタンを押したときの関数
  const changeUserName = async () => {
    closeChangeUserName();
    // userドキュメントを更新
    const userDocRef = doc(db, "user", userID);
    await updateDoc(userDocRef, {
      userName: inputUserName,
    });

    // ユーザーが所属するルームのアイコンも更新
    const updatePromises = rooms.map(async (roomID) => {
      const roomRef = doc(db, "rooms", roomID);
      const roomDocSnap = await getDoc(roomRef);
      const roomData = roomDocSnap.data();

      // ルームのメンバー情報を更新
      const updatedMembers = roomData.member.map((member) =>
        member.userID === userID
          ? { ...member, userName: inputUserName }
          : member
      );
      const updatedData = {
        member: updatedMembers,
      };

      // ルームのauthorもユーザーの場合の更新
      if (roomData.author.userID === userID) {
        updatedData.author = { ...roomData.author, userName: inputUserName };
      }

      // ルーム情報の更新
      return updateDoc(roomRef, updatedData);
    });

    await Promise.all(updatePromises);

    changeLevelToggle();
  };

  return (
    <div className="popup-content">
      <PopupHeader title="ユーザーネームの変更" />
      <p>新しい名前を入力してください</p>
      <input
        type="text"
        placeholder={userName}
        value={inputUserName}
        onChange={handleUsernameChange}
      />
      <p style={{ color: usernameError.color }}>{usernameError.message}</p>
      <button onClick={closeChangeUserName}>キャンセル</button>
      <button
        onClick={changeUserName}
        disabled={inputUserName.length < 1 || 8 < inputUserName.length}
      >
        変更
      </button>
    </div>
  );
};

export default ChangeUserName;
