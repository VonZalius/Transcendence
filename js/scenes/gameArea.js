export class GameArea {
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
}

