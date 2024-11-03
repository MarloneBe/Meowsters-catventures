import { MyAnimations, StartAnimations } from "./MyAnimations.js";
import { createPerso, configPerso } from "./perso.js";
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
        this.load.image('tuileDeJeu2', 'maps/Jungle_terrain.png');
        this.load.image('tuileDeJeu3', 'maps/Forest_Decorations.png');
        this.load.tilemapTiledJSON("carte_foret", "maps/map_foret.json");
        this.load.audio('music', 'music/duck.mp3');
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
        configPerso(this, 50, 450);

        //CREATION DE LA MAP
        const carteDuNiveau = this.add.tilemap("carte_foret");
        this.cameras.main.setBounds(0, 0, carteDuNiveau.widthInPixels, carteDuNiveau.heightInPixels);

        //Chargement des tiles pour afficher les éléments
        const Tileset = carteDuNiveau.addTilesetImage(
            "tuiles_de_jeu",
            "tuileDeJeu"
        );
        const Tileset2 = carteDuNiveau.addTilesetImage(
            "tuiles_de_jeu2",
            "tuileDeJeu2"
        );
        const Tileset3 = carteDuNiveau.addTilesetImage(
            "Tuiles_de_deco",
            "tuileDeJeu3"
        );
        const Tile_background = carteDuNiveau.createLayer(
            "Tile_Background",
            Tileset
        );

        const Tile_herbe = carteDuNiveau.createLayer(
            "Tile_deco_herbe",
            Tileset
        );

        const Tile_platforms = carteDuNiveau.createLayer(
            "Tile_platforms",
            Tileset
        );
        const Tile_arbres = carteDuNiveau.createLayer(
            "Tile_arbres",
            Tileset3
        );
        const Tile_pont = carteDuNiveau.createLayer(
            "Tile_deco_pont",
            Tileset2
        );

        this.portal = this.physics.add.image(1500, 50, "portal");
        this.portal.setDepth(1);
        this.portal.body.setImmovable(true);
        this.portal.body.setAllowGravity(false);
        this.portal.body.setSize(70, 70);
        Tile_platforms.setCollisionByProperty({ estSolide: true }); 
        this.canJump = false;
        this.physics.add.collider(this.player, Tile_platforms, () => {
            this.canJump = true;
        });
        
        CreatePopUp(this, "niveau2.html", "Niveau suivant");
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
        if (this.player.y >= 600){
            location.reload();
        }
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