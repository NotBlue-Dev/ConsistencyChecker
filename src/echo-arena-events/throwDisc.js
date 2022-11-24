// to do : quand last_throw change (donc on a throw) ont render

class throwDisc {
    constructor() {
        this.lastThrow = null;
    }

    handle(gameData, eventEmitter) {
        // create a function to compare two objetcs (gameData.lastThrow and this.lastThrow) 
        if(JSON.stringify(this.lastThrow) === JSON.stringify(gameData.lastThrow)) {
            return;
        }

        if(this.lastThrow !== null) {
            console.log("throw");
            eventEmitter.send('three.render', "throw");
        }

        this.lastThrow = gameData.lastThrow;
    }
}

module.exports = throwDisc;
