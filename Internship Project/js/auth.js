// Import Firebase modules (replace with your actual Firebase config)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, getDoc, FieldValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Firebase configuration (replace with your actual config)
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
const auth = getAuth(app);
const db = getFirestore(app);
const firebase = {
    firestore: {
        FieldValue: FieldValue
    }
}

// DOM Elements
const adminLoginForm = document.getElementById('admin-login');
const adminSignupForm = document.getElementById('admin-signup');
const userLoginForm = document.getElementById('user-login');
const userSignupForm = document.getElementById('user-signup');

// Check if user is already logged in
auth.onAuthStateChanged(user => {
    if (user) {
        // Check user role from Firestore
        db.collection('users').doc(user.uid).get()
            .then(doc => {
                if (doc.exists) {
                    const userData = doc.data();
                    if (userData.role === 'admin') {
                        window.location.href = 'pages/admin-dashboard.html';
                    } else {
                        window.location.href = 'pages/user-dashboard.html';
                    }
                }
            })
            .catch(error => {
                console.error("Error getting user data:", error);
                showNotification('Error getting user data. Please try again.', 'error');
            });
    }
});

// Admin Login
if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', e => {
        e.preventDefault();

        const email = document.getElementById('admin-email').value;
        const password = document.getElementById('admin-password').value;

        showLoading();

        // Sign in with email and password
        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                // Check if user is admin
                return db.collection('users').doc(userCredential.user.uid).get();
            })
            .then(doc => {
                if (doc.exists && doc.data().role === 'admin') {
                    window.location.href = 'pages/admin-dashboard.html';
                } else {
                    auth.signOut();
                    hideLoading();
                    showNotification('Access denied. You are not an admin.', 'error');
                }
            })
            .catch(error => {
                hideLoading();
                console.error("Admin login error:", error);
                showNotification('Login failed: ' + error.message, 'error');
            });
    });
}

// // Admin Signup
// if (adminSignupForm) {
//     adminSignupForm.addEventListener('submit', e => {
//         e.preventDefault();

//         const name = document.getElementById('admin-name').value;
//         const email = document.getElementById('admin-signup-email').value;
//         const password = document.getElementById('admin-signup-password').value;
//         const confirmPassword = document.getElementById('admin-confirm-password').value;
//         const adminCode = document.getElementById('admin-code').value;

//         // Check if passwords match
//         if (password !== confirmPassword) {
//             showNotification('Passwords do not match!', 'error');
//             return;
//         }

//         // Check admin code (in a real app, this would be verified against a secure value)
//         if (adminCode !== 'ADMIN123') {
//             showNotification('Invalid admin code!', 'error');
//             return;
//         }

//         showLoading();

//         // Create user with email and password
//         auth.createUserWithEmailAndPassword(email, password)
//             .then(userCredential => {
//                 // Add user to Firestore with admin role
//                 return db.collection('users').doc(userCredential.user.uid).set({
//                     name: name,
//                     email: email,
//                     role: 'admin',
//                     createdAt: firebase.firestore.FieldValue.serverTimestamp()
//                 });
//             })
//             .then(() => {
//                 hideLoading();
//                 showNotification('Admin account created successfully!', 'success');
//                 window.location.href = './pages/admin-dashboard.html';
//             })
//             .catch(error => {
//                 hideLoading();
//                 console.error("Admin signup error:", error);
//                 showNotification('Signup failed: ' + error.message, 'error');
//             });
//     });
// }
const buttonadmin = document.getElementById('btn btn-secondary');
buttonadmin.addEventListener('click', function (event) {
    event.preventDefault();
    const name = document.getElementById('admin-name').value;
    const email = document.getElementById('admin-signup-email').value;
    const password = document.getElementById('admin-signup-password').value;
    const confirmPassword = document.getElementById('admin-confirm-password').value;
    const adminCode = document.getElementById('admin-code').value;

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
    window.location.href = '.pages/admin-dashboard.html';
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
   
});












// User Login
if (userLoginForm) {
    userLoginForm.addEventListener('submit', e => {
        e.preventDefault();

        const email = document.getElementById('user-email').value;
        const password = document.getElementById('user-password').value;

        showLoading();

        // Sign in with email and password
        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                // Check if user is a regular user
                return db.collection('users').doc(userCredential.user.uid).get();
            })
            .then(doc => {
                if (doc.exists && doc.data().role === 'user') {
                    window.location.href = 'pages/user-dashboard.html';
                } else {
                    auth.signOut();
                    hideLoading();
                    showNotification('Invalid user credentials.', 'error');
                }
            })
            .catch(error => {
                hideLoading();
                console.error("User login error:", error);
                showNotification('Login failed: ' + error.message, 'error');
            });
    });
}

// User Signup
if (userSignupForm) {
    userSignupForm.addEventListener('submit', e => {
        e.preventDefault();

        const name = document.getElementById('user-name').value;
        const email = document.getElementById('user-signup-email').value;
        const password = document.getElementById('user-signup-password').value;
        const confirmPassword = document.getElementById('user-confirm-password').value;
        const phone = document.getElementById('user-phone').value;

        // Check if passwords match
        if (password !== confirmPassword) {
            showNotification('Passwords do not match!', 'error');
            return;
        }

        showLoading();

        // Create user with email and password
        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                // Add user to Firestore with user role
                return db.collection('users').doc(userCredential.user.uid).set({
                    name: name,
                    email: email,
                    phone: phone,
                    role: 'user',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            })
            .then(() => {
                hideLoading();
                showNotification('Account created successfully!', 'success');
                window.location.href = 'pages/user-dashboard.html';
            })
            .catch(error => {
                hideLoading();
                console.error("User signup error:", error);
                showNotification('Signup failed: ' + error.message, 'error');
            });
    });
}

// Helper Functions
function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    loadingDiv.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingDiv);
}

function hideLoading() {
    const loadingDiv = document.querySelector('.loading');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}