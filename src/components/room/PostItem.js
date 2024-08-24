import React, { memo, useContext } from "react";
import { Context } from "../../providers/Provider";

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

const PostItem = memo(({ post, userList }) => {
  const { userID } = useContext(Context);

  console.log(post.id);

  const authorUser = userList.find((user) => user.id === post.author);
  const authorName = authorUser ? authorUser.username : "Unknown User";
  const authorLevel = authorUser ? "Level " + authorUser.level : "";
  const goalTime = post.goalTime
    ? `${formatHHMMforTimeStamp(post.goalTime)}`
    : "";

  return (
    // ポストの投稿者が自分かそれ以外かでクラスを変える
    <div className={`post_${userID === post.author ? "r" : "l"}`}>
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
              src="/startBathStamp/1.png"
              alt="入浴"
              width="200px"
              height="200px"
            />
          ) : (
            ""
          )}
          {post.type === "cancelBath" ? (
            <img
              src="/cancelStamp/1.png"
              alt="お風呂キャンセル"
              width="200px"
              height="200px"
            />
          ) : (
            ""
          )}
          {post.type === "endBath" ? (
            <img
              src="/EndBathStamp/1.png"
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
                src="/setBathGoalStamp/1.png"
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
});

export default PostItem;
