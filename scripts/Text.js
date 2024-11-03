export function CreatePopUp(scene, nextLevel, textNextLevel) {
    scene.popupText = scene.add.text(
        1100,
        scene.player.y - 100,
        'Fin de niveau', {
        fontSize: '24px',
        fill: '#ffffff',
        stroke: "#000",
        strokeThickness: 2
    }).setOrigin(0.5).setVisible(false);

    scene.popupText2 = scene.add.text(
        1100,
        scene.player.y - 120,
        'Temps = 0', {
        fontSize: '24px',
        fill: '#ffffff',
        stroke: "#000",
        strokeThickness: 2
    }).setOrigin(0.5).setVisible(false);

    scene.closeButton = scene.add.text(
        1100,
        scene.player.y + 50,
        textNextLevel, {
        fontSize: '18px',
        fill: '#00ff00',
        stroke: "#000",
        strokeThickness: 2
    }).setOrigin(0.5).setVisible(false).setInteractive();

    scene.closeButton.on('pointerdown', () => {
        scene.popupText.setVisible(false);
        scene.popupText2.setVisible(false);
        scene.closeButton.setVisible(false);
    });

    scene.closeButton.on('pointerdown', () => {
        window.location.href = `./${nextLevel}`;
    });
}

export function showPopUp(scene, chrono) {
    
    scene.popupText.setText("Fin de niveau ");
    scene.popupText2.setText(`Temps = ${chrono}s`)

    scene.popupText.setVisible(true);
    scene.popupText2.setVisible(true);
    scene.closeButton.setVisible(true);
    scene.physics.pause();
    scene.input.keyboard.enabled = false;
}

export function updatePopUpPosition(scene) {
    if (scene.popupText.visible) {
        scene.popupText.setPosition(1100, scene.scale.height / 3 - 100);
        scene.popupText2.setPosition(1100, scene.scale.height / 3 - 70);
        scene.closeButton.setPosition(1100, scene.scale.height / 3 - 40);
    }
}