import { GameArea } from './js/scenes/gameArea.js';
import { loadFont } from './js/scenes/assets.js';
import { Versus } from './js/mods/versus.js';
import { Tournament } from './js/mods/tournament.js';
import { LastManStanding } from './js/mods/lastManStanding.js';

let ctx, font;

function main(gameMode, playerNames, maxScore, paddleSpeed, paddleSize, bounceMode, ballSpeed, ballAcceleration, numBalls) {
    // Sélectionner le canvas et le contexte
    const canvas = document.getElementById("webgl1");
    ctx = canvas.getContext("2d");

    // Charger les ressources nécessaires
    loadFont().then((loadedFont) => {
        font = loadedFont;

        // Initialiser les paddles
        if (gameMode === 'versus') {
            new Versus(playerNames, ctx, font, maxScore, paddleSpeed, paddleSize, bounceMode, ballSpeed, ballAcceleration, numBalls, canvas);
        }
        else if (gameMode === 'tournament') {
            new Tournament(playerNames, ctx, font, maxScore, paddleSpeed, paddleSize, bounceMode, ballSpeed, ballAcceleration, numBalls, canvas);
        }
        else if (gameMode === 'lastManStanding') {
            new LastManStanding(playerNames, ctx, font, maxScore, paddleSpeed, paddleSize, bounceMode, ballSpeed, ballAcceleration, numBalls, canvas);
        }
        else
            throw new Error('Unknown game mode: ' + gameMode + '. Available modes are: versus, tournament, lastManStanding');

    }).catch((error) => {
        console.error('Error loading assets:', error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    main('versus', ['Zalius', 'Dani', 'Qwerty', 'Tida'], 10, 5, 100, true, 5, 3, 1);
});

// Mode, [players], MaxScore, PaddleSpeed, PaddleSize, BounceMode, BallSpeed, BallAcceleration, numBalls
// 'versus', ['Zalius', 'Fenris'], 10, 5, 100, true, 5, 1, 1




