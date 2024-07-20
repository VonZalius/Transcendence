import { GameArea } from './js/scenes/gameArea.js';
import { loadFont } from './js/scenes/assets.js';
import { Versus } from './js/mods/versus.js';
import { Tournament } from './js/mods/tournament.js';

let gameArea, ctx, font;

function main(gameMode, playerNames, maxScore, paddleSpeed, paddleSize, bounceMode, ballSpeed, ballAcceleration, numBalls) {
    // Sélectionner le canvas et le contexte
    const canvas = document.getElementById("webgl1");
    ctx = canvas.getContext("2d");

    // Charger les ressources nécessaires
    loadFont().then((loadedFont) => {
        font = loadedFont;
        // Dimensions de la zone de jeu
        gameArea = new GameArea(800, 600, canvas);

        // Initialiser les paddles
        if (gameMode === 'versus') {
            new Versus(gameArea, playerNames, ctx, font, maxScore, paddleSpeed, paddleSize, bounceMode, ballSpeed, ballAcceleration, numBalls);
        } else if (gameMode === 'tournament') {
            new Tournament(gameArea, playerNames, ctx, font, maxScore, paddleSpeed, paddleSize, bounceMode, ballSpeed, ballAcceleration, numBalls);
        }
        else
            throw new Error('Unknown game mode: ' + gameMode + '. Available modes are: versus, tournament');

    }).catch((error) => {
        console.error('Error loading assets:', error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    main('versus', ['Zalius', 'Dani', 'Qwerty', 'Kira'], 10, 5, 100, true, 5, 1, 5);
});

// Mode, [players], MaxScore, PaddleSpeed, PaddleSize, BounceMode, BallSpeed, BallAcceleration, numBalls
// 'versus', ['Zalius', 'Fenris'], 10, 5, 100, true, 5, 1, 1




