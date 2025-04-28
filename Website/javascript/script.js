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
let paused = false;

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
  if (paused) return;

  const simArea = document.getElementById("simulationArea");
  const distraction = document.createElement("div");
  distraction.className = "distraction";
  distraction.textContent = distractions[Math.floor(Math.random() * distractions.length)];
  distraction.style.top = Math.random() * 80 + "%";
  distraction.style.left = Math.random() * 80 + "%";

  // Shakes if intense
  if (difficulty === 'intense') {
    distraction.classList.add('shake');
  }

  simArea.appendChild(distraction);
  setTimeout(() => {
    if (!paused) distraction.remove();
  }, 5000);
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
  paused = false;

  const simArea = document.getElementById("simulationArea");
  const children = Array.from(simArea.childNodes);
  children.forEach(child => {
  if (child.nodeType === Node.TEXT_NODE || (child.nodeType === Node.ELEMENT_NODE && !child.classList.contains('background-bubbles'))) {
    child.remove();
  }
});

  let intervalSpeed = 2000; // Default moderate
  if (difficulty === 'mild') intervalSpeed = 3000;
  if (difficulty === 'intense') intervalSpeed = 1000;
  
  distractionInterval = setInterval(generateDistraction, intervalSpeed);
}

function pauseSimulation() {
  clearInterval(distractionInterval);
  isSimulationActive = false;
  paused = true;

  // This pauses all distractions
  const distractionsOnScreen = document.querySelectorAll('.distraction');
  distractionsOnScreen.forEach(el => {
    el.style.animationPlayState = 'paused';
});

const simArea = document.getElementById("simulationArea");
const infoText = document.getElementById("infoText");

if (simArea.querySelectorAll('.distraction').length === 0 && infoText) {
  infoText.style.display = 'block';
}
}

function stopSimulation() {
  clearInterval(distractionInterval);
  isSimulationActive = false;
  paused = false;

  const simArea = document.getElementById("simulationArea");
  const distractionsOnScreen = simArea.querySelectorAll('.distraction');
  distractionsOnScreen.forEach(d => d.remove());

  const infoText = document.getElementById("infoText");
  if (infoText) {
    infoText.style.display = 'block';
  }
}

// This generates multiple floating bubbles
document.addEventListener("DOMContentLoaded", () => {
  const bubblesContainer = document.querySelector('.background-bubbles');

  for (let i = 0; i < 12; i++) {  
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.style.width = `${Math.random() * 60 + 20}px`; 
    bubble.style.height = bubble.style.width;
    bubble.style.left = `${Math.random() * 100}%`; 
    bubble.style.bottom = `-${Math.random() * 20}px`; 
    bubble.style.animationDuration = `${15 + Math.random() * 15}s`; 
    bubble.style.animationDelay = `${Math.random() * 20}s`; 
    bubblesContainer.appendChild(bubble);
  }
});