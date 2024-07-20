/*export class Paddle {
    constructor(x, y, width, height, color, speed) {
        this.initialX = x;
        this.initialY = y;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
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
}*/

export class Paddle {
    constructor(x, y, width, height, color, speed, goalLine, angle) {
        this.initialX = x;
        this.initialY = y;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
        this.goalLine = goalLine;
        this.angle = angle; // Ajout de l'angle d'orientation
        this.up = false;
        this.down = false;
        this.bounds = this.calculateBounds(goalLine);
    }

    calculateBounds(goalLine) {
        return {
            minX: Math.min(goalLine.x1, goalLine.x2),
            maxX: Math.max(goalLine.x1, goalLine.x2),
            minY: Math.min(goalLine.y1, goalLine.y2),
            maxY: Math.max(goalLine.y1, goalLine.y2)
        };
    }

    move(gameArea) {
        const angleRad = this.angle * Math.PI / 180;
        if (this.up) {
            this.x -= this.speed * Math.sin(angleRad);
            this.y += this.speed * Math.cos(angleRad);
        }
        if (this.down) {
            this.x += this.speed * Math.sin(angleRad);
            this.y -= this.speed * Math.cos(angleRad);
        }

        // Conserver les paddles dans les limites du jeu
        this.x = Math.max(this.bounds.minX, Math.min(this.bounds.maxX, this.x));
        this.y = Math.max(this.bounds.minY, Math.min(this.bounds.maxY, this.y));
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }

    resetPosition() {
        this.x = this.initialX;
        this.y = this.initialY;
        this.bounds = this.calculateBounds(this.goalLine); // Réinitialiser les limites
    }

    isWithinBounds() {
        return this.x >= this.bounds.minX && this.x + this.width <= this.bounds.maxX && this.y >= this.bounds.minY && this.y + this.height <= this.bounds.maxY;
    }
}








