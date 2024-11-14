import { HistoryThree } from "../History/historyThree.js";
import { cubePlateformThree } from "../ModularMap/cubePlatform.js";
import { preload } from "../ModularMap/preload.js";
import { walk } from "../ModularMap/walk.js";
import { player } from "../Player/player.js";
import { Versaille } from "../VersailleMap/versaille.js";

export class Lave extends Phaser.Scene {
    constructor(){
        super('Lave')
        this.steles = {};
    }
    preload() {
        preload.call(this);
        this.load.tilemapTiledJSON("carteLave", "/Maps/Lava.tmj");
    }
    
    create() {
        const map3 = this.make.tilemap({ key: "carteLave" });

        const TX_Tileset_Grass3 = map3.addTilesetImage("Tileset_Grass", "Sol");
        const TX_Fondation3 = map3.addTilesetImage("Tileset_Wall", "Mur");
        const TX_Struct3 = map3.addTilesetImage("TX_Struct", "Structure");
        const TX_Shadow3 = map3.addTilesetImage("Shadow", "Ombrages");
        const TX_Shadow_Plant3 = map3.addTilesetImage("Shadow_Plant", "Ombrage_Plantes");
        const TX_Props3 = map3.addTilesetImage("Props", "DecorationExterieur");
        const TX_Plant3 = map3.addTilesetImage("Plant", "Plantation");
        const Lave = map3.addTilesetImage("lava", "Lave");

        const baseLayer3 = map3.createLayer("Base", TX_Tileset_Grass3, 0, 0);
        const LaveLayer3 = map3.createLayer("Lave", Lave, 0, 0);
        const LaveLayerWithoutBridge3 = map3.createLayer("Lave_sans_pont", [Lave, TX_Fondation3], 0, 0);
        const LaveLayerBridge3 = map3.createLayer("Lave_dessous_pont", Lave, 0, 0);
        const FondationLayer3 = map3.createLayer("Fondation1", [TX_Fondation3, TX_Struct3, TX_Props3], 0, 0);
        const FondationLayer23 = map3.createLayer("Fondation2", [TX_Fondation3, TX_Struct3, TX_Props3], 0, 0);
        const OmbresLayer3 = map3.createLayer("Ombre", [TX_Shadow3, TX_Plant3], 0, 0);
        const OmbrePlantLayer3 = map3.createLayer("Ombre_Plante", TX_Shadow_Plant3, 0, 0);
        const BridgeLayer3 = map3.createLayer("PontSol", TX_Tileset_Grass3, 0, 0);
        const BridgeLayerStruct3 = map3.createLayer("Pont", TX_Fondation3, 0, 0);
        const ObjetLayerN3 = map3.createLayer("ObjetN", TX_Props3, 0, 0);
        this.ObjetLayerVisualN3 = map3.createLayer("ObjetVisuelN", TX_Props3, 0, 0);
        const PlateformeLayer3 = map3.createLayer("Plateforme", TX_Props3, 0, 0);
        const DecorationLayer3 = map3.createLayer("Decoration", TX_Props3, 0, 0);
        const DescorationWithoutLayer3 = map3.createLayer("Decortation_dessous", TX_Props3, 0, 0);
        const HistoryLayer3 = map3.createLayer("Histoire", TX_Props3, 0, 0);
        this.HistoryVisuelLayerV3 = map3.createLayer("HistoireVisuelV", TX_Props3, 0, 0);
        this.HistoryVisuelLayerH3 = map3.createLayer("HistoireVisuelH", TX_Props3, 0, 0);
        const PlantLayer3 = map3.createLayer("Plante", TX_Plant3, 0, 0);
        const PlantLayerTopBottom3 = map3.createLayer("Plante_dessous", TX_Plant3, 0, 0);
        
        this.PorteOpenLayer3 = map3.createLayer("PorteOuverte", TX_Props3, 0, 0);
        this.PorteCloseLayer3 = map3.createLayer("PorteFermer", TX_Props3, 0, 0);

        this.showMapName("La Faille de Feu");

        const ColisionAll = [
            baseLayer3,
            FondationLayer3,
            FondationLayer23,
            DecorationLayer3,
            PlantLayer3,
            ObjetLayerN3,
            HistoryLayer3
        ];

        const LayerDepth = [
            PlantLayerTopBottom3,
            DescorationWithoutLayer3
        ];

        const desactiveLayer = [
            LaveLayerBridge3,
            BridgeLayer3,
            BridgeLayerStruct3
        ]
        const bridgeMeca = false;

        cubePlateformThree.call(this)
        player.call(this);
        HistoryThree.call(this);

        if (this.PorteCloseLayer3) {
            this.PorteCloseLayer3.setVisible(true);
            this.PorteCloseLayer3.setCollisionByProperty({ Colision: true });
            this.physics.add.collider(this.joueur, this.PorteCloseLayer3);
        }

        this.physics.add.collider(this.cube, this.joueur, this.onCubeCollision, null, this);
        this.physics.add.overlap(this.cube, this.plateforme, this.checkCubeOnPlatform, null, this);
        this.physics.add.collider(this.cube, this.PorteCloseLayer3);

        if (LaveLayer3) {
            LaveLayer3.setCollisionByProperty({Mort: true})
            this.physics.add.collider(this.joueur, LaveLayer3, (joueur) => this.resetPosition(joueur), null, this);
        }

        for (let collisionIndex = 0; collisionIndex < ColisionAll.length; collisionIndex++) {
            if (ColisionAll[collisionIndex]) {
                ColisionAll[collisionIndex].setCollisionByProperty({ Collision: true });
                this.physics.add.collider(this.joueur, ColisionAll[collisionIndex]);
            }
        }

        for (let depthIndex = 0; depthIndex < LayerDepth.length; depthIndex++) {
            if (LayerDepth[depthIndex]) {
                LayerDepth[depthIndex].setDepth(2);
            }
        }

        for (let bridge = 0; bridge < desactiveLayer.length; bridge++) {
            if (desactiveLayer[bridge]) {
                desactiveLayer[bridge].setVisible(false);
            }
        }

        this.steles.stele1 = this.physics.add.sprite(690, 210, 'steleSprite').setDepth(-1);
        this.physics.add.overlap(this.joueur, this.steles.stele1, () => this.showMessage("Appuyez sur E pour activer", "stele1"));

        this.input.keyboard.on('keydown-E', () => {
            for (let bridgeA = 0; bridgeA < desactiveLayer.length; bridgeA++) {
                desactiveLayer[bridgeA].setVisible(true);
            }
            this.ObjetLayerVisualN3.setVisible(true);
            bridgeMeca = true;
        });
        
        if (bridgeMeca === false) {
            LaveLayerBridge3.setCollisionByProperty({Mort: true})
            this.physics.add.collider(this.joueur, LaveLayerBridge3, (joueur) => this.resetPosition(joueur), null, this);
        }
        if (this.ObjetLayerVisualN3) {
            this.ObjetLayerVisualN3.setVisible(false);
        }
        if (this.PorteOpenLayer3) {
            this.PorteOpenLayer3.setVisible(false);
        }
        
    }
    update() {
        
        walk.call(this)

        if (this.cube.isPushed) {
            this.cube.x += this.cube.pushedVelocityX;
            this.cube.y += this.cube.pushedVelocityY;

            if (
                this.joueur.body.velocity.x === 0 &&
                this.joueur.body.velocity.y === 0
            ) {
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
    showMessage(text, stele) {
        if (!this.steles[stele].activated && !this.messageText) {
            this.messageText = this.add.text(this.steles[stele].x - 90, this.steles[stele].y - 150, text, { 
                font: '12px Arial',
                fill: '#ffffff',
                backgroundColor: '#000000',
                padding: { left: 10, right: 10, top: 10, bottom: 10 }
            });
        }
    }

    onCubeCollision(cube, joueur) {
        if (!this.cube.isPushed) {
            this.cube.isPushed = true;

            const directionX = joueur.body.velocity.x;
            const directionY = joueur.body.velocity.y;

            this.cube.pushedVelocityX = directionX * 0.01;
            this.cube.pushedVelocityY = directionY * 0.01;
        }
    }

    checkCubeOnPlatform() {
        this.PorteOpenLayer3.setVisible(true);
        this.PorteCloseLayer3.setVisible(false);

        this.end = this.physics.add.sprite(240, 250, null).setDepth(-1);
        this.physics.add.overlap(this.joueur, this.end, ()=> {
            this.scene.stop('Lave');
            this.scene.remove('Lave', Lave);
            this.scene.start('Versaille');
        });
    };
    
    resetPosition(joueur) {
        this.cameras.main.fadeOut(500, 0, 0, 0);

        this.time.delayedCall(500, () => {
        joueur.setPosition(500, 600);

        this.cameras.main.fadeIn(500, 0, 0, 0);
    });
    }
}
