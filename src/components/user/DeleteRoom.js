import React, { useContext } from "react";
import PopupHeader from "../common/PopupHeader";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../firebase";

const DeleteRoom = ({ closeDeleteRoom, roomData, changeLevelToggle }) => {
  const handleDelete = async () => {
    closeDeleteRoom();
    const roomID = roomData.id;

    // Firebaseのバッチ処理を開始
    const batch = writeBatch(db);
    // 1. ルームデータの削除
    const roomRef = doc(db, "rooms", roomID);
    batch.delete(roomRef);

    // 2. 関連ポストの削除
    const postsQuery = query(
      collection(db, "posts"),
      where("roomid", "==", roomID)
    );
    const postsSnapshot = await getDocs(postsQuery);
    postsSnapshot.forEach((postDoc) => {
      batch.delete(postDoc.ref);
    });

    // 3. ユーザーのrooms配列の更新
    const memberIDs = roomData.member.map((member) => member.userID);
    for (const memberID of memberIDs) {
      const userRef = doc(db, "user", memberID);
      const userDocSnap = await getDoc(userRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const updatedRooms = userData.rooms.filter((id) => id !== roomID);
        batch.update(userRef, { rooms: updatedRooms });
      }
    }

    // すべての操作をコミット
    await batch.commit();
    changeLevelToggle();
  };

  return (
    <div className="popup-content">
      <PopupHeader title="ルーム削除の確認" />
      <h3>このルームを削除しますか？</h3>
      <p>元に戻すことはできません</p>
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
      <button onClick={closeDeleteRoom}>いいえ</button>
      <button onClick={handleDelete}>はい</button>
    </div>
  );
};

export default DeleteRoom;
