const { MessageEmbed } = require('discord.js')

class Embed extends MessageEmbed {
    constructor(options = {}) {
        super(options)
    }

    new(options = {}) {
        return new Embed(options)
    }

    denied(self) {
        return self.channel.send(
            this.new()
                .setTitle('Acceso denegado')
                .setColor(0xff0000)
                .setDescription(`No tienes suficiente autoridad para usar este comando.`)
        )
    }
}

module.exports = new Embed()