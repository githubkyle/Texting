import { Workbox } from "workbox-window";
import Editor from "./editor";
import "./database";
import "../css/style.css";

const main = document.querySelector("#main");
main.innerHTML = "";

const loadSpinner = () => {
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === "undefined") {
  loadSpinner();
}

// Check if service workers are supported
if ("serviceWorker" in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox("/src-sw.js");
  workboxSW.register();
} else {
  console.error("Service workers are not supported in this browser.");
}

// logic for the install button
if ("onbeforeinstallprompt" in window) {
  let deferredPrompt;

  // Get the install button element
  const installButton = document.getElementById("buttonInstall");

  // Add a click event listener to the install button
  installButton.addEventListener("click", event => {
    event.preventDefault();

    if (deferredPrompt) {
      // Show the installation prompt
      deferredPrompt.prompt();

      // Wait for the user's choice
      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the installation");
        } else {
          console.log("User dismissed the installation");
        }

        // Reset the deferred prompt
        deferredPrompt = null;
      });
    }
  });

  // Listen for the beforeinstallprompt event
  window.addEventListener("beforeinstallprompt", event => {
    // Prevent the default behavior
    event.preventDefault();

    // Store the event for later use
    deferredPrompt = event;

    // Show the install button
    installButton.style.display = "block";
  });
}
