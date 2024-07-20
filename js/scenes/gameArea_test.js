/*export class GameArea {
    constructor(width, height, canvas) {
        this.width = width;
        this.height = height;
        this.gameX = (canvas.width - width) / 2;
        this.gameY = (canvas.height - height) / 2;
        this.gameWidth = width;
        this.gameHeight = height;
    }

    clear(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    draw(ctx) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(this.gameX, this.gameY, this.gameWidth, this.gameHeight);
    }
}*/

export class GameArea {
    constructor(numPlayers, canvas) {
        this.numPlayers = numPlayers;
        this.canvas = canvas;
        this.radius = Math.min(canvas.width, canvas.height) / 2 - 50; // Rayon du polygone
        this.centerX = canvas.width / 2;
        this.centerY = canvas.height / 2;
    }

    clear() {
        const ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw(ctx) {
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(this.centerX + this.radius * Math.cos(0), this.centerY + this.radius * Math.sin(0));
        for (let i = 1; i <= this.numPlayers; i++) {
            ctx.lineTo(this.centerX + this.radius * Math.cos(i * 2 * Math.PI / this.numPlayers), this.centerY + this.radius * Math.sin(i * 2 * Math.PI / this.numPlayers));
        }
        ctx.closePath();
        ctx.fill();
    }

    getGoalLines() {
        let goalLines = [];
        for (let i = 0; i < this.numPlayers; i++) {
            const x1 = this.centerX + this.radius * Math.cos(i * 2 * Math.PI / this.numPlayers);
            const y1 = this.centerY + this.radius * Math.sin(i * 2 * Math.PI / this.numPlayers);
            const x2 = this.centerX + this.radius * Math.cos((i + 1) * 2 * Math.PI / this.numPlayers);
            const y2 = this.centerY + this.radius * Math.sin((i + 1) * 2 * Math.PI / this.numPlayers);
            goalLines.push({ x1, y1, x2, y2 });
        }
        return goalLines;
    }

    getBounds(goalLine) {
        return {
            minX: Math.min(goalLine.x1, goalLine.x2),
            maxX: Math.max(goalLine.x1, goalLine.x2),
            minY: Math.min(goalLine.y1, goalLine.y2),
            maxY: Math.max(goalLine.y1, goalLine.y2)
        };
    }
}






