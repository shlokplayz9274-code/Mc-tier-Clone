import { db, auth } from "./firebase.js";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// LOGIN
window.login = async function () {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, pass);
    document.getElementById("panel").style.display = "block";
    document.getElementById("loginBox").style.display = "none";
    alert("Login success!");
  } catch (e) {
    alert("Login failed");
  }
};

// ADD PLAYER
window.addPlayer = async function () {
  await addDoc(collection(db, "players"), {
    name: name.value,
    tier: tier.value,
    points: Number(points.value),
    category: category.value
  });

  alert("Player added!");
};