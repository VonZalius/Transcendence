export class Ball {
    constructor(x, y, size, color, speed, bounceMode, ballAcceleration) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.baseSpeed = speed;
        this.speed = speed;
        this.speedX = speed;
        this.speedY = speed;
        this.accelerationFactor = ballAcceleration;
        this.isMoving = false;
        this.useAngleBounce = bounceMode;
    }

    move(gameArea, playerPaddle, aiPaddle) {
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
                this.accelerate();
                if (this.useAngleBounce) {
                    this.angleBounce(playerPaddle);
                } else {
                    this.speedX = this.speed;
                }
            } else if (
                this.speedX > 0 && // Balle se déplace vers la droite
                this.x + this.size >= aiPaddle.x && 
                this.x <= aiPaddle.x + aiPaddle.width && 
                this.y + this.size >= aiPaddle.y && 
                this.y <= aiPaddle.y + aiPaddle.height
            ) {
                this.accelerate();
                if (this.useAngleBounce) {
                    this.angleBounce(aiPaddle);
                } else {
                    this.speedX = -this.speed;
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
        this.speed = this.baseSpeed;

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

    accelerate() {
        this.speed += this.accelerationFactor;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}


