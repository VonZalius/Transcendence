import { loadFont } from './js/scenes/assets.js';
import { Versus } from './js/mods/versus.js';
import { Tournament } from './js/mods/tournament.js';
import { LastManStanding } from './js/mods/lastManStanding.js';
import { BrickBreaker } from './js/mods/brickBreaker.js';

let ctx, font;

function main(gameMode, playerNames, maxScore, paddleSpeed, paddleSize, bounceMode, ballSpeed, ballAcceleration, numBalls) {
    // Sélectionner le canvas et le contexte
    const canvas = document.getElementById("webgl1");
    ctx = canvas.getContext("2d");

    // Charger les ressources nécessaires
    loadFont().then((loadedFont) => {
        font = loadedFont;

        maxScore = Math.max(1, Math.min(maxScore, 100));
        paddleSpeed = Math.max(1, Math.min(paddleSpeed, 30));
        paddleSize = Math.max(20, Math.min(paddleSize, 150));
        ballSpeed = Math.max(1, Math.min(ballSpeed, 10));
        ballAcceleration = Math.max(0, Math.min(ballAcceleration, 5));
        numBalls = Math.max(1, Math.min(numBalls, 10));
        if (playerNames.length < 2)
            throw new Error('Not enought players: ' + playerNames.length + '. 2 players minimum.');
        else if (playerNames.length > 10)
            throw new Error('Too many players: ' + playerNames.length + '. 10 players maximum.');

        // Initialiser les paddles
        if (gameMode === 'versus') {
            if (playerNames.length == 3 || playerNames.length > 4)
                throw new Error('Not a good players count: ' + playerNames.length + '. Versus mod take 2 or 4 players.');
            new Versus(canvas, playerNames, ctx, font, maxScore, paddleSpeed, paddleSize, bounceMode, ballSpeed, ballAcceleration, numBalls);
        } else if (gameMode === 'tournament') {
            new Tournament(canvas, playerNames, ctx, font, maxScore, paddleSpeed, paddleSize, bounceMode, ballSpeed, ballAcceleration, numBalls);
        } else if (gameMode === 'lastManStanding') {
            if (playerNames.length > 4)
                throw new Error('Not a good players count: ' + playerNames.length + '. Last Man Standing mod take 2, 3 or 4 players.');
            new LastManStanding(canvas, playerNames, ctx, font, maxScore, paddleSpeed, paddleSize, bounceMode, ballSpeed, ballAcceleration, numBalls);
        } else if (gameMode === 'brickBreaker') {
            if (playerNames.length == 3 || playerNames.length > 4)
                throw new Error('Not a good players count: ' + playerNames.length + '. Bricks mod take 1 or 2 players.');
            new BrickBreaker(canvas, playerNames, ctx, font, maxScore, paddleSpeed, paddleSize, bounceMode, ballSpeed, ballAcceleration, numBalls);
        }
        else
            throw new Error('Unknown game mode: ' + gameMode + '. Available modes are: versus, tournament, lastManStanding, brickBreaker.');

    }).catch((error) => {
        console.error('Error loading assets:', error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    main('versus', ['Adri', 'Dani'], 10, 5, 100, true, 5, 1, 1);
});

// Mode, [players], MaxScore, PaddleSpeed, PaddleSize, BounceMode, BallSpeed, BallAcceleration, numBalls
// 'versus', ['Zalius', 'Fenris'], 10, 5, 100, true, 5, 1, 1




