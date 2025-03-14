// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
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

// Initialize Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// Set persistence to local
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);