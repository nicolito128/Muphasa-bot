const EventEmitter = require('events')

class Plugins extends EventEmitter {
    constructor() {
        super()
    }

    load() {}
}

module.exports = new Plugins()