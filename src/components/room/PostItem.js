import React, { memo, useContext, useState } from "react";
import { Context } from "../../providers/Provider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartsolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

// 時間表示を○○：○○にする関数
const formatHHMM = (time) => {
  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes.toString().padStart(2, "0")}`;
};

// 日付表示を○○/○○日にする関数
const formatDate = (time) => {
  const date = new Date(time);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${month}/${day}`;
};

const formatHHMMforTimeStamp = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes.toString().padStart(2, "0")}`;
};

// いいね表示する関数
const FavoriteEndBath = ({ userID, post, initialFavorites }) => {
  const [favorites, setFavorites] = useState(initialFavorites);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFavoriteUsers, setShowFavoriteUsers] = useState(false);
  const [favoriteUser, setFavoriteUser] = useState(post.favoriteUser);
  
  const onClickFavorite = () => {
    // if (userID === post.author) return;
    if (isFavorite) {
      setFavorites(favorites - 1);
    } else {
      setFavorites(favorites + 1);
    }
    setIsFavorite(!isFavorite);
    setFavoriteUser(...favoriteUser, userID);
  };

  const onClickNumber = () => {
    // いいねしたユーザーをポップアップ表示
    setShowFavoriteUsers(!showFavoriteUsers);
  };

  return (
    <div className="favorite-container" onClick={onClickFavorite}>
      <FontAwesomeIcon
        icon={isFavorite ? faHeartsolid : faHeartRegular}
        color={isFavorite ? "var(--red)" : "var(--gray-300)"}
        style={{ cursor: "pointer" }}
      />
      {favorites > 0 && <span onClick={onClickNumber}>{favorites}</span>}{" "}
      {/* いいねの数が1以上のとき表示 */}
      {/* ポップアップでユーザーリストを表示 */}
      {showFavoriteUsers && (
        <div className="favorite-users-popup">
          {post.favoriteUser.map((user) => (
            <div key={user.userID}>
              <img src={user.icon} alt="" width="40px" />
              <p>{user.userName}</p>
            </div>
          ))}
          <button onClick={() => setShowFavoriteUsers(false)}>閉じる</button>
        </div>
      )}
    </div>
  );
};

const PostItem = memo(({ post, authorUser, previousPostDate }) => {
  const { userID } = useContext(Context);

  console.log(post.id);

  // 現在のポストの日付
  const currentDate = new Date(post.date).setHours(0, 0, 0, 0);
  // 前のポストの日付と比較し、異なる場合に日付を表示
  const shouldShowDate = previousPostDate !== currentDate;

  const authorName = authorUser && authorUser.userName;
  const authorIcon = authorUser && authorUser.icon;
  const authorLevel = authorUser && authorUser.level;
  const goalTime = post.goalTime
    ? `${formatHHMMforTimeStamp(post.goalTime)}`
    : "";

  return (
    <div className="post-item-container">
      {/* 日付表示 */}
      {shouldShowDate && <div className="date">{formatDate(post.date)}</div>}

      {/* ポストの投稿者が自分かそれ以外かでクラスを変える */}
      <div
        className={`post-wrapper post-${userID === post.author ? "r" : "l"}`}
      >
        <div className="icon">
          <img src={authorIcon} alt="アイコン" />
          <p>
            <span>Lv. </span>
            {authorLevel}
          </p>
        </div>
        <div className="stamp-wrapper">
          <p>{authorName}</p>
          {post.type === "setBathGoal" ? (
            <div className="stamp-set-bath-goal">
              <h3 className="goalTime">{goalTime}</h3>
              <img src={post.stamp} alt="スタンプ" />
            </div>
          ) : post.type === "endBath" ? (
            <div className="stamp">
              <img src={post.stamp} />
              {/* いいね表示 */}
              <FavoriteEndBath
                userID={userID}
                post={post}
                initialFavorites={0} //post.favoriteにしたい
              />
            </div>
          ) : (
            <div className="stamp">
              <img src={post.stamp} />
            </div>
          )}
        </div>
        <p className="time-stamp">{formatHHMM(post.date)}</p>
      </div>
    </div>
  );
});

export default PostItem;
