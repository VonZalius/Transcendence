import { Paddle } from '../scenes/paddle.js';
import { Ball } from '../scenes/ball.js';
import { setupControls } from '../scenes/controls.js';

export class Tournament {

    constructor(gameArea, playerNames, ctx, font) {
        this.gameArea = gameArea;
        this.playerNames = playerNames;
        this.ctx = ctx;
        this.font = font;

        this.playerPaddle = new Paddle(this.gameArea.gameX + 10, this.gameArea.gameY + (this.gameArea.gameHeight - 100) / 2, 10, 100, 'white');
        this.aiPaddle = new Paddle(this.gameArea.gameX + this.gameArea.gameWidth - 20, this.gameArea.gameY + (this.gameArea.gameHeight - 100) / 2, 10, 100, 'white');

        this.ball = new Ball(gameArea.gameX + gameArea.gameWidth / 2, gameArea.gameY + gameArea.gameHeight / 2, 10, 'white', 10);

        this.gameTitle = "Tournament Mode"
        this.useAngleBounce = false

        this.main();
    }

    main() {
        // Initialiser le jeu
        setupControls(this.playerPaddle, this.aiPaddle);
        this.loop();  // Commencer la boucle de jeu
    }

    loop() {
        this.gameArea.clear(this.ctx);
        this.drawTitle();
        this.playerPaddle.move(this.gameArea);
        this.aiPaddle.move(this.gameArea);
        this.ball.move(this.gameArea, this.playerPaddle, this.aiPaddle, this.useAngleBounce);
        this.gameArea.draw(this.ctx);
        this.playerPaddle.draw(this.ctx);
        this.aiPaddle.draw(this.ctx);
        this.ball.draw(this.ctx);
        requestAnimationFrame(this.loop.bind(this));  // Appelle la fonction gameLoop avant le prochain repaint
    }

    drawTitle() {
        this.ctx.font = `30px ${this.font.family}`;
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(this.gameTitle, this.ctx.canvas.width / 2, 50);
    }

    // Ajoutez des méthodes supplémentaires ici si nécessaire
}
