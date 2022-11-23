const events = require('./EchoArenaEvents.js');
const fetch = require('node-fetch');
const GameData = require("./gameData");

class EchoArena {
    constructor({
        ip, port
        }, eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.ip = ip;
        this.port = port;
    }
    
    listen() {
        return this.testConnection().then(this.request.bind(this)).catch(console.error);
    }

    async testConnection() {
        console.log(`Testing connection to ${this.ip}:${this.port}`);
        try {
            
            await fetch(`http://${this.ip}:${this.port}/session`);
            this.eventEmitter.send('echoArena.connected');
            return true;
        } catch(error) {
            if (error.response) {
                this.eventEmitter.send('echoArena.connected', {
                    error
                });
                return true;
            }
            this.eventEmitter.send('echoArena.failed', {
                error
            });
            throw new Error();
        }
    }

    request() {
        fetch(`http://${this.ip}:${this.port}/session`).then(resp => resp.json()).then(json => {
            const gameData = new GameData(json);
            events.forEach((event) => {
                event.handle(gameData, this.eventEmitter);
            });
            this.request();
        }).catch(error => {
            if (error.response) {
                if (error.response.status === 404) {
                    this.eventEmitter.send('echoArena.notFound');
                } else {
                    this.eventEmitter.send('echoArena.requestError', {
                        status: error.response.status
                    });
                }
            } else if (error.request) {
                this.eventEmitter.send('echoArena.refused');
                this.fails++;
            } else {
                this.eventEmitter.send('echoArena.error', {
                    error
                });
                this.fails++;
            }
            if (this.fails < 5) {
                setTimeout(() => {
                    this.request();
                }, 500);
            } else {
                this.eventEmitter.send('echoArena.disconnected');
                setTimeout(() => {
                    this.request();
                }, 2000);
            }
        });
    }
}

module.exports = EchoArena;
