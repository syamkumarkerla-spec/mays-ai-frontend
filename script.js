// ===============================
// Firebase SDK imports (CDN)
// ===============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ===============================
// 🔴 Firebase CONFIG (YOUR PROJECT)
// ===============================
const firebaseConfig = {
  apiKey: "AIzaSyDa_WIFoo8mB7XhKdnr5NaUES2k0j9ROwk",
  authDomain: "mays-ai-39099.firebaseapp.com",
  projectId: "mays-ai-39099",
  storageBucket: "mays-ai-39099.firebasestorage.app",
  messagingSenderId: "846088230728",
  appId: "1:846088230728:web:1dd90593b0602321bd057d"
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
const userInfo = document.getElementById("userInfo");
const chatBox = document.getElementById("chatBox");

// ===============================
// LOGIN (MOBILE SAFE)
// ===============================
loginBtn.addEventListener("click", () => {
  signInWithRedirect(auth, provider);
});

// ===============================
// HANDLE REDIRECT RESULT
// ===============================
getRedirectResult(auth)
  .then((result) => {
    if (result && result.user) {
      console.log("Login success:", result.user.displayName);
    }
  })
  .catch((error) => {
    console.error("Redirect login error:", error);
  });

// ===============================
// AUTH STATE LISTENER
// ===============================
onAuthStateChanged(auth, (user) => {
  if (user) {
    userInfo.innerText = `Hi ${user.displayName}`;
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

// ===============================
// LOGOUT
// ===============================
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
});
