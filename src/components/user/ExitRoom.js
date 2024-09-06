import React, { useContext } from "react";
import PopupHeader from "../common/PopupHeader";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import { db } from "../../firebase";
import { Context } from "../../providers/Provider";

const ExitRoom = ({ closeExitRoom, roomData, changeLevelToggle }) => {
  const { userID, setRoomID } = useContext(Context);
  console.log("退出ポップアップ");

  const handleExit = async () => {
    closeExitRoom();
    localStorage.removeItem("roomID");
    setRoomID(null);
    const roomID = roomData.id;

    // Firebaseのバッチ処理を開始
    const batch = writeBatch(db);
    // 1. ユーザーのrooms配列を更新
    const userRef = doc(db, "user", userID);
    const userDocSnap = await getDoc(userRef);
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const updatedRooms = userData.rooms.filter((id) => id !== roomID);
      batch.update(userRef, { rooms: updatedRooms });
    }

    // 2. ルームのメンバー情報を更新
    const roomRef = doc(db, "rooms", roomID);
    const roomDocSnap = await getDoc(roomRef);
    if (roomDocSnap.exists()) {
      const roomData = roomDocSnap.data();
      const updatedMembers = roomData.member.map((member) => {
        if (member.userID === userID) {
          return {
            ...member, // 元のメンバー情報を保持
            exit: true, // exitプロパティをtrueに設定
          };
        }
        return member; // それ以外のメンバーはそのまま
      });

      // // メンバーが空の場合はルーム自体を削除
      // if (updatedMembers.length === 0) {
      //   batch.delete(roomRef);
      //   // 関連ポストの削除
      //   const postsQuery = query(
      //     collection(db, "posts"),
      //     where("roomid", "==", roomID)
      //   );
      //   const postsSnapshot = await getDocs(postsQuery);
      //   postsSnapshot.forEach((postDoc) => {
      //     batch.delete(postDoc.ref);
      //   });
      // }

      batch.update(roomRef, { member: updatedMembers });
    }

    // バッチ操作をコミット
    await batch.commit();
    changeLevelToggle();
  };

  return (
    <div className="popup-content-h320 room-info-container">
      <PopupHeader title="ルーム退出の確認" />
      <div className="flex-box">
        <h3>このルームから退出しますか？</h3>
        <div className="room-info-wrapper">
          <h3>{roomData.roomName}</h3>
          <p>
            メンバー:{" "}
            {(() => {
              const activeMemberCount = roomData.member.filter(
                (user) => !user.exit
              ).length;
              const membersText = roomData.member
                .filter((user) => !user.exit)
                .map((member) => member.userName)
                .join("、");
              return membersText.length > 13
                ? `${membersText.slice(0, 13)}…(${activeMemberCount})`
                : `${membersText} (${activeMemberCount})`;
            })()}
          </p>
        </div>
        <div className="button-wrapper">
          <button
            className="button button-w140 cancel-button"
            onClick={closeExitRoom}
          >
            いいえ
          </button>
          <button
            className="button button-w140 ok-button-main"
            onClick={handleExit}
          >
            はい
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitRoom;
