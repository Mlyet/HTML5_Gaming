export function walk () {
    const speed = 160;
    this.cursors = this.input.keyboard.createCursorKeys();
    if (this.cursors) {
        // Déplacement du joueur
        this.joueur.body.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.joueur.body.setVelocityX(-speed);
        } else if (this.cursors.right.isDown) {
            this.joueur.body.setVelocityX(speed);
        }

        if (this.cursors.up.isDown) {
            this.joueur.body.setVelocityY(-speed);
        } else if (this.cursors.down.isDown) {
            this.joueur.body.setVelocityY(speed);
        }

        if (
            this.cursors.left.isDown ||
            this.cursors.right.isDown ||
            this.cursors.up.isDown ||
            this.cursors.down.isDown
        ) {
            this.joueur.anims.play("walk", true);
        } else {
            this.joueur.anims.stop();
            this.joueur.setFrame(0);
        }
    }
}