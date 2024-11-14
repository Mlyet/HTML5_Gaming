export function historyTuto() {

    let history = this.add.text(100, 100, 
        "Les premiers fidèles de la Prêtresse reposent ici,\n" +
        "leurs esprits liés par la malédiction,\n" +
        "Que celui qui cherche la vérité suive leur trace,\n" +
        "au-delà des portes fermées.\n",
        {
            font: '12px Arial',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { left: 10, right: 10, top: 10, bottom: 10 }
        }
    );

    let historyHeros = this.add.text(100, 100, 
        "Un fidèle a trouvé le repos,\n" +
        "mais son âme demeure en attente de la libération.\n",
        {
            font: '12px Arial',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { left: 10, right: 10, top: 10, bottom: 10 }
        }
    );

    let historyPeople = this.add.text(100, 100, 
        "Son esprit veille,\n" +
        "prisonnier des chaînes de la malédiction.\n",
        {
            font: '12px Arial',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { left: 10, right: 10, top: 10, bottom: 10 }
        }
    );

    this.stele1 = this.physics.add.sprite(495, 460, null);
    this.stele1.body.setSize(30, 35);

    this.tombe1 = this.physics.add.sprite(750, 200, null);
    this.tombe1.body.setSize(30, 35);

    this.people = this.physics.add.sprite(80, 498, null);
    this.people.body.setSize(20, 25);
    
    const arrayHistory = [
        history,
        historyHeros,
        historyPeople,
    ];

    const arraySprite = [
        this.stele1,
        this.tombe1,
        this.people,
    ];

    for (let repeatSprite = 0; repeatSprite < arraySprite.length; repeatSprite++) {
        arraySprite[repeatSprite].setDepth(-1);
        arraySprite[repeatSprite].setImmovable(true);
        
    };
    
    for (let repeatHist = 0; repeatHist < arrayHistory.length; repeatHist++) {
        arrayHistory[repeatHist].setVisible(false);
        arrayHistory[repeatHist].setDepth(6);
        
    };

    this.physics.add.collider(this.joueur, this.stele1, () => {
        this.stele1.setVisible(false);
        history.setVisible(true);
        history.setPosition(this.stele1.x - 90, this.stele1.y - 150);
        setTimeout(() => {
            history.setVisible(false);
        }, 10000);
    });


    this.physics.add.collider(this.joueur, this.tombe1, () => {
        this.tombe1.setVisible(false);
        historyHeros.setVisible(true);
        historyHeros.setPosition(this.tombe1.x - 90, this.tombe1.y - 150);
        setTimeout(() => {
            historyHeros.setVisible(false);
        }, 5000);
    });

    this.physics.add.collider(this.joueur, this.people, () => {
        this.people.setVisible(false);
        historyPeople.setVisible(true);
        historyPeople.setPosition(this.people.x - 90, this.people.y - 150);
        setTimeout(() => {
            historyPeople.setVisible(false);
        }, 10000);
    });
}