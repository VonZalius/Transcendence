export function loadFont() {
    return new Promise((resolve, reject) => {
        // Simuler le chargement de la police
        setTimeout(() => {
            console.log('Font loaded');
            resolve({ family: 'Arial' });  // Remplace 'Arial' par le nom de la police que vous chargez
        }, 1000);
    });
}

