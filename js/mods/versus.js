
import { Paddle } from '../scenes/paddle.js';
import { Ball } from '../scenes/ball.js';
import { setupControls } from '../scenes/controls.js';
import { Score } from '../scenes/score.js';
import { waitForKeyPress } from '../scenes/assets.js';

export class Versus {

    constructor(gameArea, playerNames, ctx, font, maxScore, paddleSpeed, paddleSize, bounceMode, ballSpeed, ballAcceleration, numBalls) {
        this.gameArea = gameArea;
        this.playerNames = playerNames;
        this.ctx = ctx;
        this.isGameOver = false;
        this.paddles = [];
        this.balls = [];

        this.initPaddles(playerNames, paddleSize, paddleSpeed);
        this.initBalls(numBalls, ballSpeed, bounceMode, ballAcceleration);

        const team1Names = `${playerNames[0]} & ${playerNames[2]}`;
        const team2Names = `${playerNames[1]} & ${playerNames[3]}`;

        this.score = new Score(ctx, font, gameArea, team1Names, team2Names);

        this.gameTitle = "Versus Mode"
        this.gameSubtitle = "First to ";
        this.maxScore = maxScore - 1;

        this.main();
    }

    initPaddles(playerNames, paddleSize, paddleSpeed) {
        const positions = [
            { x: this.gameArea.gameX + 10, y: this.gameArea.gameY + (this.gameArea.gameHeight - 100) / 2 },
            { x: this.gameArea.gameX + this.gameArea.gameWidth - 20, y: this.gameArea.gameY + (this.gameArea.gameHeight - 100) / 2 },
            { x: this.gameArea.gameX + 30, y: this.gameArea.gameY + (this.gameArea.gameHeight - 100) / 2 },
            { x: this.gameArea.gameX + this.gameArea.gameWidth - 40, y: this.gameArea.gameY + (this.gameArea.gameHeight - 100) / 2 }
        ];

        for (let i = 0; i < playerNames.length; i++) {
            const pos = positions[i];
            this.paddles.push(new Paddle(pos.x, pos.y, paddleSize / 10, paddleSize, 'white', paddleSpeed));
        }
    }

    initBalls(numBalls, ballSpeed, bounceMode, ballAcceleration) {
        const centerX = this.gameArea.gameX + this.gameArea.gameWidth / 2;
        const centerY = this.gameArea.gameY + this.gameArea.gameHeight / 2;
        const spacing = 15; // Espace entre les balles

        for (let i = 0; i < numBalls; i++) {
            const yOffset = Math.pow(-1, i) * Math.ceil(i / 2) * spacing;
            this.balls.push(new Ball(centerX, centerY + yOffset, 10, 'white', ballSpeed, bounceMode, ballAcceleration, yOffset));
        }
    }

    main() {
        setupControls(...this.paddles);

        this.resetPaddles();

        this.isGameOver = false;

        const directions = [
            { x: 1, y: 0.5 },
            { x: 1, y: -0.5 },
            { x: -1, y: 0.5 },
            { x: -1, y: -0.5 }
        ];

        this.gameArea.clear(this.ctx);
        this.gameArea.draw(this.ctx);
        this.drawAllPaddles();
        this.score.drawTitle(this.gameTitle);
        this.score.drawSubtitle(this.gameSubtitle, this.maxScore + 1);
        this.score.drawScore();

        setTimeout(() => {
            this.score.drawFlat("Press any key to start.", 30, 'white', 'center', this.ctx.canvas.width / 2, this.ctx.canvas.width / 2)
            waitForKeyPress(() => {
                this.balls.forEach(ball => ball.spawn(this.gameArea, directions));
                this.loop();
            });
        }, 1000);
    }

    loop() {
        if (this.isGameOver) {
            return;  // Arrêter la boucle de jeu
        }
        this.gameArea.clear(this.ctx);

        this.balls.forEach(ball => {
            if (ball.x < this.gameArea.gameX) {
                this.score.incrementPlayer2Score();
                const directions = [
                    { x: 1, y: 0.5 },
                    { x: 1, y: -0.5 }
                ];
                ball.spawn(this.gameArea, directions);
            } else if (ball.x + ball.size > this.gameArea.gameX + this.gameArea.gameWidth) {
                this.score.incrementPlayer1Score();
                const directions = [
                    { x: -1, y: 0.5 },
                    { x: -1, y: -0.5 }
                ];
                ball.spawn(this.gameArea, directions);
            }

            ball.move(this.gameArea, this.paddles);
        });

        this.moveAllPaddles();
        this.gameArea.draw(this.ctx);
        this.drawAllPaddles();
        this.balls.forEach(ball => ball.draw(this.ctx));
        this.game_over_screen();
        this.score.drawTitle(this.gameTitle);
        this.score.drawSubtitle(this.gameSubtitle, this.maxScore + 1);
        this.score.drawScore();
        requestAnimationFrame(this.loop.bind(this));
    }

    resetPaddles() {
        this.paddles.forEach(paddle => paddle.resetPosition());
    }

    moveAllPaddles() {
        this.paddles.forEach(paddle => paddle.move(this.gameArea));
    }

    drawAllPaddles() {
        this.paddles.forEach(paddle => paddle.draw(this.ctx));
    }

    game_over_screen() {
        if (this.score.player1Score > this.maxScore) {
            this.isGameOver = true;
            this.score.drawEnd(1);
        } else if (this.score.player2Score > this.maxScore) {
            this.isGameOver = true;
            this.score.drawEnd(2);
        }
    }
}
