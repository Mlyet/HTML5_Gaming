export function HistoryTwo() {

    let history = this.add.text(100, 100, 
        "Ici, la Prêtresse partageait sa sagesse avec les rois déchus.\n" +
        "Leur trahison fit naître la colère,\n" +
        "et des ruines de leur grandeur,\n" +
        "elle forgea la malédiction qui hante encore ces terres.\n",
        {
            font: '12px Arial',
            fill: '#ffffff',
            backgroundColor: '#000000', 
            padding: { left: 10, right: 10, top: 10, bottom: 10 }
        }
    );

    let historyHeros = this.add.text(100, 100, 
        "Il servait autrefois un roi,\n" +
        "mais c’est à la Prêtresse qu’il offrit son dernier souffle.\n"+
        "Le plus grand n’est pas toujours le premier’, disait-il avant de s'incliner devant elle.\n",
        {
            font: '12px Arial',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { left: 10, right: 10, top: 10, bottom: 10 }
        }
    );

    let historyPeople = this.add.text(100, 100, 
        "Sa tombe, comme son esprit,\n" +
        "est marquée par la trahison et le regret.\n",
        {
            font: '12px Arial',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { left: 10, right: 10, top: 10, bottom: 10 }
        }
    );

    this.stele1 = this.physics.add.sprite(495, 140, null);
    this.stele1.body.setSize(30, 35);

    this.tombe1 = this.physics.add.sprite(310, 150, null);
    this.tombe1.body.setSize(30, 50);

    this.people = this.physics.add.sprite(110, 440, null);
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