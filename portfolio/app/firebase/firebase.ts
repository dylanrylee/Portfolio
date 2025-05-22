import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9_5hCnesPhL-Ir9OdjMEP5ilk6jfVrFk",
  authDomain: "portfolio-cd702.firebaseapp.com",
  projectId: "portfolio-cd702",
  storageBucket: "portfolio-cd702.firebasestorage.app",
  messagingSenderId: "902931187033",
  appId: "1:902931187033:web:bd0fd818f1f113a3367848",
  measurementId: "G-JZW2J3XCER"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);