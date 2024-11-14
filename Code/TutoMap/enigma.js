import { preload } from "../ModularMap/preload.js";
import { player } from "../Player/player.js";
import { cubePlateformTuto } from "../ModularMap/cubePlatform.js";
import { walk } from "../ModularMap/walk.js";
import { historyTuto } from "../History/historyTuto.js";
import { Versaille } from "../VersailleMap/versaille.js";
import { Lave } from "../LavaMap/lave.js";

export class Enigma extends Phaser.Scene {
    
    constructor() {
        super('Enigma');
    }

    preload() {
        this.scene.stop('TextPresentation');
        preload.call(this)
        this.load.tilemapTiledJSON("carte", "/Maps/CartesRuines.tmj");
        this.load.tilemapTiledJSON("carteVersaille", "/Maps/VersailleMap.tmj");
        this.load.tilemapTiledJSON("carteLave", "/Maps/Lava.tmj");
    }

    create() {
        const map = this.make.tilemap({ key: "carte" });

        const TX_Tileset_Grass = map.addTilesetImage("Tileset Grass", "Sol");
        const TX_Fondation1 = map.addTilesetImage("TX Tileset Wall", "Mur");
        const TX_Struct = map.addTilesetImage("Struct", "Structure");
        const TX_Shadow = map.addTilesetImage("Shadow", "Ombrages");
        const TX_Shadow_Plant = map.addTilesetImage("Shadow Plant", "Ombrage_Plantes");
        const TX_Props = map.addTilesetImage("Props", "DecorationExterieur");
        const TX_Plant = map.addTilesetImage("Plant", "Plantation");

        const baseLayer = map.createLayer("Base", TX_Tileset_Grass, 0, 0);
        const FondationLayer = map.createLayer("Fondation1", [TX_Fondation1, TX_Struct], 0, 0 );
        const FondationLayer2 = map.createLayer("Fondation2",[TX_Fondation1, TX_Struct], 0, 0 );
        const Fondation1LayerBottom = map.createLayer("Fondation_dessous", [TX_Fondation1, TX_Struct], 0, 0 );
        const OmbresLayer = map.createLayer("Ombres",[TX_Shadow_Plant, TX_Shadow], 0, 0);
        const ObjetLayer = map.createLayer("Objets", TX_Props, 0, 0);
        this.PlateformeLayer = map.createLayer("Plateforme", TX_Props, 0, 0);

        const DecorationLayer = map.createLayer("Decorations", TX_Props, 0, 0);
        this.VisualLayer = map.createLayer("Visual", TX_Props, 0, 0);
        const DecotationBottomLayer = map.createLayer("Decoration_dessous", TX_Props, 0, 0);
        const OmbrePlantLayer = map.createLayer("Ombres_Plantes",[TX_Shadow_Plant, TX_Shadow], 0, 0);
        const plantesLayerBottom = map.createLayer("Plantes_dessous", TX_Plant, 0, 0);
        const PlantLayer = map.createLayer("Plantes", TX_Plant, 0, 0);
        const PlantLayer2 = map.createLayer("Plantes2", TX_Plant, 0, 0);
        
        this.PorteOpenLayer = map.createLayer("Portes_ouverte", TX_Props, 0, 0);
        this.PorteCloseLayer = map.createLayer("Portes_fermer", TX_Props, 0, 0);
        this.HistoryVisuelLayer = map.createLayer("HistoireVisuel", TX_Props, 0, 0);

        this.showMapName("Le Cimetière des Premiers Souvenirs");

        const ColisionAll = [
            FondationLayer,
            FondationLayer2,
            DecorationLayer,
            PlantLayer,
            PlantLayer2,
        ];

        const LayerDepth = [
            Fondation1LayerBottom,
            DecotationBottomLayer,
            plantesLayerBottom,
        ];

        player.call(this);
        historyTuto.call(this);
        cubePlateformTuto.call(this);

        this.physics.add.collider(this.cube, this.joueur, this.onCubeCollision, null, this);
        this.physics.add.collider(this.cube, this.PorteCloseLayer);

        this.PorteCloseLayer.setCollisionByProperty({ Colision: true });
        this.physics.add.collider(this.joueur, this.PorteCloseLayer);

        this.physics.add.overlap(this.cube, this.plateforme, this.checkCubeOnPlatform, null, this);

        for (let collisionIndex = 0; collisionIndex < ColisionAll.length; collisionIndex++) {
            ColisionAll[collisionIndex].setCollisionByProperty({ Colision: true });
            this.physics.add.collider(this.joueur, ColisionAll[collisionIndex]);
            this.physics.add.collider(this.cube, ColisionAll[collisionIndex]);
        }
        for (let depthIndex = 0; depthIndex < LayerDepth.length; depthIndex++) {
            LayerDepth[depthIndex].setDepth(2);
        }

        this.VisualLayer.setVisible(false);
        this.PorteOpenLayer.setVisible(false);
        this.PorteCloseLayer.setVisible(true);

    }
    
    update() {
        walk.call(this)

        if (this.cube.isPushed) {
            this.cube.x += this.cube.pushedVelocityX;
            this.cube.y += this.cube.pushedVelocityY;

            if (this.joueur.body.velocity.x === 0 &&  this.joueur.body.velocity.y === 0) {
                this.cube.isPushed = false;
                this.cube.setVelocity(0);
            }
        }
    }
    showMapName(name) {
        this.mapNameText = this.add.text(this.cameras.main.centerX / 1.5, this.cameras.main.centerY / 2, name, {
            font: '48px Arial',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5).setDepth(6);

        this.tweens.add({
            targets: this.mapNameText,
            alpha: 1, // Rendre visible
            duration: 2000, // Durée du fondu
            ease: 'Power2', // Type d'animation
            onComplete: () => {
                this.time.delayedCall(2000, () => {
                    this.tweens.add({
                        targets: this.mapNameText,
                        alpha: 0, // Rendre transparent à nouveau
                        duration: 2000, // Durée du fondu
                        ease: 'Power2',
                        onComplete: () => {
                            this.mapNameText.destroy(); // Détruire le texte après le fondu
                        }
                    });
                });
            }
        });
    }

    onCubeCollision(joueur) {
        if (!this.cube.isPushed) {
            this.cube.isPushed = true;

            const directionX = joueur.body.velocity.x;
            const directionY = joueur.body.velocity.y;

            this.cube.pushedVelocityX = directionX * 0.01;
            this.cube.pushedVelocityY = directionY * 0.01;
        }
    }

    checkCubeOnPlatform() {
        this.PorteOpenLayer.setVisible(true);
        this.PorteCloseLayer.setVisible(false);
    
        this.VisualLayer.setVisible(true);
        
        this.end = this.physics.add.sprite(210, 180, null).setDepth(-1);

        this.physics.add.overlap(this.joueur, this.end, ()=> {
            this.scene.stop('Enigma');
            this.scene.remove('Enigma', Enigma);
            this.scene.start('Lave');
        })
    };
}
