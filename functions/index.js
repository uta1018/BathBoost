const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");
admin.initializeApp();

exports.sendReminder = functions
  .region("asia-northeast1")
  .runWith({ memory: "512MB" })
  .pubsub.schedule("every 1 minutes")
  .timeZone("Asia/Tokyo")
  .onRun(async (context) => {
    // 秒を切り捨てた現在時刻
    const now = (() => {
      let s = admin.firestore.Timestamp.now().seconds;
      s = s - (s % 60);
      return new admin.firestore.Timestamp(s, 0);
    })();
    console.log(now);

    try {
      // notifications コレクションから現在時刻に該当するデータを取得
      const remindersSnapshot = await admin
        .firestore()
        .collection("notifications")
        .where("time", "==", now)
        .get();
      

      // 取得したドキュメントごとに処理
      await Promise.all(
        remindersSnapshot.docs.map(async (doc) => {
          const reminderData = doc.data();
          const userId = doc.id;
          const goalBathTime = reminderData.time;
          console.log(userId);
          console.log(goalBathTime);

          if (userId && goalBathTime) {
            await sendNotification(userId, goalBathTime);
          }
        })
      );
      console.log("全ての通知を処理しました。");
    } catch (error) {
      console.error("通知処理中にエラーが発生しました:", error);
    }
  });

// exports.sendGoalBathNotification = functions.firestore
//   .document("user/{userId}")
//   .onUpdate((change, context) => {
//     const beforeData = change.before.data();
//     const afterData = change.after.data();
//     const userId = context.params.userId;

//     console.log("動いてるよ");
//     // goalTime が変更されたかどうかを確認し、null でないかを確認
//     const previousGoalBath = beforeData.goalTime;
//     const currentGoalBath = afterData.goalTime;

//     if (previousGoalBath !== currentGoalBath && currentGoalBath !== null) {
//       console.log("発動条件みたした");
//       // goalBath が設定されている場合、7分前に通知を送る
//       const goalBathTime = currentGoalBath.toDate();
//       const notificationTime = goalBathTime.getTime() - 7 * 60 * 1000;

//       // 現在の時刻と比較し、通知時間が未来であることを確認
//       const currentTime = Date.now();
//       if (notificationTime > currentTime) {
//         console.log("通知送るよ～");
//         const delay = notificationTime - currentTime; // 通知までの遅延時間

//         // 5分前に通知を送信するために setTimeout を使用
//         setTimeout(() => {
//           sendNotification(userId, currentGoalBath);
//         }, delay);
//       }
//     }

//     return null; // Firestore トリガーのために null を返す
//   });

const formatHHMMforTimeStamp = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes.toString().padStart(2, "0")}`;
};

// 通知を送信する関数
const sendNotification = async (userId, goalBath) => {
  const tokensRef = admin.firestore().collection("user").doc(userId);
  const tokensSnapshot = await tokensRef.get();
  console.log("通知関数");
  if (!tokensSnapshot.empty) {
    const tokens = tokensSnapshot.data().devices; // トークンを配列として取得

    const goalBathDate = new Date(goalBath.seconds * 1000);
    goalBathDate.setMinutes(goalBathDate.getMinutes() + 5); // 5分追加

    const formattedGoalBath = formatHHMMforTimeStamp({
      seconds: Math.floor(goalBathDate.getTime() / 1000)
    });

    if (tokens && tokens.length > 0) {
      const message = {
        notification: {
          title: "おふろの時間です",
          body: `${formattedGoalBath}までにおふろに入ろう！`,
        },
        tokens: tokens,
      };

      console.log("通知送った！");
      console.log(tokens);
      admin
        .messaging()
        .sendEachForMulticast(message)
        .then((response) => {
          console.log(
            "成功:",
            response.successCount,
            "件のメッセージが送信されました"
          );
          console.log(
            "失敗:",
            response.failureCount,
            "件のメッセージが失敗しました"
          );
          if (response.failureCount > 0) {
            response.responses.forEach((resp, idx) => {
              if (!resp.success) {
                console.error("失敗したトークン:", tokens[idx], resp.error);
              }
            });
          }
        })
        .catch((error) => {
          console.error("通知送信中にエラーが発生しました:", error);
        });
      console.log("成功");
    }
  } else {
    console.log("通知トークンがありません");
  }
};
