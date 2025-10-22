//ORIGINAL PAGE SCRIPTS
//DISPLAY GAME USER
const userName = localStorage.getItem("selectedUserName");
document.getElementById("game-user").innerText = userName;
// Load selected game name
const gameName = localStorage.getItem("selectedGame");
const title = document.getElementById("gameTitle");
const icon = document.getElementById("timerIcon");
const API_BASE = "http://localhost:5001/api";
const gameId = localStorage.getItem("selectedGameId");
const userId = localStorage.getItem("selectedUserId");

title.textContent = gameName ? `${gameName}` : "Unknown Game";
//SWITCH GAME ICON
gameName === "Game 1"
  ? icon.classList.add("fa-chess-knight")
  : gameName === "Game 2"
  ? icon.classList.add("fa-basketball")
  : gameName === "Game 3"
  ? icon.classList.add("fa-puzzle-piece")
  : icon.classList.add("fa-dice");

// Timer logic
let timerInterval;
let elapsedSeconds = 0;

const display = document.getElementById("timerDisplay");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const exitBtn = document.getElementById("exitBtn");

function updateDisplay() {
  const scaledSeconds = elapsedSeconds * 60; // 1 sec = 1 min
  const minutes = Math.floor(scaledSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (scaledSeconds % 60).toString().padStart(2, "0");
  display.textContent = `${minutes}:${seconds}`;
}

startBtn.addEventListener("click", () => {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      elapsedSeconds++; // 1 real second
      updateDisplay(); // shows 1 minute
    }, 1000);
  }
});

//POST SCORE ON STOP BUTTON
stopBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;

  //POST NEW SCORES
  const newScore = {
    userId: parseInt(userId),
    gameId: parseInt(gameId),
    startedAt: new Date(),
    stoppedAt: new Date(),
    durationMinutes: parseInt(elapsedSeconds),
  };

  fetch(`${API_BASE}/scores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newScore),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network repsonse error");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      alert("Score saved successfully!");
      window.location.href = "game-timer.html";
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("There was an error saving the score.");
    });
  console.log(newScore);
  // TODO: Later send elapsedSeconds to backend (POST /api/sessions)
  console.log(`Played ${gameName} for ${elapsedSeconds} seconds`);
});

exitBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
  window.location.href = "games.html";
});

// Initialize display
updateDisplay();

//END OF ORIGINA PAGE SCRITPS

// Fetch games from backend API by Game ID
async function fetchScoresForGame(gameId) {
  const res = await fetch(`${API_BASE}/scores/table/${gameId}`);
  if (!res.ok) throw new Error("Failed to fetch games");
  return res.json();
}

async function renderScores() {
  const tbody = document.querySelector("#scores-table tbody");

  try {
    const scores = await fetchScoresForGame(gameId);
    scores.forEach((score) => {
      //CREATE NEW TABLE ROW
      const row = document.createElement("tr");
      const user = document.createElement("td");
      user.textContent = score.user.firstName + " " + score.user.lastName;
      const scoreVal = document.createElement("td");
      scoreVal.textContent = score.durationMinutes;

      row.appendChild(user);
      row.appendChild(scoreVal);
      tbody.appendChild(row);
    });
    //console.log(scores);
  } catch (err) {
    console.error(err);
  }
}

//RENDER SCORES TABLE ON PAGE
renderScores(gameId);

//RULES TOGGLE
function toggleDiv() {
  const content = document.getElementById("toggleContent");
  const isVisible = content.classList.contains("opacity-100");

  if (isVisible) {
    content.classList.remove("opacity-100");
    content.classList.add("opacity-0", "pointer-events-none");
  } else {
    content.classList.remove("opacity-0", "pointer-events-none");
    content.classList.add("opacity-100");
  }
}
