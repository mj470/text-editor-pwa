const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('👍', 'beforeinstallprompt', event);
    event.preventDefault();

    window.deferredPrompt = event;

    //change visibility of the install button
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }

    // show the prompt to the user
    promptEvent.prompt();

    // Wait for the user to respond to the prompt
    const choiceResult = await promptEvent.userChoice;
    if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the prompt');
    } else {
        console.log('User dismissed the prompt');
    }

    // Clear the saved prompt since it can't be used again
    window.deferredPrompt = null;
    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('👍', 'appinstalled', event);
    window.deferredPrompt = null;
});

