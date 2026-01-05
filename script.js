import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// 🔐 Firebase config (ONLY auth-related)
const firebaseConfig = {
  apiKey: "AIzaSyDa_WIFoo8mB7XhKdnr5NaUES2k0j9ROwk",
  authDomain: "mays-ai-39099.firebaseapp.com",
  projectId: "mays-ai-39099",
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

// Login (MOBILE SAFE)
loginBtn.onclick = () => {
  signInWithRedirect(auth, provider);
};

// Handle redirect result
getRedirectResult(auth).catch(console.error);

// Auth state
onAuthStateChanged(auth, (user) => {
  if (user) {
    userText.innerText = `Hi ${user.displayName}`;
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
  } else {
    userText.innerText = "Not logged in";
    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";
  }
});

// Logout
logoutBtn.onclick = async () => {
  await signOut(auth);
};
