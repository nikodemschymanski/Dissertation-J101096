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

function startSimulation() {
  if (isSimulationActive) return;
  isSimulationActive = true;
  distractionInterval = setInterval(generateDistraction, 3000);
}

function pauseSimulation() {
  clearInterval(distractionInterval);
  isSimulationActive = false;
}

function stopSimulation() {
  clearInterval(distractionInterval);
  isSimulationActive = false;
  const simArea = document.getElementById("simulationArea");
  simArea.innerHTML = "Simulation stopped. Click 'Start Simulation' to resume.";
}