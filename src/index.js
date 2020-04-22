const fs = require('fs')
const Plugins = require('./plugins.js')
const PROJECT_ROOT = __dirname + '/../'

// Create config.js
try {
    const existsConfig =  fs.existsSync(PROJECT_ROOT + '/config/config.js')

    if (!existsConfig) {
        fs.copyFileSync(PROJECT_ROOT + 'config/config-example.js', PROJECT_ROOT + '/config/config.js')
        console.log('Config.js created successfully!')
    } else {
        console.log('Config.js already exists.')
    }
} catch(err) {
    if (err) throw new Error(`CONFIG CREATION` + err)
}

const Client = require('./client.js')

// Gobals
global.Tools = Plugins.loadTools()
global.parsePath = path => PROJECT_ROOT + path

// Run bot
Client.connect()