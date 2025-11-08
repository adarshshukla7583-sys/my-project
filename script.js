// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
  from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

// Your Firebase configuration (replace with yours)
const firebaseConfig = {
  apiKey: "AIzaSyDVLEHHoFj36QJXz8onJDrt9SrNU_I20c8",
  authDomain: "login-form-31a95.firebaseapp.com",
  projectId: "login-form-31a95",
  storageBucket: "newlogin-9b5ac.firebasestorage.app",// ✅ fix here
  messagingSenderId: "1085705023799",
  appId: "1:1085705023799:web:1fe585e7ec31dfec70aab2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle Registration
document.getElementById("register-button").addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("✅ Account created successfully!");
      console.log(userCredential.user);
    })
    .catch((error) => {
      alert(`❌ Error: ${error.message}`);
    });
});

// Handle Login
document.getElementById("login-button").addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("✅ Login successful!");
      console.log("Logged in:", userCredential.user);
      window.location.href = "home.html"; // optional redirect
    })
    .catch((error) => {
      alert(`❌ Error: ${error.message}`);
    });
});
