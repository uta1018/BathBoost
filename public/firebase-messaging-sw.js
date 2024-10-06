// importScripts('/__/firebase/9.2.0/firebase-app-compat.js');
// importScripts('/__/firebase/9.2.0/firebase-messaging-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCBGxiZckLdQAtkvdIsoPKgZ-LxR2ICUg8",
  authDomain: "bath-boost-dev.firebaseapp.com",
  databaseURL: "https://bath-boost-dev-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "bath-boost-dev",
  storageBucket: "bath-boost-dev.appspot.com",
  messagingSenderId: "568665544127",
  appId: "1:568665544127:web:e599f850084286c5dfbd0a",
  measurementId: "G-1JHQTXVJ5V",
});

const messaging = firebase.messaging();

// バックグラウンドで通知を受け取る
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
