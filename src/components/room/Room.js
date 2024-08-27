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

// 時間表示を○○：○○にする関数
const formatHHMM = (time) => {
  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes.toString().padStart(2, "0")}`;
};

const formatHHMMforTimeStamp = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes.toString().padStart(2, "0")}`;
};

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

  const navigate = useNavigate();
  console.log("Room");

  const openRoomDetail = () => {
    setShowRoomDetail(true);
  };

  const closeRoomDetail = () => {
    setShowRoomDetail(false);
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
        roomData.member.map(async (userID) => {
          const userDocRef = doc(db, "user", userID);
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
          // console.log("Current User:", currentUser.uid);
          // console.log("Post Author:", post.author);
          const authorUser = userList.find((user) => user.id === post.author);
          const authorName = authorUser ? authorUser.username : "Unknown User";
          const authorLevel = authorUser ? "Level " + authorUser.level : "";
          const goalTime = post.goalTime
            ? `${formatHHMMforTimeStamp(post.goalTime)}`
            : "";

          return (
            // ポストの投稿者が自分かそれ以外かでクラスを変える
            <div
              className={`post_${userID === post.author ? "r" : "l"}`}
              key={post.id}
            >
              <div className="post">
                <div className="user">
                  <div className="userIcon">
                    <p>{authorName}</p>
                  </div>
                  <p className="userLevel">{authorLevel}</p>
                </div>
                {/* ポストの種類によってスタンプを変える */}
                <div className="stamp">
                  {post.type === "startBath" ? (
                    <img
                      src="/nyuyokutyu.png"
                      alt="入浴"
                      width="200px"
                      height="200px"
                    />
                  ) : (
                    ""
                  )}
                  {post.type === "cancelBath" ? (
                    <img
                      src="/cancel.png"
                      alt="お風呂キャンセル"
                      width="200px"
                      height="200px"
                    />
                  ) : (
                    ""
                  )}
                  {post.type === "endBath" ? (
                    <img
                      src="agatta.png"
                      alt="上がった!"
                      width="200px"
                      height="200px"
                    />
                  ) : (
                    ""
                  )}
                  {post.type === "setBathGoal" ? (
                    <div>
                      <h3 className="goalTime">{goalTime}</h3>
                      <img
                        src="setGoalTime.png"
                        alt="にお風呂に入る!"
                        width="200px"
                        height="200px"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <p className="timeStamp">{formatHHMM(post.date)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <RoomNavbar lastPostType={lastPostType} />

      {showRoomDetail && (
        <RoomDetail closeRoomDetail={closeRoomDetail} {...roomData} />
      )}
    </div>
  );
};

export default Room;
