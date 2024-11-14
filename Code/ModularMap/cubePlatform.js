export function cubePlateformTuto() {
    
    this.cube = this.physics.add.sprite(300, 85, "Cube");
    this.cube.setDisplaySize(43, 60);
    this.cube.setCollideWorldBounds(true);
    this.cube.setDepth(0);
    this.cube.body.setSize(60, 70);

    this.cube.isPushed = false;
    this.cube.pushedVelocityX = 0;
    this.cube.pushedVelocityY = 0;

    this.plateforme = this.physics.add.sprite(175, 80, null);
    this.plateforme.body.setSize(20, 20);
    this.plateforme.setDepth(-1);
}

export function cubePlateformThree() {
    this.cube = this.physics.add.sprite(300, 85, "Cube");
    this.cube.setDisplaySize(43, 60);
    this.cube.setCollideWorldBounds(true);
    this.cube.setDepth(0);
    this.cube.body.setSize(60, 70);

    this.cube.isPushed = false;
    this.cube.pushedVelocityX = 0;
    this.cube.pushedVelocityY = 0;

    this.plateforme = this.physics.add.sprite(80, 80, null);
    this.plateforme.body.setSize(20, 20);
    this.plateforme.setDepth(-1);
}