export class Score {
    constructor(ctx, font, gameArea, player1Name = 'Player 1', player2Name = 'Player 2') {
        this.ctx = ctx;
        this.font = font;
        this.gameArea = gameArea;
        this.player1Name = player1Name;
        this.player2Name = player2Name;
        this.player1Score = 0;
        this.player2Score = 0;
    }

    incrementPlayer1Score() {
        //console.log("player 1 scored")
        this.player1Score += 1;
    }

    incrementPlayer2Score() {
        //console.log("player 2 scored")
        this.player2Score += 1;
    }

    drawScore() {
        this.ctx.font = `30px ${this.font.family}`;
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';

        // Afficher le nom et le score du joueur 1
        this.ctx.fillText(`${this.player1Name}: ${this.player1Score}`, this.ctx.canvas.width / 4, 70);

        // Afficher le nom et le score du joueur 2
        this.ctx.fillText(`${this.player2Name}: ${this.player2Score}`, (3 * this.ctx.canvas.width / 4), 70);
    }

    drawTitle(gameTitle) {
        this.ctx.font = `30px ${this.font.family}`;
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(gameTitle, this.ctx.canvas.width / 2, 50);
    }
}
