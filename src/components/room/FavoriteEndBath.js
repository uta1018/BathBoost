import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartsolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import Overlay from "../common/Overlay";

const FavoriteEndBath = ({ post, userID }) => {
  // いいね表示する関数
  const [isFavorite, setIsFavorite] = useState(
    post.favoriteUser ? post.favoriteUser.includes(userID) : 0
  );
  const [showFavoriteUsers, setShowFavoriteUsers] = useState(false);
  const [favoriteUser, setFavoriteUser] = useState(post.favoriteUser || []);
  const [favoriteUserDetails, setFavoriteUserDetails] = useState([]);

  const onClickFavorite = async () => {
    let newFavoriteUser;
    if (isFavorite) {
      newFavoriteUser = favoriteUser.filter((favUser) => favUser !== userID);
    } else {
      newFavoriteUser = [...favoriteUser, userID];
    }
    setFavoriteUser(newFavoriteUser);
    setIsFavorite(!isFavorite);

    try {
      const postDocRef = doc(db, "posts", post.id); // "posts"はコレクション名、post.idはドキュメントID
      await updateDoc(postDocRef, { favoriteUser: newFavoriteUser });
    } catch (error) {
      console.error("Failed to update favorites in Firestore: ", error);
    }
  };

  //favoriteUserに含まれているIDからuser情報を取り出す
  useEffect(() => {}, [showFavoriteUsers]);

  const onClickNumber = () => {
    const fetchUserDetails = async () => {
      const userDetails = await Promise.all(
        favoriteUser.map(async (id) => {
          const userDoc = await getDoc(doc(db, "user", id));
          return userDoc.exists() ? { userID: id, ...userDoc.data() } : null; // idが存在したらuser情報をreturnする
        })
      );
      setFavoriteUserDetails(userDetails.filter(Boolean));
    };

    fetchUserDetails();

    // いいねしたユーザーをポップアップ表示
    setShowFavoriteUsers(true);
  };

  return (
    <>
      <div className="favorite-container">
        <FontAwesomeIcon
          onClick={onClickFavorite}
          icon={isFavorite ? faHeartsolid : faHeartRegular}
          className={isFavorite ? "active-icon favorite-icon" : "favorite-icon"}
          style={{ cursor: "pointer" }}
        />
        {favoriteUser.length > 0 && (
          <span onClick={onClickNumber}>{favoriteUser.length}</span>
        )}{" "}
      </div>
      {/* ポップアップでユーザーリストを表示 */}
      {showFavoriteUsers && (
        <>
          <Overlay />
          <div className="favorite-users-container">
            <div className="header">
              <h3>いいねしたユーザー</h3>
            </div>
            <div className="member-wrapper">
              {favoriteUserDetails.map((user) => (
                <div className="user-wrapper" key={user.userID}>
                  <img src={user.icon} alt="" width="40px" />
                  <p>{user.userName}</p>
                </div>
              ))}
            </div>
            <button
              className="button cancel-button button-w280"
              onClick={() => setShowFavoriteUsers(false)}
            >
              とじる
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default FavoriteEndBath;
