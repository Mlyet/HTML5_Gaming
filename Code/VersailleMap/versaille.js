import { HistoryTwo } from "../History/historyTwo.js";
import { preload } from "../ModularMap/preload.js";
import { walk } from "../ModularMap/walk.js";
import { player } from "../Player/player.js";
import { Lave } from "../LavaMap/lave.js";

export class Versaille extends Phaser.Scene {
    constructor() {
        super('Versaille');
        this.steles = {};
        this.messageText = '';
        this.userActivationOrder = [];
        this.correctActivationOrder = ['stele1', 'stele2', 'stele3'];
    }

    preload() {
        preload.call(this);
        this.load.tilemapTiledJSON("carteVersaille", "/Maps/Versaille.tmj");
        this.load.tilemapTiledJSON("carteLave", "/Maps/Lava.tmj");
    }

    create() {
        const map2 = this.make.tilemap({ key: "carteVersaille" });

        const TX_Tileset_Grass2 = map2.addTilesetImage("TX_Tileset_Grass", "Sol");
        const TX_Fondation2 = map2.addTilesetImage("Tileset_Wall", "Mur");
        const TX_Struct2 = map2.addTilesetImage("Struct", "Structure");
        const TX_Shadow2 = map2.addTilesetImage("Shadow", "Ombrages");
        const TX_Shadow_Plant2 = map2.addTilesetImage("Shadow_Plant", "Ombrage_Plantes");
        const TX_Props2 = map2.addTilesetImage("Props", "DecorationExterieur");
        const TX_Plant2 = map2.addTilesetImage("Plant", "Plantation");

        const baseLayer = map2.createLayer("Base", TX_Tileset_Grass2, 0, 0);
        const FondationLayer = map2.createLayer("Fondation1", [TX_Fondation2, TX_Struct2], 0, 0);
        const FondationLayer2 = map2.createLayer("Fondation2", [TX_Fondation2, TX_Struct2], 0, 0);

        this.PorteOpenLayer = map2.createLayer("PorteOuverte", TX_Props2, 0, 0);
        this.PorteCloseLayer = map2.createLayer("PorteFermer", TX_Props2, 0, 0);

        const OmbresLayer = map2.createLayer("OmbreDecoration", TX_Shadow2, 0, 0);
        const DecorationLayer = map2.createLayer("Decoration", TX_Props2, 0, 0);
        const OmbresLayer2 = map2.createLayer("OmbreDecoration2", TX_Shadow2, 0, 0);
        const OmbrePlantLayer = map2.createLayer("OmbrePlante", TX_Shadow_Plant2, 0, 0);

        const PlantLayer = map2.createLayer("Plante", TX_Plant2, 0, 0);
        const OmbrePlantLayer2 = map2.createLayer("OmbrePlante2", TX_Shadow_Plant2, 0, 0);

        const DecorationTopLayer = map2.createLayer("DecorationDessus", TX_Props2, 0, 0);
        const PlantLayerTopBottom = map2.createLayer("PlanteDessus_ous", [TX_Plant2, TX_Props2], 0, 0);
        const PlantLayerTop = map2.createLayer("PlanteDessus", TX_Plant2, 0, 0);
        const FondationLayerTop = map2.createLayer("FondationDessus", [TX_Fondation2, TX_Struct2], 0, 0);
        const FondationLayerTopBottom = map2.createLayer("FondationDessus_ous", [TX_Fondation2, TX_Struct2], 0, 0);

        const ObjetLayerS = map2.createLayer("ObjetS", TX_Props2, 0, 0);
        const ObjetLayerN = map2.createLayer("ObjetN", TX_Props2, 0, 0);
        const ObjetLayerT = map2.createLayer("ObjetT", TX_Props2, 0, 0);

        this.ObjetLayerVisualS = map2.createLayer("ObjetVisuelS", TX_Props2, 0, 0);
        this.ObjetLayerVisualN = map2.createLayer("ObjetVisuelN", TX_Props2, 0, 0);
        this.ObjetLayerVisualT = map2.createLayer("ObjetVisuelT", TX_Props2, 0, 0);

        if (ObjetLayerS) {
            this.ObjetLayerVisualS.setVisible(false);
        }
        if (ObjetLayerN) {
            this.ObjetLayerVisualN.setVisible(false);
        }
        if (ObjetLayerT) {
            this.ObjetLayerVisualT.setVisible(false);
        }

        if (this.PorteOpenLayer) {
            this.PorteOpenLayer.setVisible(false);
        }

        if (this.PorteCloseLayer) {
            this.PorteCloseLayer.setVisible(true);
        }

        this.showMapName("Le Jardin Déchu");

        const ColisionAll = [
            baseLayer,
            FondationLayer,
            FondationLayer2,
            DecorationLayer,
            PlantLayer,
            PlantLayerTop,
            FondationLayerTop,
            DecorationTopLayer,
            ObjetLayerS,
            ObjetLayerN,
            ObjetLayerT,
            PlantLayerTopBottom
        ];

        const LayerDepth = [
            DecorationTopLayer,
            FondationLayerTopBottom,
            PlantLayerTop,
        ];

        player.call(this);
        HistoryTwo.call(this);

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

        this.steles.stele1 = this.physics.add.sprite(175, 80, 'steleSprite').setDepth(-1);
        this.steles.stele2 = this.physics.add.sprite(688, 245, 'steleSprite').setDepth(-1);
        this.steles.stele3 = this.physics.add.sprite(850, 145, 'steleSprite').setDepth(-1);

        this.physics.add.overlap(this.joueur, this.steles.stele1, () => this.showMessage("Appuyez sur E pour activer", "stele1"));
        this.physics.add.overlap(this.joueur, this.steles.stele2, () => this.showMessage("Appuyez sur E pour activer", "stele2"));
        this.physics.add.overlap(this.joueur, this.steles.stele3, () => this.showMessage("Appuyez sur E pour activer", "stele3"));

        this.input.keyboard.on('keydown-E', () => this.activateStele());
    }

    update() {
        walk.call(this);
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
            this.messageText = this.add.text(this.steles[stele].x - 90, this.joueur.y - 150, text, { 
                font: '12px Arial',
                fill: '#ffffff',
                backgroundColor: '#000000',
                padding: { left: 10, right: 10, top: 10, bottom: 10 }
            }).setDepth(9);
        }
    }

    activateStele() {
        const activeStele = this.getCurrentStele();
    
        if (activeStele && !this.steles[activeStele].activated) {
            this.steles[activeStele].activated = true;
            this.userActivationOrder.push(activeStele);
            this.lightUpStele(activeStele);
    
            if (this.messageText) {
                this.messageText.destroy();
                this.messageText = null;
            }

            if (this.userActivationOrder.length === this.correctActivationOrder.length) {
                const isCorrectOrder = this.userActivationOrder.every((stele, index) => stele === this.correctActivationOrder[index]);
                if (isCorrectOrder) {
                    this.openPorte();
                } else {
                    this.resetActivations();
                }
            }
        }
    }

    getCurrentStele() {
        for (let stele in this.steles) {
            if (this.physics.overlap(this.joueur, this.steles[stele])) {
                return stele;
            }
        }
        return null;
    }

    lightUpStele(stele) {
        if (stele === 'stele1') {
            this.ObjetLayerVisualS.setVisible(true);
        } else if (stele === 'stele2') {
            this.ObjetLayerVisualN.setVisible(true);
        } else if (stele === 'stele3') {
            this.ObjetLayerVisualT.setVisible(true);
        }
    }

    hideSteleVisuals(stele) {
        if (stele === 'stele1') {
            this.ObjetLayerVisualS.setVisible(false);
        } else if (stele === 'stele2') {
            this.ObjetLayerVisualN.setVisible(false);
        } else if (stele === 'stele3') {
            this.ObjetLayerVisualT.setVisible(false);
        }
    }
    resetActivations() {
        this.userActivationOrder.forEach(stele => {
            this.steles[stele].activated = false;
            this.hideSteleVisuals(stele);
        });
        this.userActivationOrder = [];
    }

    openPorte() {
        if (this.PorteCloseLayer) {
            this.PorteCloseLayer.setVisible(false);
        }
        if (this.PorteOpenLayer) {
            this.PorteOpenLayer.setVisible(true);
        }
        
        // this.userActivationOrder = [];
        // this.scene.stop('Versaille');
        // this.scene.remove('Versaille', Versaille);
        // console.log(this.scene);
        // if (this.scene.isActive('Lave')) {
        //     console.log(this.scene);
        //     this.scene.bringToTop('Lave'); // Amène la scène au premier plan
        // } else {
        //     console.log(this.scene);
        //     this.scene.start('Lave'); // Démarre la scène
        // }
    }
}

