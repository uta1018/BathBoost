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
import { Link, useNavigate } from "react-router-dom";
import StartBath from "./StartBath";
import SetBathGoal from "./SetBathGoal";
import EndBath from "./EndBath";
import CancelBath from "./CancelBath";
import "./css/Room.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

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
  const { roomID, setRoomID, setIsAuth } = useContext(Context);
  // ルーム情報を保存する配列を宣言
  const [roomData, setRoomData] = useState(null);
  // ポスト情報を保存する配列を宣言
  const [postList, setPostList] = useState([]);
  // ルームのユーザーの情報を保存する配列を宣言
  const [userList, setUserList] = useState([]);
  // 現在のユーザーIDを保存する変数を宣言
  const [currentUser, setCurrentUser] = useState(null);
  // 現在のユーザーによる最後のポストの種類を保存する変数を宣言
  const [lastPostType, setLastPostType] = useState("");

  const navigate = useNavigate();

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

  // roomIDが変わったときに実行
  useEffect(() => {
    // 現在のルームIDを取得
    const currentRoomID = roomID || localStorage.getItem("roomID");
    setRoomID(currentRoomID);
    if (!currentRoomID) return;

    // ルーム情報を取得する関数
    const getRoom = async () => {
      const roomDocRef = doc(db, "rooms", currentRoomID);
      const roomDocSnap = await getDoc(roomDocRef);
      const roomData = { id: currentRoomID, ...roomDocSnap.data() };
      setRoomData(roomData);
    };

    getRoom();

    // 指定されたルームIDに関連するポストをリアルタイムで取得し、ポストリストを更新する関数
    const getPostsRealtime = () => {
      const postsQuery = query(
        collection(db, "posts"),
        where("roomid", "==", currentRoomID)
      );

      const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            // console.log(change.doc.data());
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

  // roomDataかpostListが変わったときに実行
  useEffect(() => {
    // roomDataのメンバーリストを使用して、各メンバーのユーザー情報を取得する関数
    const getUsers = async () => {
      if (!roomData?.member) return;

      const userDocs = await Promise.all(
        roomData.member.map(async (userID) => {
          const userDocRef = doc(db, "user", userID);
          const userDocSnap = await getDoc(userDocRef);
          return { id: userDocSnap.id, ...userDocSnap.data() };
        })
      );
      setUserList(userDocs);
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        getUsers();
      }
    });

    return () => unsubscribe();
  }, [roomData, postList]);

  // postListかcurrentUserが変わったときに実行
  useEffect(() => {
    if (postList.length > 0 && currentUser) {
      // 自分の投稿だけをフィルタリング
      const userPosts = postList.filter(
        (post) => post.author === currentUser.uid
      );

      // 最新の投稿を取得（postListが昇順なので、最後の投稿が最新）
      if (userPosts.length > 0) {
        const latestPost = userPosts[userPosts.length - 1];
        setLastPostType(latestPost.type); // 最後の投稿の type を取得
      } else {
        setLastPostType("");
      }
    }
  }, [postList, currentUser]);

  // 読み込み時に実行
  useEffect(() => {
    // ログインしていなかったらログイン画面へ
    setIsAuth(localStorage.getItem("isAuth"));
    if (!localStorage.getItem("isAuth")) {
      navigate("/login");
    }
  }, []);

  const roomName = roomData ? roomData.roomName : "";
  const userlevel =
    currentUser && userList.length > 0
      ? "Level" + userList.find((user) => user.id === currentUser.uid)?.level
      : "";

  return (
    <div className="roomContainer">
      <header>
        <Link to="/">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <p className="roomName">{roomName}</p>
        <p className="roomID">id:{roomID}</p>
        {/* <p className="userLevel">{userlevel}</p> */}
      </header>
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
              className={`post_${currentUser.uid === post.author ? "r" : "l"}`}
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

      {/* 最後のポストの種類によって表示するボタンを変える */}
      <div className="menu">
        {lastPostType === "setBathGoal" ? (
          <>
            <StartBath />
            <CancelBath />
          </>
        ) : (
          ""
        )}
        {lastPostType === "startBath" ? (
          <>
            <EndBath />
            <CancelBath />
          </>
        ) : (
          ""
        )}
        {lastPostType === "" ||
        lastPostType === "endBath" ||
        lastPostType === "cancelBath" ? (
          <>
            <SetBathGoal />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Room;
