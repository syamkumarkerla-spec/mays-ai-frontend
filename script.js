import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDa_WIFoo8mB7XhKdnr5NaUES2k0j9ROwk",
  authDomain: "mays-ai-39099.firebaseapp.com",
  projectId: "mays-ai-39099",
  storageBucket: "mays-ai-39099.appspot.com",
  messagingSenderId: "846088230728",
  appId: "1:846088230728:web:1dd90593b0602321bd057d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 🔥 CRITICAL FOR MOBILE + GITHUB PAGES
provider.setCustomParameters({
  redirect_uri: window.location.href
});

await setPersistence(auth, browserLocalPersistence);

const status = document.getElementById("status");
const loginBtn = document.getElementById("login");
const logoutBtn = document.getElementById("logout");

loginBtn.onclick = () => {
  signInWithRedirect(auth, provider);
};

// MUST be called on page load
getRedirectResult(auth).catch(() => {});

onAuthStateChanged(auth, (user) => {
  if (user) {
    status.innerText = `Logged in as ${user.displayName}`;
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
  } else {
    status.innerText = "Not logged in";
    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";
  }
});

logoutBtn.onclick = () => signOut(auth);
