export function preload() {
    this.load.image("Sol", "/Texture/TX_Tileset_Grass.png");
    this.load.image("Mur", "/Texture/TX_Tileset_Wall.png");
    this.load.image("Structure", "/Texture/TX_Struct.png");
    this.load.image("Ombrages", "/Texture/TX_Shadow.png");
    this.load.image("Ombrage_Plantes", "/Texture/TX_Shadow_Plant.png");
    this.load.image("DecorationExterieur", "/Texture/TX_Props.png");
    this.load.image("Plantation", "/Texture/TX_Plant.png");
    this.load.image("Cube", "/Texture/cube.png");
    this.load.image("Lave", "/Texture/lava.png");

    this.load.spritesheet("Joueur", "/Texture/TX_Player.png", {
        frameWidth: 32,
        frameHeight: 48,
    });

}