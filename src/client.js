// Discord
const DiscordClient = require('discord.js').Client
const Config = require('./../config/config.js');
const Plugins = require('./plugins.js')

class Client extends DiscordClient {
    constructor() {
        super()
        this.activity = `Prefix: ${Config.prefix}`
    }

    status() {
        this.on('ready', () => {
            this.user.setActivity(this.activity)
        })
    }

    logs() {
        this.on('errors', e => new Error(`${e} \n`))
        this.on('warn', e => new Error(`WARN STATUS: ${e}\n`));
        this.on('debug', e => console.log(`DEBUG STATUS: ${e}\n`));
    }

    connect() {
        this.status()
        this.logs()

        // Plugins
        Plugins.loadPlugins()
        this.on('message', async message => Plugins.run(message))

        // Connection to discord
        this.login(Config.token)
    }
}

module.exports = new Client()