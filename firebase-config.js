// Firebase SDK imports (modular, loaded via script tags in index.html)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBm6Ielatj-MW5qf72xu2qU2XRjI59Tj68",
  authDomain: "meccha-hide.firebaseapp.com",
  projectId: "meccha-hide",
  storageBucket: "meccha-hide.firebasestorage.app",
  messagingSenderId: "64434774435",
  appId: "1:64434774435:web:9a231df09e0070baadba16",
  measurementId: "G-ELVGBVC73K"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);