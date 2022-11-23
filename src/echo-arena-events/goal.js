/*
 * to do:  le disque traverse le goal et le joueur qui a touché le disque est le client
 * pocket gauche : -1.5, 0.0, -36
 * pocket droit : 1.5, 0.0, -36
 * pocket haut : 0.0, 1.5, -36
 * pocket bas : 0.0, -1.5, -36
 */
class goal {
    constructor() {
        this.scorerName = null;
    }

    handle(gameData, eventEmitter) {
        if(this.scorerName === gameData.scorerName) {
            return;
        }
        if(this.scorerName == gameData.client) {
            eventEmitter.send('three.render', "le set de données");
        }
        this.scorerName = gameData.scorerName;
    }
}

module.exports = goal;
