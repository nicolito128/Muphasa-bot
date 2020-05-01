'use strict';
const fs = require('fs')
let tools = fs.readdirSync('src/tools/')
tools = tools.map(tool => {
    if (tool.includes('.js')) return tool.replace('.js', '')
})

/**
 * 
 * @param {string} tool
 */
function requireTool(tool) {
    if (typeof tool !== 'string') return null
    if (!tools.includes(tool)) return null
    return require(`./tools/${tool}.js`)
}

module.exports = requireTool