/**
 * File to exports all the tools
 */

const PROJECT_ROOT = __dirname + '/../../'

// requires
const ID = require('./id.js')
const Embed = require('./embed.js')
const Game = require('./game.js')

// functions
const parsePath = path => PROJECT_ROOT + path

module.exports = {
    ID,
    toID: ID.prototype.makeId,
    Embed,
    parsePath
}