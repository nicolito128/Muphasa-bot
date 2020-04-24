const fs = require('fs')

class Plugins {
    constructor() {
        /** @type {object} */
        this.commands = Object.create(null)
        /** @type {object} */
        this.help = Object.create(null)
    }

    run(message) {
        const params = this.makeCommandParams(message)

        if (params === null) return null
        const {user, args, cmd} = params

        if (!this.commands[cmd]) return null
        return this.commands[cmd].call(message, {message, user, args, cmd})
    }

    loadPlugins() {
        const files = fs.readdirSync(Tools.parsePath('src/plugins/'))
        files.forEach(file => {
            if (file.includes('.js')) {
                const plugin = require(`./plugins/${file}`)
                this.loadPlugin(this.filterPlugin(plugin))
            }
        })

        console.log(`Plugins loaded successfully!`)
    }

    loadPlugin(plugin) {
        if (!plugin) return null

        Object.assign(this.commands, plugin.commands)
        if (plugin.help) Object.assign(this.help, plugin.help)
    }

    filterPlugin(plugin) {
        if (!plugin.commands || plugin.commands === {}) return null

        const commandsKeys = Object.keys(plugin.commands)
        commandsKeys.forEach(cmd => {
            if (typeof plugin.commands[cmd] !== 'function') delete plugin.commands[cmd]
        })

        if (plugin.help) {
            const helpKeys = Object.keys(plugin.help)
            helpKeys.forEach(cmd => {
                // Check if the help is a string or an array
                if (typeof plugin.help[cmd].info !== 'string')  {
                    // If this is false: remove the no-helper
                    if (!Array.isArray(plugin.help[cmd].info)) delete plugin.help[cmd]
                }
            })
        }

        return plugin
    }

    makeCommandParams(message) {
        let user, args, cmd

        if (message.content.startsWith(Config.prefix)) {
            user = message.member.user
	        args = message.content.slice(Config.prefix.length).trim().split(' ')
            cmd = args.shift().toLowerCase()
            return {user, args, cmd}
        }

        return null
    }

    getHelp() {
        return this.help
    }
}

module.exports = new Plugins()