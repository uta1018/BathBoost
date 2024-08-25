import React, { memo, useContext } from "react";
import { Context } from "../../providers/Provider";

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

const PostItem = memo(({ post, authorUser, previousPostDate }) => {
  const { userID } = useContext(Context);

  console.log(post.id);

  // 現在のポストの日付
  const currentDate = new Date(post.date).setHours(0, 0, 0, 0);
  // 前のポストの日付と比較し、異なる場合に日付を表示
  const shouldShowDate = previousPostDate !== currentDate;

  const authorName = authorUser && authorUser.userName;
  const authorIcon = authorUser && authorUser.icon;
  const authorLevel = authorUser && "Level " + authorUser.level;
  const goalTime = post.goalTime
    ? `${formatHHMMforTimeStamp(post.goalTime)}`
    : "";

  return (
    <>
      {/* 日付表示 */}
      {shouldShowDate && <div className="date">{formatDate(post.date)}</div>}

      {/* ポストの投稿者が自分かそれ以外かでクラスを変える */}
      <div className={`post_${userID === post.author ? "r" : "l"}`}>
        <div className="post">
          <div className="user">
            <div className="userIcon">
              <img src={authorIcon} alt="アイコン" width="40px" />
              <p>{authorName}</p>
            </div>
            <p className="userLevel">{authorLevel}</p>
          </div>
          <div className="stamp">
            {post.type === "setBathGoal" && (
              <div>
                <h3 className="goalTime">{goalTime}</h3>
                <img
                  src={post.stamp}
                  alt="スタンプ"
                  width="200px"
                  height="100%"
                />
              </div>
            )}
            {post.type !== "setBathGoal" && (
              <div>
                <img
                  src={post.stamp}
                  alt="スタンプ"
                  width="200px"
                  height="100%"
                />
              </div>
            )}
            <p className="timeStamp">{formatHHMM(post.date)}</p>
          </div>
        </div>
      </div>
    </>
  );
});

export default PostItem;
