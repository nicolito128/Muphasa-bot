const EventEmitter = require('events')
const fs = require('fs')

class Plugins extends EventEmitter {
    constructor() {
        super()

        /** @type {string[]} */
        this.files = null
        /** @type {object} */
        this.commands = Object.create(null)
    }

    makeCommandParams(message) {
        let by, args, cmd

        if (message.content.startsWith(Config.prefix)) {
            by = message.member.user
	        args = message.content.slice(Config.prefix.length).trim().split(/ +/g)
            cmd = args.shift().toLowerCase()
            return {by, args, cmd}
        }

        return null
    }

    loadPlugins(message) {
        const files = fs.readdirSync(parsePath('src/plugins/'))
        files.forEach(file => {
            const plugin = require(`./plugins/${file}`)
            this.loadPlugin(plugin, message)
        })
    }

    loadPlugin(plugin, message) {
        if (!plugin) return null
        if (plugin.commands) Object.assign(this.commands, plugin.commands)
    }

    run(message) {
        const params = this.makeCommandParams(message)

        if (params === null) return ''
        const {by, args, cmd} = params

        this.loadPlugins(message)

        if (this.commands[cmd]) return this.commands[cmd]({message, by, args, cmd})
    }
}

module.exports = new Plugins()