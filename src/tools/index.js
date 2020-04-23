/**
 * File to exports all the tools
 */

const ID = require('./id.js')
const Embed = require('./embed.js')

module.exports = {
    ID,
    toID: ID.prototype.makeId,

    Embed
}