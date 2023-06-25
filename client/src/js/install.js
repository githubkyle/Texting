// const butInstall = document.getElementById("buttonInstall");
// let deferredPrompt;

// // Logic for installing the PWA
// // TODO: Add an event handler to the `beforeinstallprompt` event
// window.addEventListener("beforeinstallprompt", event => {
//   // event.preventDefault();
//   window.deferredPrompt = event;
//   butInstall.classList.remove("hidden");
// });

// // TODO: Implement a click event handler on the `butInstall` element
// butInstall.addEventListener("click", async () => {
//   if (!window.deferredPrompt) {
//     return;
//   }
//   try {
//     await deferredPrompt.prompt();
//     const result = await deferredPrompt.userChoice;
//     if (result.outcome === "accepted") {
//       console.log("PWA installed successfully!");
//     } else {
//       console.log("PWA installation canceled.");
//     }
//   } catch (error) {
//     console.log("An error occurred while installing the PWA:", error);
//   }

//   deferredPrompt = null;
//   butInstall.classList.add("hidden");
// });

// window.addEventListener("appinstalled", event => {
//   console.log("PWA installed.");
//   window.deferredPrompt = null;
// });
//==================================================================
const butInstall = document.getElementById("buttonInstall");

window.addEventListener("beforeinstallprompt", event => {
  window.deferredPrompt = event;
  butInstall.classList.toggle("hidden", false);
});

butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  try {
    await deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    if (result.outcome === "accepted") {
      console.log("PWA installed successfully!");
    } else {
      console.log("PWA installation canceled.");
    }
  } catch (error) {
    console.log("An error occurred while installing the PWA:", error);
  }

  deferredPrompt = null;
  butInstall.classList.add("hidden");
});

// // logic for the install button
// if ("onbeforeinstallprompt" in window) {
//   let deferredPrompt;

//   // Get the install button element
//   const installButton = document.getElementById("buttonInstall");

//   // Add a click event listener to the install button
//   installButton.addEventListener("click", event => {
//     event.preventDefault();

//     if (deferredPrompt) {
//       // Show the installation prompt
//       deferredPrompt.prompt();

//       // Wait for the user's choice
//       deferredPrompt.userChoice.then(choiceResult => {
//         if (choiceResult.outcome === "accepted") {
//           console.log("User accepted the installation");
//         } else {
//           console.log("User dismissed the installation");
//         }

//         // Reset the deferred prompt
//         deferredPrompt = null;
//       });
//     }
//   });

//   // Listen for the beforeinstallprompt event
//   window.addEventListener("beforeinstallprompt", event => {
//     // Prevent the default behavior
//     event.preventDefault();

//     // Store the event for later use
//     deferredPrompt = event;

//     // Show the install button
//     installButton.style.display = "block";
//   });
// }
