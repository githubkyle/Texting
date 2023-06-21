const butInstall = document.getElementById("buttonInstall");
let deferredPrompt;

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  deferredPrompt = event;
  butInstall.classList.remove("hidden");
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  if (!deferredPrompt) {
    return;
  }

  deferredPrompt.prompt();

  const result = await deferredPrompt.userChoice;
  if (result.outcome === "accepted") {
    console.log("PWA installed successfully!");
  } else {
    console.log("PWA installation canceled.");
  }

  deferredPrompt = null;
  butInstall.classList.add("hidden");
});

window.addEventListener("appinstalled", event => {
  console.log("PWA installed.");
  deferredPrompt = null;
});
