document.addEventListener("DOMContentLoaded", () => {
    const toggleSwitch = document.getElementById("toggle-switch");
  
    // This checks local storage to preserve theme on reload
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-mode");
      toggleSwitch.checked = true;
    }
  
    toggleSwitch.addEventListener("change", () => {
      if (toggleSwitch.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }
    });
  });
  
  // Accessibility toggles for mock-browser
function toggleHighContrast() {
  document.getElementById("mockBrowser").classList.toggle("high-contrast");
}

function toggleGrayscale() {
  document.getElementById("mockBrowser").classList.toggle("grayscale");
}

function toggleSimplified() {
  document.getElementById("mockBrowser").classList.toggle("simplified");
}

function toggleImages() {
  document.getElementById("mockBrowser").classList.toggle("hide-images");
}

// ADHD Distraction Simulation Logic
let difficulty = 'moderate'; // Default difficulty
let distractionInterval;
let isSimulationActive = false;

const distractions = [
  "Check your emails!",
  "You've got a new notification!",
  "Don't forget the meeting at 3 PM!",
  "Update required!",
  "A friend tagged you!",
  "Urgent task: reply now!",
  "Low battery warning!"
];

function generateDistraction() {
  const simArea = document.getElementById("simulationArea");
  const distraction = document.createElement("div");
  distraction.className = "distraction";
  distraction.textContent = distractions[Math.floor(Math.random() * distractions.length)];
  distraction.style.top = Math.random() * 80 + "%";
  distraction.style.left = Math.random() * 80 + "%";
  simArea.appendChild(distraction);
  setTimeout(() => distraction.remove(), 5000);
}


function setDifficulty(level) {
  difficulty = level;
  stopSimulation();

  // This updates the button active state
  const difficultyButtons = document.querySelectorAll('.difficulty-buttons button');
  difficultyButtons.forEach(btn => {
    btn.classList.remove('active');
  });

  // This adds an active class to the clicked button
  const selectedButton = document.querySelector(`.difficulty-buttons button[data-level="${level}"]`);
  if (selectedButton) {
    selectedButton.classList.add('active');
  }
}

function startSimulation() {
  if (isSimulationActive) return;
  isSimulationActive = true;

  const simArea = document.getElementById("simulationArea");
  simArea.textContent = "";

  let intervalSpeed = 2000; // Default moderate
  if (difficulty === 'mild') intervalSpeed = 3000;
  if (difficulty === 'intense') intervalSpeed = 1000;
  
  distractionInterval = setInterval(generateDistraction, intervalSpeed);
}

function pauseSimulation() {
  clearInterval(distractionInterval);
  isSimulationActive = false;

  const simArea = document.getElementById("simulationArea");
  if (!simArea.querySelector('.distraction')) {
    simArea.textContent = 'Click "Start Simulation" to experience browsing distractions.';
}
}

function stopSimulation() {
  clearInterval(distractionInterval);
  isSimulationActive = false;

  const simArea = document.getElementById("simulationArea");
  simArea.innerHTML = 'Click "Start Simulation" to experience browsing distractions.';
}