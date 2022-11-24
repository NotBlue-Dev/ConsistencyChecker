class emote {
    constructor() {
        this.emote = false;
    }

    handle(gameData, eventEmitter) {

        if(this.emote === gameData.emote) {
            return;
        }

        if (gameData.emote === false) {
            this.emote = false;
        } else {
            eventEmitter.send('three.render', "emote");
            console.log("emote");
            this.emote = true;
        }
    }
}

module.exports = emote;
