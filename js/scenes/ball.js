export class Ball {
    constructor(x, y, size, color, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speed = speed
        this.speedX = speed;
        this.speedY = speed;
        this.isMoving = false;
    }

    move(gameArea, playerPaddle, aiPaddle, useAngleBounce) {
        if (this.isMoving) {
            this.x += this.speedX;
            this.y += this.speedY;

            // Rebondir sur le mur supérieur et inférieur
            if (this.y <= gameArea.gameY || this.y + this.size >= gameArea.gameY + gameArea.gameHeight) {
                this.speedY = -this.speedY;
            }

            // Rebondir sur les paddles
            if (
                this.speedX < 0 && // Balle se déplace vers la gauche
                this.x <= playerPaddle.x + playerPaddle.width && 
                this.x + this.size >= playerPaddle.x && 
                this.y + this.size >= playerPaddle.y && 
                this.y <= playerPaddle.y + playerPaddle.height
            ) {
                if (useAngleBounce) {
                    this.angleBounce(playerPaddle);
                } else {
                    this.speedX = -this.speedX;
                }
            } else if (
                this.speedX > 0 && // Balle se déplace vers la droite
                this.x + this.size >= aiPaddle.x && 
                this.x <= aiPaddle.x + aiPaddle.width && 
                this.y + this.size >= aiPaddle.y && 
                this.y <= aiPaddle.y + aiPaddle.height
            ) {
                if (useAngleBounce) {
                    this.angleBounce(aiPaddle);
                } else {
                    this.speedX = -this.speedX;
                }
            }
        }
    }

    angleBounce(paddle) {
        let relativeIntersectY = (paddle.y + (paddle.height / 2)) - (this.y + (this.size / 2));
        let normalizedRelativeIntersectionY = relativeIntersectY / (paddle.height / 2);
        let bounceAngle = normalizedRelativeIntersectionY * Math.PI / 4; // Max 45 degrees

        if (this.speedX < 0) { // Balle se déplace vers la gauche
            this.speedX = this.speed * Math.cos(bounceAngle);
        } else { // Balle se déplace vers la droite
            this.speedX = -this.speed * Math.cos(bounceAngle);
        }
        this.speedY = this.speed * -Math.sin(bounceAngle);
    }

    spawn(gameArea, directions) {
        // Positionner la balle au centre
        this.x = gameArea.gameX + gameArea.gameWidth / 2;
        this.y = gameArea.gameY + gameArea.gameHeight / 2;

        // Choisir une direction aléatoire parmi les directions fournies
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        this.speedX = randomDirection.x * this.speed;
        this.speedY = randomDirection.y * this.speed;

        // Arrêter le mouvement initialement
        this.isMoving = false;

        // Démarrer le mouvement après 2 secondes
        setTimeout(() => {
            this.isMoving = true;
        }, 2000);
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}


