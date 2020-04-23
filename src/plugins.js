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
        const {by, args, cmd} = params

        if (!this.commands[cmd]) return null
        return this.commands[cmd]({message, by, args, cmd})
    }

    loadPlugins() {
        const files = fs.readdirSync(parsePath('src/plugins/'))
        files.forEach(file => {
            const plugin = require(`./plugins/${file}`)
            this.loadPlugin(plugin)
        })

        console.log(`Plugins loaded successfully!`)
    }

    loadPlugin(plugin) {
        if (!plugin) return null
        if (plugin.commands) Object.assign(this.commands, plugin.commands)
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

    /********************************
     *      Useful in Plugins       *
     *******************************/

    /**
     * @def Get a new instance to MessageEmbed
    */
    get embed() {
        return new MessageEmbed()
    }
}

module.exports = new Plugins()