'use strict';

function toId(str) {
    if (!str) return null
    if (typeof str !== 'string') return null
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '')
}

function isId(str) {
    if (typeof str !== 'string') return false
    if (str !== toId(str)) return false
    return true
}

function reverse(str) {
    if (typeof str !== 'string') return null
    return str.split('').reverse().join('')
}

module.exports = {toId, isId, reverse}