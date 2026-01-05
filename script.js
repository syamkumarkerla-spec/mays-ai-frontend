// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Firebase config (USE YOURS)
const firebaseConfig = {
  apiKey: "AIzaSyDa_WIFoo8mB7XhKdnr5NaUES2k0j9ROwk",
  authDomain: "mays-ai-39099.firebaseapp.com",
  projectId: "mays-ai-39099",
  storageBucket: "mays-ai-39099.firebasestorage.app",
  messagingSenderId: "846088230728",
  appId: "1:846088230728:web:1dd90593b0602321bd057d",
  measurementId: "G-CSQF4PY5L5"
};

// Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Persistence (MOST IMPORTANT)
await setPersistence(auth, browserLocalPersistence);

// Login button
document.getElementById("loginBtn").onclick = () => {
  signInWithRedirect(auth, provider);
};

// Handle redirect result
getRedirectResult(auth).catch(err => console.error(err));

// Auth state
onAuthStateChanged(auth, user => {
  if (user) {
    document.body.innerHTML = `<h2>Logged in as ${user.displayName}</h2>`;
  } else {
    document.getElementById("status").innerText = "Not logged in";
  }
});
