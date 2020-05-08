'use strict';

/**
 * 
 * @param {string} str 
 */
const Text = (function(str) {
    let text = (typeof str === 'string') ? str : "";

    function toId(str = text) {
        return str.toLowerCase().replace(/[^a-z0-9]+/g, '')
    }
    
    function isId(str = text) {
        if (str === toId(str)) return true
        return false
    }
    
    function reverse(str = text) {
        return text.split('').reverse().join('')
    }

    const publicAPI = {
        toId,
        isId,
        reverse
    }

    return publicAPI
})

module.exports = Text