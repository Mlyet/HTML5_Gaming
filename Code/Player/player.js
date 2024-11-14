export function player() {
    this.joueur = this.physics.add.sprite(500, 600, "Joueur");
    this.joueur.setCollideWorldBounds(true);
    this.physics.world.setBounds(0, 0, 960, 640);
    this.joueur.setDepth(1);
    this.cameras.main.startFollow(this.joueur);
    this.cameras.main.zoomTo(1.3, 1100);

    this.joueur.body.setSize(22, 12);
    this.joueur.body.setOffset(4, 36);

    this.anims.create({
        key: "walk",
        frames: this.anims.generateFrameNumbers("Joueur", { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1,
    });
    const speed = 160;
    // Remplacement des contrôles par défaut
    this.input.keyboard.on('keydown-Z', () => {
        this.joueur.setVelocityY(-speed); // Aller vers le haut
    });

    this.input.keyboard.on('keydown-S', () => {
        this.joueur.setVelocityY(speed); // Aller vers le bas
    });

    this.input.keyboard.on('keydown-Q', () => {
        this.joueur.setVelocityX(-speed); // Aller à gauche
    });

    this.input.keyboard.on('keydown-D', () => {
        this.joueur.setVelocityX(speed); // Aller à droite
    });
}
