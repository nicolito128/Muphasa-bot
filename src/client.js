const DiscordClient = require('discord.js').Client;
const Config = require('./../config/config.js');
const Plugins = require('./plugins.js')

class Client extends DiscordClient {
    constructor() {
        super()
    }

    connect() {
        this.on('errors', e => console.log(e))
        this.on('warn', e => console.log(e));
        this.on('debug', e => console.log(e));
        this.on('message', msg => {
            if (msg.content === 'ping') {
                msg.reply('Pong!');
            }
        })

        this.login(Config.token)
    }
}

module.exports = new Client()