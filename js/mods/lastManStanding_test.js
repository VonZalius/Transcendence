import { GameArea } from '../scenes/gameArea.js';
import { Paddle } from '../scenes/paddle.js';
import { Ball } from '../scenes/ball.js';
import { setupControls } from '../scenes/controls.js';
import { Score } from '../scenes/score.js';
import { waitForKeyPress } from '../scenes/assets.js';

export class LastManStanding {
    constructor(playerNames, ctx, font, maxScore, paddleSpeed, paddleSize, bounceMode, ballSpeed, ballAcceleration, numBalls, canvas) {
        this.gameArea = new GameArea(playerNames.length, canvas);
        this.playerNames = playerNames;
        this.ctx = ctx;
        this.font = font;
        this.isGameOver = false;
        this.paddles = [];
        this.balls = [];
        this.numPlayers = playerNames.length;

        this.initPaddles(playerNames, paddleSize, paddleSpeed);
        this.initBalls(numBalls, ballSpeed, bounceMode, ballAcceleration);

        this.score = new Score(ctx, font, this.gameArea, playerNames);

        this.gameTitle = "Last Man Standing";
        this.gameSubtitle = "First to ";
        this.maxScore = maxScore - 1;

        this.main();
    }

    initPaddles(playerNames, paddleSize, paddleSpeed) {
        const goalLines = this.gameArea.getGoalLines();
        for (let i = 0; i < this.numPlayers; i++) {
            const { x1, y1, x2, y2 } = goalLines[i];
            const x = (x1 + x2) / 2;
            const y = (y1 + y2) / 2;
            const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI + 90;
            const paddle = new Paddle(x, y, paddleSize / 10, paddleSize, 'white', paddleSpeed, goalLines[i], angle);
            paddle.bounds = this.gameArea.getBounds(goalLines[i]);
            this.paddles.push(paddle);
        }
    }

    initBalls(numBalls, ballSpeed, bounceMode, ballAcceleration) {
        const centerX = this.gameArea.centerX;
        const centerY = this.gameArea.centerY;
        const spacing = 15; // Espace entre les balles

        for (let i = 0; i < numBalls; i++) {
            const yOffset = Math.pow(-1, i) * Math.ceil(i / 2) * spacing;
            this.balls.push(new Ball(centerX, centerY, 10, 'white', ballSpeed, bounceMode, ballAcceleration, yOffset));
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

        this.gameArea.clear(); // Utilisation de la méthode clear
        this.gameArea.draw(this.ctx);
        this.drawAllPaddles();
        this.score.drawTitle(this.gameTitle);
        this.score.drawSubtitle(this.gameSubtitle, this.maxScore + 1);
        this.score.drawScore();

        setTimeout(() => {
            this.score.drawFlat("Press any key to start.", 30, 'white', 'center', this.ctx.canvas.width / 2, this.ctx.canvas.width / 2);
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
        this.gameArea.clear();

        this.balls.forEach(ball => {
            ball.move(this.gameArea, this.paddles);
            if (this.checkGoal(ball)) {
                const directions = [
                    { x: 1, y: 0.5 },
                    { x: 1, y: -0.5 }
                ];
                ball.spawn(this.gameArea, directions);
            }
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

    checkGoal(ball) {
        const goalLines = this.gameArea.getGoalLines();
        for (let i = 0; i < goalLines.length; i++) {
            const { x1, y1, x2, y2 } = goalLines[i];
            if (ball.x >= Math.min(x1, x2) && ball.x <= Math.max(x1, x2) && ball.y >= Math.min(y1, y2) && ball.y <= Math.max(y1, y2)) {
                this.score.incrementPlayerScore(i);
                return true;
            }
        }
        return false;
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
        const maxScore = Math.max(...this.score.scores);
        if (maxScore > this.maxScore) {
            this.isGameOver = true;
            const winnerIndex = this.score.scores.indexOf(maxScore);
            this.score.drawEnd(winnerIndex + 1);
        }
    }
}


