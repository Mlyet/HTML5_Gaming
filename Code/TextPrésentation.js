import { Enigma } from "./TutoMap/enigma.js";

export class TextPresentation extends Phaser.Scene{
 constructor() {
   super('TextPresentation');
 }
 preload(){

 }
 create(){
    this.storyText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 
        "Il y a des siècles, une trahison fit sombrer le royaume dans l’obscurité.\n" +
        "La prêtresse, autrefois vénérée, maudit ces terres en y enfermant les âmes des coupables et des innocents.\n"+
        "Pour lever cette malédiction, il faut résoudre les énigmes qu'elle a laissées, des épreuves conçues pour tester la sagesse et la détermination.\n"+
        "Chaque cube déplacé, chaque stèle activée réveille un souvenir ancien et rapproche celui qui ose du salut ou de la damnation.\n"+
        "Votre épreuve commence ici, dans un cimetière oublié, où les premières vérités se dévoileront... \n\n\n"+
        "Espace pour continuer",
        {
            font: '32px Arial',
            fill: '#ffffff',
            backgroundColor: '#000000',
            align: 'center',
            wordWrap: { width: 600, useAdvancedWrap: true }
        }
    ).setOrigin(0.5).setDepth(10);

    this.input.keyboard.once('keydown-SPACE', () => {
        this.scene.start('Enigma'); 
    });

 }
 update(){

 }
}

// const config = {
//     type: Phaser.AUTO,
//     width: window.innerWidth,
//     height: window.innerHeight,
//     scale: {
//         mode: Phaser.Scale.RESIZE,
//         autoCenter: Phaser.Scale.CENTER_BOTH,
//     },
//     physics: {
//         default: "arcade",
//         arcade: {
//             gravity: { y: 0 },
//             debug: false,
//         },
//     },
//     scene: [TextPresentation, Enigma],
// };
// const game = new Phaser.Game(config);