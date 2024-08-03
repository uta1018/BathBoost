import React, { useContext, useEffect, useState } from "react";
import { Context } from "../providers/Provider";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import SelectRoom from "./SelectRoom";
import { Link } from "react-router-dom";

const Room = () => {
  const { roomID, setRoomID } = useContext(Context);
  const [roomData, setRoomData] = useState();
  const [postList, setPostList] = useState([]);

  const addPostList = (id, data) => {
    const newPost = {
      id: id,
      ...data,
    };
    setPostList((prev) => [...prev, newPost]);
  };

  useEffect(() => {
    const currentRoomID = roomID || localStorage.getItem("roomID");
    setRoomID(currentRoomID);
    if (!currentRoomID) return;

    const getRoom = async () => {
      const roomDocRef = doc(db, "rooms", currentRoomID);
      const roomDocSnap = await getDoc(roomDocRef);
      const roomData = { id: currentRoomID, ...roomDocSnap.data() };
      setRoomData(roomData);
    };

    getRoom();

    const getPostsRealtime = () => {
      const postsQuery = query(
        collection(db, "posts"),
        where("roomid", "==", currentRoomID)
      );

      const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            console.log(change.doc.data());
            addPostList(change.doc.id, change.doc.data());

            // 画面最下部へスクロール
            const doc = document.documentElement;
            window.setTimeout(
              () => window.scroll(0, doc.scrollHeight - doc.clientHeight),
              100
            );
          }
        });
      });

      return unsubscribe;
    };

    const unsubscribePosts = getPostsRealtime();

    return () => {
      unsubscribePosts();
    };
  }, [roomID]);

  if (!roomData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header>
        <Link to="/">ホームに戻る</Link>
        {roomData.roomName}
      </header>
      <div>
        {postList.map((post) => (
          <div
            // className={`balloon_${userName === item.name ? 'r' : 'l'}`}
            key={post.key}
          >
            {/* {userName === item.name ? `[${formatHHMM(item.date)}]` : ''} */}
            <div>アイコン</div>
            <div>{post.author}</div>
            {/* {auth.currentUser.uid === post.author ? '' : `[${formatHHMM(item.date)}]`} */}
          </div>
        ))}
      </div>
      {/* <div>
      <div>アイコン</div>
      <div></div>
    </div> */}
    </div>
  );
};

export default Room;
