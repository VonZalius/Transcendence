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

    reset() {
        this.player1Score = 0;
        this.player2Score = 0;
    }

    drawFlat(text, px, color, align, x, y) {
        this.ctx.font = `${px}px ${this.font.family}`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = align;
        this.ctx.fillText(text, x, y);
    }

    drawTitle(gameTitle) {
        this.ctx.font = `30px ${this.font.family}`;
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(gameTitle, this.ctx.canvas.width / 2, 50);
    }

    drawSubtitle(gameSubtitle, maxScore) {
        this.ctx.font = `20px ${this.font.family}`;
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(gameSubtitle + maxScore, this.ctx.canvas.width / 2, 80);
    }

    drawEnd(winningPLayer) {
        this.ctx.font = `30px ${this.font.family}`;
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        if (winningPLayer == 1)
            this.ctx.fillText(`${this.player1Name} just won the game !`, this.ctx.canvas.width / 2, this.ctx.canvas.width / 2 - 50);
        if (winningPLayer == 2)
            this.ctx.fillText(`${this.player2Name} just won the game !`, this.ctx.canvas.width / 2, this.ctx.canvas.width / 2 - 50);
    }

    drawScore() {
        this.ctx.font = `30px ${this.font.family}`;
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';

        // Afficher le nom et le score du joueur 1
        this.ctx.fillText(`${this.player1Name}: ${this.player1Score}`, this.ctx.canvas.width / 4, 120);

        // Afficher le nom et le score du joueur 2
        this.ctx.fillText(`${this.player2Name}: ${this.player2Score}`, (3 * this.ctx.canvas.width / 4), 120);
    }

    drawTournamentScore(wins, round, activePlayers) {
        const startX = this.gameArea.gameX + this.gameArea.gameWidth / 2;
        let startY = this.gameArea.gameY + this.gameArea.gameHeight + 40;
    
        this.ctx.font = `20px ${this.font.family}`;
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';

        this.ctx.fillText(`Round ${round}`, startX, startY);
        startY += 30;
    
        for (const [player, winCount] of Object.entries(wins)) {
            if (activePlayers.includes(player)) {
                this.ctx.fillText(`${player}: ${winCount} wins`, startX, startY);
            } else {
                this.ctx.fillText(`${player}: ${winCount} wins`, startX, startY); 
                this.ctx.beginPath();
                this.ctx.moveTo(startX - 60, startY - 10);
                this.ctx.lineTo(startX + 60, startY - 10);
                this.ctx.strokeStyle = 'white';
                this.ctx.stroke();
            }
            startY += 30; // Espace entre les lignes
        }
    }

    drawTournamentEnd(winner) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.font = `50px ${this.font.family}`;
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`${winner} wins the tournament!`, this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
    }
}
