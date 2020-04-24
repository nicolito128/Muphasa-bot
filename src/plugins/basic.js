const github = 'https://github.com/nicolito128/Muphasa-bot'

module.exports.commands = {
    help({message, user, args, cmd}) {
        const helps = Plugins.getHelp()

        if (!args[0]) return this.channel.send('Ingresa un comando del cual quieras obtener información.')

        const target = args[0].toLowerCase()
        if (!helps[target]) return this.channel.send('No hay ayuda disponible sobre este comando o no existe.')

        this.channel.send(
            Tools.Embed.notify(
                '',
                `**${Config.prefix}${target}**: ${helps[target]}`
            )
        )
    },

    github({message, user, args, cmd}) {
        this.channel.send(
            Tools.Embed.notify(
                'Github',
                `¡Hola, ${user}! Soy **${Config.name}** y fui desarrollado por ${this.member.toString(Config.ownerId)}. Todavía me encuentro en fase de pruebas, ¡Pero no dudes en contar conmigo como tu BOT de confianza!`,
                [68, 197, 76]
                ).setURL(github)
        )
    },
}

module.exports.help = {
    github: 'Muestra el enlace al código fuente del BOT y datos sobre el desarrollo.'
}