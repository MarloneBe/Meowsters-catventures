export function createPerso(scene) {
    scene.load.spritesheet('player', 'asset/cat_fighter_sprite1.png', { frameWidth: 50, frameHeight: 50 });
}

export function configPerso(scene, placeX, placeY) {
    scene.cameras.main.setZoom(2, 2);
    scene.player = scene.physics.add.sprite(placeX, placeY, "player").setSize(24, 29).setOffset(10, 11);
    scene.cameras.main.startFollow(scene.player);
    scene.player.setDepth(1);
}