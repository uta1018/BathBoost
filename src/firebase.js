import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpqKPXLY4LoMt56Mk3Cfhbdkc7re-QhpU",
  authDomain: "bath-boost.firebaseapp.com",
  projectId: "bath-boost",
  storageBucket: "bath-boost.appspot.com",
  messagingSenderId: "886585065398",
  appId: "1:886585065398:web:b7798371fb0a1729ba8b17",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
