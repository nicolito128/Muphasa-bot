class ID extends String {
    constructor(str = '') {
        if (typeof str !== 'string') str = ''
        this.id = this.makeId(str)
        super(this.id)
    }

    get getId() {
        return this.id
    }

    makeId(str) {
        if (typeof str !== 'string') return ''
        return str.toLowerCase().replace(/[^a-z0-9]+/g, '')
    }

    isId(str = this.id) {
        if (typeof str !== 'string') return false
        if (str !== this.makeId(str)) return false
        return true
    }
}

module.exports = ID