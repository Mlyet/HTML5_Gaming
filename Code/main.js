import { Lave } from './LavaMap/lave.js';
import { TextPresentation } from './TextPrésentation.js';
import { Enigma } from './TutoMap/enigma.js';
import { Versaille } from './VersailleMap/versaille.js';

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false,
        },
    },
    scene: [TextPresentation, Enigma, Versaille, Lave],
};

const game = new Phaser.Game(config);
