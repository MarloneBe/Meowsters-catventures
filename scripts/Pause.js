let isPaused = false;
let pauseText;
let continueButton;
let menuButton;
let background;

export function togglePause(scene) {
    if (isPaused) {
        resumeGame(scene);
    } else {
        pauseGame(scene);
    }
}

function pauseGame(scene) {
    scene.physics.pause();

    createPauseMenu(scene);
    isPaused = true;
}

function resumeGame(scene) {
    scene.physics.resume();

    hidePauseMenu(scene);
    isPaused = false;
}

function createPauseMenu(scene) {
    const player = scene.player;
    let centerX;
    let centerY;
    
    if(player.x < 500)
        centerX = 450;
    else if (player.x > 1100)
        centerX = 1100;
    else
        centerX = player.x;

    if(player.y > 350)
        centerY = (scene.cameras.main.height / 2) - 100;
    else if (player.y < 200)
        centerY = (scene.cameras.main.height / 2) - 300;
    else
        centerY = (scene.cameras.main.height / 2) - 200;

    background = scene.add.rectangle(0, 0, 5000, 1500, 0x000000, 0.5).setOrigin(0.5);
    background.setDepth(5);
    
    pauseText = scene.add.text(centerX, centerY - 100, 'Pause', { fontSize: '32px', fill: '#ffffff', stroke: "#000", strokeThickness: 2 }).setOrigin(0.5);
    pauseText.setDepth(5);
    
    continueButton = scene.add.text(centerX, centerY, 'Continuer', { fontSize: '24px', fill: '#ffffff', stroke: "#000", strokeThickness: 2 })
        .setOrigin(0.5)
        .setInteractive();

    continueButton.on('pointerdown', () => {
        resumeGame(scene);
    });
    continueButton.setDepth(5);

    menuButton = scene.add.text(centerX, centerY + 100, 'Menu principal', { fontSize: '24px', fill: '#00ff00', stroke: "#000", strokeThickness: 2 })
        .setOrigin(0.5)
        .setInteractive();
    menuButton.setDepth(5);
    menuButton.on('pointerdown', () => {
        window.location.href = `./index.html`;
    });
}

function hidePauseMenu(scene) {
    if (background) background.setVisible(false);
    if (pauseText) pauseText.setVisible(false);
    if (continueButton) continueButton.setVisible(false);
    if (menuButton) menuButton.setVisible(false);
}

export function isGamePaused() {
    return isPaused;
}
