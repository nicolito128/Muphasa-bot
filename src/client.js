const DiscordClient = require('discord.js').Client;
const Config = require('./../config/config.js');
const Plugins = require('./plugins.js')

class Client extends DiscordClient {
    constructor() {
        super()
    }

    status() {
        this.on('errors', e => new Error(`${e}`))
        this.on('warn', e => new Error(`WARN STATUS: ${e}\n`));
        this.on('debug', e => console.log(`DEBUG STATUS: ${e}\n`));
    }

    connect() {
        this.status()
        this.on('message', async message => Plugins.run(message))
        this.login(Config.token)
    }
}

module.exports = new Client()