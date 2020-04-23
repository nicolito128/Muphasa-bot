const fs = require('fs')

class Plugins {
    constructor() {
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

    run(message) {
        const params = this.makeCommandParams(message)

        if (params === null) return null
        const {by, args, cmd} = params

        if (!this.commands[cmd]) return null
        return this.commands[cmd]({message, by, args, cmd})
    }

    /**
     * @def Destroy the cache and load the plugins again
     */
    destroy() {
        const cache = this.cache()
        cache.forEach(data => {
            const event = data.next()
            if (!event.done) delete this.commands[event.value]
        })

        this.loadPlugins()
    }

    /**
     * @def Generator: plugins
     */
    *cache() {
        const commands = this.commands.keys()
        commands.forEach(command => {
            yield command
        })
    }

    /**
     * @def Instance a new MessageEmbed
    */
    get embed() {
        return new MessageEmbed()
    }
}

module.exports = new Plugins()