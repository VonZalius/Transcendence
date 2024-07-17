export function setupControls(playerPaddle, aiPaddle) {
    document.addEventListener("keydown", (evt) => {
        switch (evt.key) {
            case "w":
                playerPaddle.up = true;
                break;
            case "s":
                playerPaddle.down = true;
                break;
            case "ArrowUp":
                aiPaddle.up = true;
                break;
            case "ArrowDown":
                aiPaddle.down = true;
                break;
        }
    });

    document.addEventListener("keyup", (evt) => {
        switch (evt.key) {
            case "w":
                playerPaddle.up = false;
                break;
            case "s":
                playerPaddle.down = false;
                break;
            case "ArrowUp":
                aiPaddle.up = false;
                break;
            case "ArrowDown":
                aiPaddle.down = false;
                break;
        }
    });
}

