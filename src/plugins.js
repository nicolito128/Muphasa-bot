const EventEmitter = require('events')
const fs = require('fs')

class Plugins extends EventEmitter {
    constructor() {
        super()

        this.Tools = Object.create(null)
    }

    load() {}

    loadTools() {
        let files = fs.readdirSync(__dirname + '/tools')
        // filter '.js' in files
        files = files.map( file => file.split('.js').join(''))

        files.forEach(tool => {
            this.Tools[tool] = require(`./tools/${tool}.js`)
        })

        return this.Tools
    }
}

module.exports = new Plugins()