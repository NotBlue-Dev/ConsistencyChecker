class emote {
    constructor() {
        this.emote = false;
    }

    handle(gameData, eventEmitter) {
        console.log(gameData.emote, this.emote);
        if(this.emote === gameData.emote) {
            return;
        }

        if (gameData.emote === false) {
            this.emote = false;
        } else {
            eventEmitter.send('three.render', "le set de données");
            this.emote = true;
        }
    }
}

module.exports = emote;
