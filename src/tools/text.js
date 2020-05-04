'use strict';

const Text = (function(str) {
    let text = (typeof str === 'string') ? str : "";

    function getId(str = text) {
        return str.toLowerCase().replace(/[^a-z0-9]+/g, '')
    }
    
    function verifyId(str = text) {
        if (str === getId(str)) return true
        return false
    }
    
    function doReverse(str = text) {
        return text.split('').reverse().join('')
    }

    const publicAPI = {
        toId: getId,
        isId: verifyId,
        reverse: doReverse
    }

    return publicAPI
})

module.exports = Text