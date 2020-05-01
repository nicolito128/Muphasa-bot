'use strict';
const fs = require('fs')

function type(value) {
    if (Array.isArray(value)) return 'array'
    if (value === null) return 'null'
    return typeof value
}

class Database {

    /**
     * 
     * @param {string} file
     */
    constructor(file) {

        this.file = `${file}.json`
        this.path = __dirname + `/../../db/${this.file}`
        this.data = {}

        const dbDir = __dirname + `/../../db/`
        if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir)

        const existsDb = fs.existsSync(this.path)
        if (!existsDb) this.write()
    }

    /**
     * @def Write the json file with new data
     */
    write() {
        fs.writeFileSync(this.path, JSON.stringify(this.data))
        this.data = JSON.parse(fs.readFileSync(this.path))
    }

    getData() {
        return this.data
    }

    /**
     * 
     * @param {string} key 
     */
    get(key) {
        return this.data[key]
    }

    /**
     * 
     * @param {string | object} key
     * @param {any} value 
     * @param {function} callback 
     */
    set(key, value, callback) {
        if (!key) return null
        if (type(key) === 'object' && !value) {
            Object.assign(this.data, key)
        } else {
            this.data[key] = value
        }

        if (callback && type(callback) === 'function') {
            let val = this.data[key]
            callback.call(this, key, val)
        }

        this.write()
        return this
    }

    /**
     * 
     * @param {string} key 
     * @param {any} value 
     * @param {function} callback
     */
    put(key, value, callback) {
        if (!key || !value) return null

        const keyType = type(this.data[key])
        switch (keyType) {
            case 'array':
                this.data[key].push(value)
                break;
            case 'object':
                if (type(value) === 'object') Object.assign(this.data[key], value)
                break;
            case 'string':
            case 'number':
                this.data[key] += value
                break;
            default:
                return null
        }

        if (callback && type(callback) === 'function') {
            let val = this.data[key]
            callback.call(this, key, val)
        }

        this.write()
        return this
    }

    /**
     * 
     * @param {string} key 
     */
    remove(key) {
        if (!key || !this.data[key]) return null
        delete this.data[key]
        this.write()
        return this
    }

    /**
     * 
     * @param {string} key 
     * @returns {boolean}
     */
    has(key) {
        if (!key) return null
        if (!this.data[key]) return false
        return true
    }

    clear() {
        this.data = {}
        this.write()
        return this
    }

    destroy() {
        fs.unlink(this.path, err => {
            if (err) throw err;
            console.log(`${this.path} was deleted!`);
        })

        return true
    }
}

module.exports = Database