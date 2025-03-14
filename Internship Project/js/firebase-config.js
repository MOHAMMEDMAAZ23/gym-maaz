
// Import Firebase and necessary modules
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { initializeApp } from "firebase/app";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAO5R34yiYSv_qZzBhK-npissEZoBGmmwA",
  authDomain: "gym-mgnt-system.firebaseapp.com",
  projectId: "gym-mgnt-system",
  storageBucket: "gym-mgnt-system.firebasestorage.app",
  messagingSenderId: "799016372644",
  appId: "1:799016372644:web:471ec1bfda26b967f71931"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);
