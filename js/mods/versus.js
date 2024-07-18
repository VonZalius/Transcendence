import { Paddle } from '../scenes/paddle.js';
import { Ball } from '../scenes/ball.js';
import { setupControls } from '../scenes/controls.js';
import { Score } from '../scenes/score.js';
import { waitForKeyPress } from '../scenes/assets.js';

export class Versus {

    constructor(gameArea, playerNames, ctx, font) {
        this.gameArea = gameArea;
        this.playerNames = playerNames;
        this.ctx = ctx;
        this.isGameOver = false;

        this.playerPaddle = new Paddle(this.gameArea.gameX + 10, this.gameArea.gameY + (this.gameArea.gameHeight - 100) / 2, 10, 100, 'white');
        this.aiPaddle = new Paddle(this.gameArea.gameX + this.gameArea.gameWidth - 20, this.gameArea.gameY + (this.gameArea.gameHeight - 100) / 2, 10, 100, 'white');
        this.score = new Score(ctx, font, gameArea, playerNames[0], playerNames[1]);
        this.ball = new Ball(gameArea.gameX + gameArea.gameWidth / 2, gameArea.gameY + gameArea.gameHeight / 2, 10, 'white', 5);

        this.gameTitle = "Versus Mode"
        this.gameSubtitle = "First to ";
        this.useAngleBounce = true
        this.useAccelerate = true
        this.maxScore = 10;

        this.main();
    }

    main() {
        // Initialiser le jeu
        setupControls(this.playerPaddle, this.aiPaddle);

        this.playerPaddle.resetPosition();
        this.aiPaddle.resetPosition();
        this.isGameOver = false;

        const directions = [
            { x: 1, y: 0.5 },
            { x: 1, y: -0.5 },
            { x: -1, y: 0.5 },
            { x: -1, y: -0.5 }
        ];

        this.gameArea.clear(this.ctx);
        this.gameArea.draw(this.ctx);
        this.playerPaddle.draw(this.ctx);
        this.aiPaddle.draw(this.ctx);
        this.score.drawTitle(this.gameTitle);
        this.score.drawSubtitle(this.gameSubtitle, this.maxScore + 1);
        this.score.drawScore();

        setTimeout(() => {
            this.score.drawFlat("Press any key to start.", 30, 'white', 'center', this.ctx.canvas.width / 2, this.ctx.canvas.width / 2)
            waitForKeyPress(() => {
                this.ball.spawn(this.gameArea, directions);
                this.loop();
            });
        }, 1000);
    }

    loop() {
        if (this.isGameOver) {
            return;  // Arrêter la boucle de jeu si le jeu est terminé
        }
        this.gameArea.clear(this.ctx);
        
        
        
        if (this.ball.x < this.gameArea.gameX) {
            this.score.incrementPlayer2Score();
            const directions = [
                { x: 1, y: 0.5 },
                { x: 1, y: -0.5 }
            ];
            this.ball.spawn(this.gameArea, directions);
        }
        else if (this.ball.x + this.ball.size > this.gameArea.gameX + this.gameArea.gameWidth) {
            this.score.incrementPlayer1Score();
            const directions = [
                { x: -1, y: 0.5 },
                { x: -1, y: -0.5 }
            ];
            this.ball.spawn(this.gameArea, directions);
        }
        
        this.playerPaddle.move(this.gameArea);
        this.aiPaddle.move(this.gameArea);
        this.ball.move(this.gameArea, this.playerPaddle, this.aiPaddle, this.useAngleBounce, this.useAccelerate);
        
        this.gameArea.draw(this.ctx);
        this.playerPaddle.draw(this.ctx);
        this.aiPaddle.draw(this.ctx);
        this.ball.draw(this.ctx);
        this.game_over_screen();
        this.score.drawTitle(this.gameTitle);
        this.score.drawSubtitle(this.gameSubtitle, this.maxScore + 1);
        this.score.drawScore();
        requestAnimationFrame(this.loop.bind(this));
    }

    game_over_screen() {
        if (this.score.player1Score > this.maxScore) {
            this.isGameOver = true;
            this.score.drawEnd(1);
        }
        else if (this.score.player2Score > this.maxScore) {
            this.isGameOver = true;
            this.score.drawEnd(2);
        }
    }
}
