import { MyAnimations, StartAnimations } from "./MyAnimations.js";
import { createPerso, configPerso } from "./perso.js";
import { Chrono } from "./Chrono.js";
import { CreatePopUp, showPopUp } from "./Text.js";
import { updatePopUpPosition } from "./Text.js";
import { togglePause } from "./Pause.js";

let chronoTexte;
let monTimer;
let chrono = 0;

class Example extends Phaser.Scene {
    preload() {
        this.load.image('red', 'asset/Object_4.png');
        this.load.image('blast', 'asset/image13.png');
        this.load.image('portal', 'asset/portal.png');
        this.load.image('tuileDeJeu', 'maps/tileset.png');
        this.load.image('tuile_volcan', 'maps/volcanoTile.png')
        this.load.tilemapTiledJSON("carte_lave", "maps/map_lave.json");
        this.load.audio('music', 'music/level.mp3');
        createPerso(this);
    }

    create() {

        this.input.keyboard.on('keydown-ESC', () => {
            togglePause(this);
        });
        
        this.music = this.sound.add('music', {
            loop: true,
            volume: 0.5
        });
        this.music.play();

        monTimer = this.time.addEvent({
            delay: 1000,
            callback: compteUneSeconde,
            callbackScope: this,
            loop: true
      });

      function compteUneSeconde () {
        chrono= chrono+1;
        chronoTexte.setText("Chrono: "+ chrono);
    }  

    chronoTexte = this.add.text(10, 50, "Chrono: 0", {
        fontSize: "10px",
        fill: "#FFFFFF"
    });
    chronoTexte.setScrollFactor(0);
    chronoTexte.setDepth(2);

        configPerso(this, 50, 150);

        //CREATION DE LA MAP
        const carteDuNiveau = this.add.tilemap("carte_lave");
        this.cameras.main.setBounds(0, 0, carteDuNiveau.widthInPixels, carteDuNiveau.heightInPixels);

        //Chargement des tiles pour afficher les éléments
        const Tileset = carteDuNiveau.addTilesetImage(
            "tuiles_volcan",
            "tuile_volcan"
        );
        const Tileset2 = carteDuNiveau.addTilesetImage(
            "tuile_de_jeu",
            "tuileDeJeu"
        );

        const Tile_fond = carteDuNiveau.createLayer(
            "fond",
            Tileset2
        );
        const Tile_platforms = carteDuNiveau.createLayer(
            "plateformes",
            Tileset
        );

        this.portal = this.physics.add.image(1550, 470, "portal");
        this.portal.setDepth(1);
        this.portal.body.setImmovable(true);
        this.portal.body.setAllowGravity(false);
        this.portal.body.setSize(70, 70);

        Tile_platforms.setCollisionByProperty({ estSolide: true });
        this.canJump = false;
        this.physics.add.collider(this.player, Tile_platforms, checkLavaCollision, null, this);

        function checkLavaCollision(player, tile) {
            this.canJump = true;

            const tileProperties = Tileset.getTileProperties(tile.index);

            if (tileProperties && tileProperties.estLave) {
                location.reload();
                alert("joueur mort, skill issue");
                tileProperties.estLave = false;
            }
        }

        CreatePopUp(this, "niveau3.html", "niveau suivant");
        this.physics.add.collider(this.player, this.portal, () => {
            showPopUp(this, chrono);
        });

        this.blast = this.add.image(0, 0, 'blast');
        this.blast.visible = false;

        this.player.setCollideWorldBounds(true);

        MyAnimations(this);
    }

    update() {
        StartAnimations(this);
        updatePopUpPosition(this);
    }
}

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: Example,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
        }
    }
};

const game = new Phaser.Game(config);