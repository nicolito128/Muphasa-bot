'use strict';
const fs = require('fs')
const Tools = require('./tools/index.js')

// Create config.js
try {
    const existsConfig =  fs.existsSync(Tools.parsePath('config/config.js'))

    if (!existsConfig) {
        fs.copyFileSync(Tools.parsePath('config/config-example.js'), Tools.parsePath('config/config.js'))
        console.log('Config.js created successfully!')
    } else {
        console.log('Config.js already exists.')
    }
} catch(err) {
    if (err) throw new Error(`CONFIG CREATION` + err)
}

const Config = require('./../config/config.js')
const Client = require('./client.js')
const Plugins = require('./plugins.js')

// Gobals
global.Tools = Tools

global.Config = Config

global.Plugins = Plugins

global.Client = Client

// Run bot
Client.connect()