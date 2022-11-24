/*
 * to do:  le disque traverse le goal et le joueur qui a touché le disque est le client
 * pocket gauche : -1.5, 0.0, -36
 * pocket droit : 1.5, 0.0, -36
 * pocket haut : 0.0, 1.5, -36
 * pocket bas : 0.0, -1.5, -36
 */
class goal {
    constructor() {
        this.lastScore = null;
    }

    handle(gameData, eventEmitter) {
        if(JSON.stringify(this.lastScore) === JSON.stringify(gameData.lastScore)) {
            return;
        }

        if(this.lastScore !== null) {
            console.log("score");
            eventEmitter.send('three.render', "score");
        }

        this.lastScore = gameData.lastScore;
    }
}

module.exports = goal;
