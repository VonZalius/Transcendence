import { Paddle } from '../scenes/paddle.js';
import { Ball } from '../scenes/ball.js';
import { setupControls } from '../scenes/controls.js';
import { Score } from '../scenes/score.js';
import { waitForKeyPress } from '../scenes/assets.js';

export class Tournament {

    constructor(gameArea, playerNames, ctx, font, maxScore, paddleSpeed, paddleSize, bounceMode, ballSpeed, ballAcceleration) {
        this.gameArea = gameArea;
        this.playerNames = playerNames;
        this.ctx = ctx;
        this.font = font;
        this.isGameOver = false;

        this.player1Paddle = new Paddle(this.gameArea.gameX + 10, this.gameArea.gameY + (this.gameArea.gameHeight - 100) / 2, paddleSize / 10, paddleSize, 'white', paddleSpeed);
        this.player2Paddle = new Paddle(this.gameArea.gameX + this.gameArea.gameWidth - 20, this.gameArea.gameY + (this.gameArea.gameHeight - 100) / 2, paddleSize / 10, paddleSize, 'white', paddleSpeed);
        this.score = new Score(ctx, font, gameArea, playerNames[0], playerNames[1]);
        this.ball = new Ball(gameArea.gameX + gameArea.gameWidth / 2, gameArea.gameY + gameArea.gameHeight / 2, 10, 'white', ballSpeed, bounceMode, ballAcceleration);

        this.currentMatch = 0;
        this.round = 1;
        this.matches = this.createAllMatches(playerNames);
        this.wins = this.initializeWins(playerNames);
        this.activePlayers = playerNames.slice();

        this.gameTitle = "Tournament Mode";
        this.gameSubtitle = "First to ";
        this.useAngleBounce = true;
        this.useAccelerate = true;
        this.maxScore = maxScore - 1;


        this.main();
    }

    initializeWins(playerNames) {
        let wins = {};
        for (let name of playerNames) {
            wins[name] = 0;
        }
        return wins;
    }

    createAllMatches(playerNames) {
        let matches = [];
        for (let i = 0; i < playerNames.length; i++) {
            for (let j = i + 1; j < playerNames.length; j++) {
                matches.push([playerNames[i], playerNames[j]]);
            }
        }
        return this.shuffle(matches); // Mélanger les matchs
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    main() {
        setupControls(this.player1Paddle, this.player2Paddle);
        this.startMatch();

    }

    startMatch() {
        if (this.currentMatch >= this.matches.length) {
            this.setupNextRound();
            return;
        }

        this.player1Paddle.resetPosition();
        this.player2Paddle.resetPosition();
        this.score.reset();
        this.isGameOver = false;
        this.score.player1Name = this.matches[this.currentMatch][0];
        this.score.player2Name = this.matches[this.currentMatch][1];
        const directions = [
            { x: 1, y: 0.5 },
            { x: 1, y: -0.5 },
            { x: -1, y: 0.5 },
            { x: -1, y: -0.5 }
        ];

        this.gameArea.clear(this.ctx);
        this.gameArea.draw(this.ctx);
        this.player1Paddle.draw(this.ctx);
        this.player2Paddle.draw(this.ctx);
        this.score.drawTitle(this.gameTitle);
        this.score.drawSubtitle(this.gameSubtitle, this.maxScore + 1);
        this.score.drawScore();
        this.score.drawTournamentScore(this.wins, this.round, this.activePlayers);
        
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
            return;
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
        
        this.player1Paddle.move(this.gameArea);
        this.player2Paddle.move(this.gameArea);
        this.ball.move(this.gameArea, this.player1Paddle, this.player2Paddle, this.useAngleBounce, this.useAccelerate);
        
        this.gameArea.draw(this.ctx);
        this.player1Paddle.draw(this.ctx);
        this.player2Paddle.draw(this.ctx);
        this.ball.draw(this.ctx);
        this.game_over_screen();
        this.score.drawTitle(this.gameTitle);
        this.score.drawSubtitle(this.gameSubtitle, this.maxScore + 1);
        this.score.drawScore();
        this.score.drawTournamentScore(this.wins, this.round, this.activePlayers);
        requestAnimationFrame(this.loop.bind(this));
    }

    game_over_screen() {
        if (this.score.player1Score > this.maxScore) {
            this.isGameOver = true;
            this.score.drawEnd(1);
            setTimeout(() => {
                this.score.drawFlat("Press any key.", 20, 'white', 'center', this.ctx.canvas.width / 2, this.ctx.canvas.width / 2 + 50)
                waitForKeyPress(() => {
                    this.advanceTournament(this.score.player1Name);
                });
            }, 2000);
        }
        else if (this.score.player2Score > this.maxScore) {
            this.isGameOver = true;
            this.score.drawEnd(2);
            setTimeout(() => {
                this.score.drawFlat("Press any key.", 20, 'white', 'center', this.ctx.canvas.width / 2, this.ctx.canvas.width / 2 + 50)
                waitForKeyPress(() => {
                    this.advanceTournament(this.score.player2Name);
                });
            }, 2000);
        }
    }

    advanceTournament(winner) {
        this.wins[winner]++;
        this.currentMatch++;

        if (this.currentMatch < this.matches.length) {
            this.startMatch();
        } else {
            this.setupNextRound();
        }
    }

    setupNextRound() {
        let maxWins = Math.max(...Object.values(this.wins));
        let topPlayers = Object.keys(this.wins).filter(player => this.wins[player] === maxWins);

        if (topPlayers.length === 1) {
            this.score.drawTournamentEnd(topPlayers[0]);
            this.score.drawTournamentScore(this.wins, this.round, this.activePlayers);
        } else {
            this.matches = this.createAllMatches(topPlayers);
            this.currentMatch = 0;
            this.activePlayers = topPlayers;
            this.round++;
            this.startMatch();
        }
    }
}

