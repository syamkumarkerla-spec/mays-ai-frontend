// ===== FIREBASE IMPORTS =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ===== YOUR FIREBASE CONFIG (USE YOUR REAL ONE) =====
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "mays-ai-39099.firebaseapp.com",
  projectId: "mays-ai-39099",
  storageBucket: "mays-ai-39099.appspot.com",
  messagingSenderId: "846088230728",
  appId: "1:846088230728:web:1dd90593b0602321bd057d"
};

// ===== INIT =====
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ===== DOM =====
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const statusText = document.getElementById("status");

// ===== LOGIN =====
loginBtn.onclick = () => {
  signInWithRedirect(auth, provider);
};

// ===== HANDLE REDIRECT RESULT =====
getRedirectResult(auth).catch(err => {
  console.error("Redirect error:", err);
});

// ===== AUTH STATE =====
onAuthStateChanged(auth, (user) => {
  if (user) {
    statusText.innerText = `Logged in as ${user.displayName}`;
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
  } else {
    statusText.innerText = "Not logged in";
    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";
  }
});

// ===== LOGOUT =====
logoutBtn.onclick = () => {
  signOut(auth);
};
