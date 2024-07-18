export function loadFont() {
    return new Promise((resolve, reject) => {
        // Simuler le chargement de la police
        setTimeout(() => {
            console.log('Font loaded');
            resolve({ family: 'Courier New' });  // Remplace 'Arial' par le nom de la police que vous chargez
        }, 1000);
    });
}

export function waitForKeyPress(callback) {
    function onKeyPress(event) {
        document.removeEventListener('keydown', onKeyPress);
        callback(event.key);  // Vous pouvez retourner la touche pressée si nécessaire
    }
    document.addEventListener('keydown', onKeyPress);
}


