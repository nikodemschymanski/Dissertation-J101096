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
  function updateCaptionAndStatus(feature, isOn, captionText) {
    const caption = document.getElementById("accessibilityCaption");
    const status = document.getElementById(`${feature}Status`);
    if (caption) caption.textContent = captionText;
    if (status) status.textContent = `${captionText.split(":")[0]}: ${isOn ? "On" : "Off"}`;
  }
  
  function toggleHighContrast() {
    const browser = document.getElementById("mockBrowser");
    const isOn = browser.classList.toggle("high-contrast");
    updateCaptionAndStatus("hc", isOn, "High Contrast Mode: Improves visibility with strong colour contrast");
  }
  
  function toggleGrayscale() {
    const browser = document.getElementById("mockBrowser");
    const isOn = browser.classList.toggle("grayscale");
    updateCaptionAndStatus("gs", isOn, "Grayscale Mode: Removes colours to reduce sensory overload");
  }
  
  function toggleSimplified() {
    const browser = document.getElementById("mockBrowser");
    const isOn = browser.classList.toggle("simplified");
    updateCaptionAndStatus("sf", isOn, "Simplified View: Enlarges text and simplifies layout for better readability");
  }
  
  function toggleImages() {
    const browser = document.getElementById("mockBrowser");
    const isOn = !browser.classList.toggle("hide-images"); 
    updateCaptionAndStatus("img", isOn, "Images: " + (isOn ? "Visible for standard view" : "Hidden to reduce distractions"));
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

  // Only remove distractions, not overlays or info text
  const distractionsOnScreen = simArea.querySelectorAll('.distraction');
  distractionsOnScreen.forEach(d => d.remove());

  const infoText = document.getElementById("infoText");
  if (infoText) {
    infoText.style.display = 'none';
  }

  const pausedOverlay = document.getElementById("pausedOverlay");
  if (pausedOverlay) {
    pausedOverlay.style.display = 'none';
  }

  const pauseButton = document.querySelector('.btn-pause');
  if (pauseButton) {
    pauseButton.textContent = "Pause Simulation";
  }

  const bubbles = document.querySelectorAll('.bubble');
  bubbles.forEach(bubble => {
    bubble.style.animationPlayState = 'running';
  });

  let intervalSpeed = 2000; // Default moderate
  if (difficulty === 'mild') intervalSpeed = 3000;
  if (difficulty === 'intense') intervalSpeed = 1000;
  
  distractionInterval = setInterval(generateDistraction, intervalSpeed);
}

function togglePauseSimulation() {
  const pausedOverlay = document.getElementById("pausedOverlay");
  const pauseButton = document.querySelector('.btn-pause');
  const simArea = document.getElementById("simulationArea");
  const infoText = document.getElementById("infoText");

  if (!isSimulationActive && !paused) {
    return;
  }

  if (!paused) {
  // Currently running to Pause
  clearInterval(distractionInterval);
  isSimulationActive = false;
  paused = true;

  // This pauses all distractions
  const distractionsOnScreen = document.querySelectorAll('.distraction');
  distractionsOnScreen.forEach(el => {
    el.style.animationPlayState = 'paused';
  });

  // This pauses the bubbles
  const bubbles = document.querySelectorAll('.bubble');
  bubbles.forEach(bubble => {
    bubble.style.animationPlayState = 'paused';
  });

  if (pausedOverlay) {
    pausedOverlay.style.display = 'block';
  }

  if (pauseButton) {
    pauseButton.textContent = "Resume Simulation";
  }

  if (simArea.querySelectorAll('.distraction').length === 0 && infoText) {
    infoText.style.display = 'block';
  }
} else {
  // Currently paused to Unpause
  paused = false;
  isSimulationActive = true;

  const distractionsOnScreen = document.querySelectorAll('.distraction');
  distractionsOnScreen.forEach(el => {
    el.style.animationPlayState = 'running';
  });

  const bubbles = document.querySelectorAll('.bubble');
  bubbles.forEach(bubble => {
    bubble.style.animationPlayState = 'running';
  });

  if (pausedOverlay) {
    pausedOverlay.style.display = 'none';
  }

  if (pauseButton) {
    pauseButton.textContent = "Pause Simulation";
  }

  let intervalSpeed = 2000;
  if (difficulty === 'mild') intervalSpeed = 3000;
  if (difficulty === 'intense') intervalSpeed = 1000;

  distractionInterval = setInterval(generateDistraction, intervalSpeed);
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

  const pausedOverlay = document.getElementById("pausedOverlay");
  if (pausedOverlay) {
  pausedOverlay.style.display = 'none';
}
  const pauseButton = document.querySelector('.btn-pause');
    if (pauseButton) {
      pauseButton.textContent = "Pause Simulation";
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