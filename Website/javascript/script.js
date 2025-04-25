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