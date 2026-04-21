import { db } from "./firebase.js";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const rankingDiv = document.getElementById("ranking");

let allPlayers = [];

onSnapshot(collection(db, "players"), (snapshot) => {
  allPlayers = [];

  snapshot.forEach((d) => {
    allPlayers.push({ id: d.id, ...d.data() });
  });

  allPlayers.sort((a, b) => b.points - a.points);

  render(allPlayers);
});

function render(players) {
  rankingDiv.innerHTML = "";

  players.forEach((p, i) => {

    let extra = i === 0 ? "top1" :
                i === 1 ? "top2" :
                i === 2 ? "top3" :
                p.tier.toLowerCase();

    rankingDiv.innerHTML += `
      <div class="card ${extra}">
        <h2>#${i + 1} ${p.name}</h2>
        <p>Tier: ${p.tier}</p>
        <p>Points: ${p.points}</p>
        <p>Category: ${p.category}</p>

        <button onclick="deletePlayer('${p.id}')">Delete</button>
      </div>
    `;
  });
}

// DELETE
window.deletePlayer = async function (id) {
  await deleteDoc(doc(db, "players", id));
};