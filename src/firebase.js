import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2eYo-N5EhX3HuW0I8EAiSiDw3mXlailo",
  authDomain: "seviyetespit-1bf73.firebaseapp.com",
  projectId: "seviyetespit-1bf73",
  storageBucket: "seviyetespit-1bf73.firebasestorage.app",
  messagingSenderId: "421777526495",
  appId: "1:421777526495:web:9441041f26e4524505236a",
  measurementId: "G-5H1ND1H3YN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
