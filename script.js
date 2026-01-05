// ===============================
// Firebase SDK imports
// ===============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ===============================
// 🔐 Firebase Configuration
// (ONLY Firebase keys — NOT OpenAI)
// ===============================
const firebaseConfig = {
  apiKey: "AIzaSyAkYDU8FsDwJMXEirv_tcYwPWhZhc",
  authDomain: "mays-ai-clccf.firebaseapp.com",
  projectId: "mays-ai-clccf",
  storageBucket: "mays-ai-clccf.appspot.com",
  messagingSenderId: "206339500972",
  appId: "1:206339500972:web:dae164eef2c28067176889"
};

// ===============================
// Initialize Firebase
// ===============================
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ===============================
// DOM Elements
// ===============================
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const chatBox = document.getElementById("chatBox");
const userInfo = document.getElementById("userInfo");

// ===============================
// Login
// ===============================
loginBtn.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    alert("Login failed");
    console.error(err);
  }
});

// ===============================
// Logout
// ===============================
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
});

// ===============================
// Auth State Listener
// ===============================
onAuthStateChanged(auth, (user) => {
  if (user) {
    userInfo.innerText = `Logged in as ${user.displayName}`;
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
    chatBox.style.display = "block";
  } else {
    userInfo.innerText = "Not logged in";
    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";
    chatBox.style.display = "none";
  }
});
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});
