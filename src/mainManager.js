const ConfigLoader = require('./ConfigLoader');
const EchoArena = require('./EchoArena');
const events = require('./EchoArenaEvents.js');

class mainManager {
    constructor(rootPath, eventEmitter) {
        this.configLoader = new ConfigLoader(rootPath);
        this.globalConfig = this.configLoader.load();
        this.eventEmitter = eventEmitter;
        this.eventEmitter.send('config.loaded', this.globalConfig);
        this.config = this.globalConfig.echoArena;
        this.echoArena = null;
    }

    start() {
        this.initializeListeners();
    }

    initializeListeners() {
        this.eventEmitter.on('echoArena.connect', (args) => {
            this.connectEchoArena(args).then(() => {
                this.eventEmitter.send('echoArena.connected', args);
                this.globalConfig.echoArena = {
                    ...this.globalConfig.echoArena,
                    ...args,
                };

                this.configLoader.save(this.globalConfig);
            }).catch((error) => {
                this.eventEmitter.send('echoArena.connectionFailed', {
                    args,
                    error
                });
            });
        });

        let ev = events.filter(event => event.customizable);
        this.eventEmitter.send('echoArena.eventsLoaded', {
            events: ev.map(event => event.name)
        }); 
    }
 
    connectEchoArena(config) {
        return new Promise(() => {
            this.echoArena = new EchoArena(config, this.eventEmitter);
            this.echoArena.listen();
        });
    }

}

module.exports = mainManager;
