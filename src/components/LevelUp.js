import React from "react";
import { Link, useLocation } from "react-router-dom";

const LevelUp = () => {
  const location = useLocation();
  const { state } = location;
  // const [level, setLevel] = useState();
  // const [point, setPoint] = useState();

  // useEffect(() => {
  //   const getUserData = async () => {
  //     if (!auth.currentUser) return;
  //     const userDocRef = doc(db, "user", auth.currentUser.uid);
  //     const userDocSnap = await getDoc(userDocRef);
  //     setLevel(userDocSnap.data().level);
  //     setPoint(userDocSnap.data().point);
  //   }

  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       getUserData();
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);
  const { currentLevel, newLevel, point } = state;

  return (
    <div>
      {currentLevel < newLevel ? (
        <div>
          <h3>お風呂レベルがアップしたよ</h3>
          <h3>おめでとう！！</h3>
        </div>
      ) : (
        <div>
          <h3>お風呂レベルが下がっちゃった…</h3>
          <h3>また頑張ろう…！</h3>
        </div>
      )}

      <p>level{currentLevel}</p>
      <p>↓</p>
      <p>level{newLevel}</p>
      <p>現在のポイント: {point}pt</p>
      <p>次のレベルまで: {2 * (newLevel + 1) - point}pt</p>
      <p>目標時間までにお風呂に入った +3pt</p>
      <p>遅れたけどお風呂に入った +1pt</p>
      <p>お風呂キャンセル -1pt</p>
      <Link to="/room">×</Link>
    </div>
  );
};

export default LevelUp;
