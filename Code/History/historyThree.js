export function HistoryThree() {

    let history = this.add.text(100, 100, 
        "Ici, la colère de la Prêtresse se manifeste dans les flammes.\n" +
        "Seuls ceux qui embrassent la lumière du passé...\n",
        {
            font: '12px Arial',
            fill: '#ffffff',
            backgroundColor: '#000000', 
            padding: { left: 10, right: 10, top: 10, bottom: 10 }
        }
    );

    let history2 = this.add.text(100, 100, 
        "...peuvent traverser les flammes et atteindre la rédemption.\n",
        {
            font: '12px Arial',
            fill: '#ffffff',
            backgroundColor: '#000000', 
            padding: { left: 10, right: 10, top: 10, bottom: 10 }
        }
    );

    let historyHeros = this.add.text(100, 100, 
        "Consumé par le feu,\n" +
        "il cherchait le pardon de la Prêtresse.\n" +
        "Que ses cendres témoignent de son sacrifice.\n",
        {
            font: '12px Arial',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { left: 10, right: 10, top: 10, bottom: 10 }
        }
    );

    let historyPeople = this.add.text(100, 100, 
        "Sa chair brûlée,\n" +
        "mais son âme reste prisonnière du passé.\n",
        {
            font: '12px Arial',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { left: 10, right: 10, top: 10, bottom: 10 }
        }
    );

    this.stele1 = this.physics.add.sprite(495, 430, null);
    this.stele1.body.setSize(30, 35);

    this.stele2 = this.physics.add.sprite(340, 440, null);
    this.stele2.body.setSize(30, 28);

    this.tombe1 = this.physics.add.sprite(920, 230, null);
    this.tombe1.body.setSize(20, 50);

    this.people = this.physics.add.sprite(580, 120, null);
    this.people.body.setSize(20, 25);

    const arrayHistory = [
        history,
        history2,
        historyHeros,
        historyPeople,
    ];

    const arraySprite = [
        this.stele1,
        this.stele2,
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

    this.physics.add.collider(this.joueur, this.stele2, () => {
        this.stele2.setVisible(false);
        history2.setVisible(true);
        history2.setPosition(this.stele2.x - 90, this.stele2.y - 150);

        setTimeout(() => {
            history2.setVisible(false);
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