export class Paddle {
    constructor(x, y, width, height, color) {
        this.initialX = x;
        this.initialY = y;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = 5;
        this.up = false;
        this.down = false;
    }

    move(gameArea) {
        if (this.up && this.y > gameArea.gameY) {
            this.y -= this.speed;
        }
        if (this.down && this.y + this.height < gameArea.gameY + gameArea.gameHeight) {
            this.y += this.speed;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    resetPosition() {
        this.x = this.initialX;
        this.y = this.initialY;
    }
}

