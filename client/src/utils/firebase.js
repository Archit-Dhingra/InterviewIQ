import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiq-230eb.firebaseapp.com",
  projectId: "interviewiq-230eb",
  storageBucket: "interviewiq-230eb.firebasestorage.app",
  messagingSenderId: "502435642246",
  appId: "1:502435642246:web:497613a701429645d1ca07"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export {auth, provider};