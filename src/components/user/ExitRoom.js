import React, { useContext } from "react";
import PopupHeader from "../common/PopupHeader";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import { db } from "../../firebase";
import { Context } from "../../providers/Provider";

const ExitRoom = ({ closeExitRoom, roomData, changeLevelToggle }) => {
  const { userID } = useContext(Context);
  console.log("退出ポップアップ");

  const handleExit = async () => {
    closeExitRoom();
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
      const updatedMembers = roomData.member.filter(
        (member) => member.userID !== userID
      );

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
    <div className="popup-content">
      <PopupHeader title="ルーム退出の確認" />
      <h3>このルームから退出しますか？</h3>
      <div>
        {roomData.roomName}
        <div>
          メンバー:{" "}
          {(() => {
            const membersText = roomData.member
              .map((member) => member.userName)
              .join("、");
            return membersText.length > 13
              ? `${membersText.slice(0, 13)}…(${roomData.member.length})`
              : `${membersText} (${roomData.member.length})`;
          })()}
        </div>
      </div>
      <button onClick={closeExitRoom}>いいえ</button>
      <button onClick={handleExit}>はい</button>
    </div>
  );
};

export default ExitRoom;
