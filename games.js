import { Paddle } from './js/scenes/paddle.js';
import { Ball } from './js/scenes/ball.js';
import { GameArea } from './js/scenes/gameArea.js';
import { setupControls } from './js/scenes/controls.js';
import { loadFont } from './js/scenes/assets.js';
import { Versus } from './js/mods/versus.js';
import { Tournament } from './js/mods/tournament.js';

let gameArea, playerPaddle, aiPaddle, ball, ctx, font, gameTitle;

// Initialisation du jeu avec des paramètres
function main(gameMode = "versus", playerNames = ["Player1", "Player2"]) {
    // Sélectionner le canvas et le contexte
    const canvas = document.getElementById("webgl1");
    ctx = canvas.getContext("2d");

    // Charger les ressources nécessaires (par exemple, les polices)
    loadFont().then((loadedFont) => {
        font = loadedFont;
        // Dimensions de la zone de jeu
        gameArea = new GameArea(800, 600, canvas);

        // Initialiser les paddles en fonction du mode de jeu
        if (gameMode === 'versus') {
            new Versus(gameArea, playerNames, ctx, font);
            //({ playerPaddle, aiPaddle } = versusGame.initPaddles());
            //gameTitle = "Versus Mode";
        } else if (gameMode === 'tournament') {
            new Tournament(gameArea, playerNames, ctx, font);
        }
        else
            throw new Error('Unknown game mode: ' + gameMode + '. Available modes are: versus, tournament');

    }).catch((error) => {
        console.error('Error loading assets:', error);
    });
}

// Attendre que le DOM soit entièrement chargé avant de lancer le jeu
document.addEventListener("DOMContentLoaded", () => {
    // Appel de la fonction main avec des paramètres par défaut ou spécifiés
    main('tournament', ['Zalius', 'Spartan', 'Baptiste']);
});





