const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");
admin.initializeApp();

// 毎分実行
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

          // お風呂宣言のリマインダー通知
          if (userId && goalBathTime) {
            await sendNotification(userId, goalBathTime);
          }
        })
      );

      // usersからユーザーデータを取得
      const usersSnapshot = await admin.firestore().collection("user").get();

      // 取得したドキュメントごとに処理
      await Promise.all(
        usersSnapshot.docs.map(async (doc) => {
          const userId = doc.id;
          console.log(userId);

          // 最後の通知or投稿日時を取得（存在しない場合、nullに設定）
          const lastReminderDate = doc.data()?.lastReminderDate || null;
          console.log(lastReminderDate);

          // 24時間をミリ秒に変換（24 * 60 * 60 * 1000 = 86400000 ms）
          const oneDayInMillis = 24 * 60 * 60 * 1000;
          const currentTime = Date.now();
          console.log(currentTime);
          console.log(currentTime - lastReminderDate >= oneDayInMillis);

          // 24時間以上ポストがないか、前回のリマインダー送信から24時間以上経過しているかを確認
          if (userId && lastReminderDate && currentTime - lastReminderDate >= oneDayInMillis) {
            console.log("通知送信");
            await sendReminderNotification(userId);

            const userRef = admin.firestore().collection('user').doc(userId);
            
            // 通知送信後に、lastReminderDate を現在時刻で更新
            await userRef.update({
              lastReminderDate: currentTime,
            });
          }
        })
      );

      console.log("全ての通知を処理しました。");
    } catch (error) {
      console.error("通知処理中にエラーが発生しました:", error);
    }
  });

// ポストが追加されたときに実行
exports.sendStartBathNotification = functions.firestore
  .document("posts/{postId}")
  .onCreate(async (snap, context) => {
    const postData = snap.data();
    const postType = postData.type;

    // ポストが入浴スタンプのとき
    if (postType == "startBath") {
      const roomId = postData.roomid;
      const authorId = postData.author;

      try {
        // users コレクションからポスト投稿者の名前を取得
        const userSnapshot = await admin
          .firestore()
          .collection("user")
          .doc(authorId)
          .get();

        if (!userSnapshot.exists) {
          console.error("ユーザーが見つかりません:", authorId);
          return;
        }
        const userName = userSnapshot.data().userName;

        // rooms コレクションからメンバーのuserIDを取得
        const remindersSnapshot = await admin
          .firestore()
          .collection("rooms")
          .doc(roomId)
          .get();

        if (!remindersSnapshot.exists) {
          console.error("ルームが見つかりません:", roomId);
          return;
        }

        const memberList = remindersSnapshot.data().member || [];

        // 取得したuserIDごとに処理
        await Promise.all(
          memberList.map(async (member) => {
            const userId = member.userID;
            console.log(userId);

            if (userId && userId !== authorId) {
              await sendStartBathNotification(userId, userName);
            }
          })
        );
        console.log("全ての通知を処理しました。");
      } catch (error) {
        console.error("通知処理中にエラーが発生しました:", error);
      }
    }
  });

const formatHHMMforTimeStamp = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes.toString().padStart(2, "0")}`;
};

// 24時間ごとにリマインダーを送信する関数
const sendReminderNotification = async (userId) => {
  const tokensRef = admin.firestore().collection("user").doc(userId);
  const tokensSnapshot = await tokensRef.get();
  console.log("通知関数");
  if (!tokensSnapshot.empty) {
    const tokens = tokensSnapshot.data().devices; // トークンを配列として取得

    if (tokens && tokens.length > 0) {
      const message = {
        notification: {
          title: "おふろ報告をしませんか？",
          body: `ねことかえるが悲しんでいるようです`,
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

// フレンドのお風呂通知を送信する関数
const sendStartBathNotification = async (userId, userName) => {
  const tokensRef = admin.firestore().collection("user").doc(userId);
  const tokensSnapshot = await tokensRef.get();
  console.log("通知関数");
  if (!tokensSnapshot.empty) {
    const tokens = tokensSnapshot.data().devices; // トークンを配列として取得

    if (tokens && tokens.length > 0) {
      const message = {
        notification: {
          title: "おふろ通知",
          body: `${userName}さんがお風呂に入りました！`,
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

// お風呂宣言のリマインダー通知を送信する関数
const sendNotification = async (userId, goalBath) => {
  const tokensRef = admin.firestore().collection("user").doc(userId);
  const tokensSnapshot = await tokensRef.get();
  console.log("通知関数");
  if (!tokensSnapshot.empty) {
    const tokens = tokensSnapshot.data().devices; // トークンを配列として取得

    const goalBathDate = new Date(goalBath.seconds * 1000);
    goalBathDate.setMinutes(goalBathDate.getMinutes() + 5); // 5分追加

    const formattedGoalBath = formatHHMMforTimeStamp({
      seconds: Math.floor(goalBathDate.getTime() / 1000),
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
