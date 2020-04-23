const fs = require('fs')

class Plugins {
    constructor() {
        /** @type {string[]} */
        this.files = null
        /** @type {object} */
        this.commands = Object.create(null)
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
                this.loadPlugin(plugin)
            }
        })

        console.log(`Plugins loaded successfully!`)
    }

    loadPlugin(plugin) {
        if (!plugin) return null
        if (plugin.commands) Object.assign(this.commands, plugin.commands)
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
}

module.exports = new Plugins()