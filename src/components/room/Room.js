import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../providers/Provider";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
// import "./css/Room.css";
import RoomNavbar from "./RoomNavbar";
import RoomDetail from "../common/RoomDetail";
import PostItem from "./PostItem";
import Overlay from "../common/Overlay";

const Room = () => {
  const { roomID, userID } = useContext(Context);
  // ルーム情報を保存する配列を宣言
  const [roomData, setRoomData] = useState(null);
  // ポスト情報を保存する配列を宣言
  const [postList, setPostList] = useState([]);
  // ルームのユーザーの情報を保存する配列を宣言
  const [userList, setUserList] = useState([]);
  // 現在のユーザーによる最後のポストの種類を保存する変数を宣言
  const [lastPostType, setLastPostType] = useState(null);
  const [showRoomDetail, setShowRoomDetail] = useState(false);
  // 自分のレベルが変わったときに感知して、自分のpostItemだけ読み直す
  const [changeLevel, setChangeLevel] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const navigate = useNavigate();
  console.log("Room");

  const openRoomDetail = () => {
    setShowRoomDetail(true);
    setShowOverlay(true);
  };

  const closeRoomDetail = () => {
    setShowRoomDetail(false);
    setShowOverlay(false);
  };

  const changeLevelToggle = () => {
    console.log("トグル");
    setChangeLevel((prevChangeLevel) => !prevChangeLevel);
  };

  // ポストリストにポストを追加する関数
  const addPostList = (id, data) => {
    const newPost = {
      id: id,
      ...data,
    };
    // ポストリストに、ポストを昇順に保存する
    setPostList((prev) =>
      [...prev, newPost].sort((a, b) => a.date.valueOf() - b.date.valueOf())
    );
  };

  // 読み込み時実行
  useEffect(() => {
    console.log("fetch");
    // ルーム情報とユーザー情報をセットする関数
    const fetchData = async () => {
      // ログインしていなかったらログイン画面へ
      if (!userID) {
        navigate("/login");
        return;
      } else if (!roomID) {
        navigate("/");
        return;
      }

      // ルーム情報を取得
      const roomDocRef = doc(db, "rooms", roomID);
      const roomDocSnap = await getDoc(roomDocRef);
      const roomData = { id: roomID, ...roomDocSnap.data() };
      setRoomData(roomData);

      // roomDataのメンバーリストを使用して、各メンバーのユーザー情報を取得
      const userDocs = await Promise.all(
        roomData.member.map(async (user) => {
          const userDocRef = doc(db, "user", user.userID);
          const userDocSnap = await getDoc(userDocRef);
          return { id: userDocSnap.id, ...userDocSnap.data() };
        })
      );
      setUserList(userDocs);
    };

    fetchData();

    // 指定されたルームIDに関連するポストをリアルタイムで取得し、ポストリストを更新する関数
    const getPostsRealtime = () => {
      const postsQuery = query(
        collection(db, "posts"),
        where("roomid", "==", roomID)
      );

      const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
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
  }, []);

  useEffect(() => {
    console.log("userData更新");
    const fetchOwnData = async () => {
      if (!userID) return;

      // 自分のユーザー情報を取得
      const userDocRef = doc(db, "user", userID);
      const userDocSnap = await getDoc(userDocRef);
      const ownUserData = { id: userDocSnap.id, ...userDocSnap.data() };

      // userListの自分の情報を更新
      setUserList((prevUserList) =>
        prevUserList.map((user) =>
          user.id === ownUserData.id ? ownUserData : user
        )
      );
    };

    fetchOwnData();
  }, [changeLevel]);

  // postListが変わったときに実行
  useEffect(() => {
    console.log("postList");
    if (postList.length > 0 && userID) {
      // 自分の投稿だけをフィルタリング
      const userPosts = postList.filter((post) => post.author === userID);

      // 最新の投稿を取得（postListが昇順なので、最後の投稿が最新）
      if (userPosts.length > 0) {
        const latestPost = userPosts[userPosts.length - 1];
        setLastPostType(latestPost.type); // 最後の投稿の type を取得
      } else {
        setLastPostType("");
      }
    }
  }, [postList]);

  const roomName = roomData ? roomData.roomName : "";

  return (
    <div className="roomContainer">
      <button onClick={openRoomDetail}>{roomName}</button>
      <div className="postContainer">
        {/* ポストリストの各ポストごとに描画 */}
        {postList.map((post) => {
          const authorUser = userList.find((user) => user.id === post.author);
          return <PostItem post={post} authorUser={authorUser} />;
        })}
      </div>
      <RoomNavbar
        lastPostType={lastPostType}
        changeLevelToggle={changeLevelToggle}
      />

      {showRoomDetail && (
        <RoomDetail closeRoomDetail={closeRoomDetail} {...roomData} />
      )}
      {showOverlay && <Overlay />}
    </div>
  );
};

export default Room;
