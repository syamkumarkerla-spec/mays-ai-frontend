// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// 🔴 YOUR FIREBASE CONFIG (already correct)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "mays-ai-39099.firebaseapp.com",
  projectId: "mays-ai-39099",
  storageBucket: "mays-ai-39099.appspot.com",
  messagingSenderId: "846088230728",
  appId: "1:846088230728:web:1dd90593b0602321bd057d"
};

// Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// DOM
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userText = document.getElementById("userText");

// 🔥 LOGIN (REDIRECT – MOBILE SAFE)
loginBtn.addEventListener("click", () => {
  signInWithRedirect(auth, provider);
});

// LOGOUT
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
});

// 🔥 AUTH STATE (THIS IS THE KEY FIX)
onAuthStateChanged(auth, (user) => {
  if (user) {
    userText.innerText = `Hi ${user.displayName}`;
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
  } else {
    userText.innerText = "Not logged in";
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
  }
});
