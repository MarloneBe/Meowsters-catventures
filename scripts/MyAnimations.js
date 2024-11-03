export function MyAnimations(scene) {
    scene.anims.create({
        key: 'idle',
        frames: scene.anims.generateFrameNumbers('player', { start: 1, end: 2 }),
        frameRate: 4,
        repeat: -1
    });

    scene.anims.create({
        key: 'run',
        frames: scene.anims.generateFrameNumbers('player', { start: 3, end: 4 }),
        frameRate: 5,
        repeat: -1
    });

    scene.anims.create({
        key: 'attack',
        frames: scene.anims.generateFrameNumbers('player', { start: 14, end: 15 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: "jump",
        frames: scene.anims.generateFrameNumbers('player', { start: 23, end: 24 }),
        frameRate: 7,
        repeat: 0
    });
    scene.attackKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    scene.leftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    scene.rightKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    scene.jumpKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

    scene.isAttacking = false;
    scene.isJumping = false;
    scene.isOnGround = true;
    scene.isRunning = false;
    scene.isLeft = false;

}

export function StartAnimations(scene) {
    
    //vérifier si le perso saute ou pas
    if (scene.player.body.velocity.y !== 0)
        scene.isJumping = true;
    else
        scene.isJumping = false;

    const key = scene.input.keyboard.createCursorKeys();


    //animations de course et arrêt
    if (!scene.isAttacking) {
        if(scene.rightKey.isDown && scene.leftKey.isDown){
            scene.player.setVelocityX(0);
            scene.isRunning = false;
            if (!scene.isJumping)
                scene.player.anims.play('idle', true);
        }
        else if (scene.rightKey.isDown) {
            scene.isRunning = true;
            if (scene.isLeft) {
                scene.isLeft = false;
                scene.player.flipX = false;
                scene.player.setOffset(10, 11);
            }
            scene.player.setVelocityX(160);
            if (!scene.isJumping)
                scene.player.anims.play('run', true);
        } else if (scene.leftKey.isDown) {
            if (!scene.isLeft) {
                scene.isLeft = true;
                scene.player.flipX = true;
                scene.player.setOffset(15, 11);
            }
            scene.player.setVelocityX(-160);
            scene.isRunning = true;
            if (!scene.isJumping)
                scene.player.anims.play('run', true);
        } else {
            scene.player.setVelocityX(0);
            scene.isRunning = false;
            if (!scene.isJumping)
                scene.player.anims.play('idle', true);
        }
    }

    // animation de saut
    if (scene.jumpKey.isDown && scene.canJump == true) {
        scene.isJumping = true;
        scene.player.setVelocityY(-150);
        scene.player.anims.play("jump", true);
        scene.canJump = false;
    }
    else
        scene.isJumping = false;

    //animation d'attaque
    if (scene.attackKey.isDown && !scene.isAttacking) {
        scene.isAttacking = true;
        scene.player.anims.play('attack', true);
        scene.blast.x = scene.player.x + 30;
        scene.blast.y = scene.player.y;
        scene.blast.visible = true;

        if (!scene.isLeft) {
            scene.blast.flipX = false;
            scene.tweens.add({
                targets: scene.blast,
                x: scene.blast.x + 500,
                duration: 1000,
                onComplete: () => {
                    scene.blast.visible = false;
                }
            });
        }

        if (scene.isLeft) {
            scene.blast.flipX = true;
            scene.tweens.add({
                targets: scene.blast,
                x: scene.blast.x - 500,
                duration: 1000,
                onComplete: () => {
                    scene.blast.visible = false;
                }
            });
        }

        scene.player.on('animationcomplete-attack', () => {
            scene.isAttacking = false;
        });
    }
}