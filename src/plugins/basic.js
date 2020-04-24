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
                '`' + Config.prefix + target + '` ' +  helps[target]
            )
        )
    },

    github({message, user, args, cmd}) {
        this.channel.send(
            Tools.Embed.notify(
                'Github',
                `¡Hola, ${user}! Soy **${Config.name}**. Todavía me encuentro en fase de pruebas, ¡Pero no dudes en contar conmigo como tu BOT de confianza!`,
                [68, 197, 76] // rgb
                ).setURL(github)
        )
    },

    avatar({message, user, args, cmd}) {
        if (!args[0]) {
            args[0] = this.author
        } else {
            args[0] = this.mentions.users.first()
        }

        const targetUser = args[0]
        const id = targetUser.id
        const avatarId = targetUser.avatar
        const avatar = `https://cdn.discordapp.com/avatars/${id}/${avatarId}.png?size=1024`

        if (!targetUser) return this.channel.send('No puedo encontrar al usuario que especificaste...')
        this.channel.send(
            Tools.Embed.notify(`${targetUser.username}#${targetUser.discriminator}'s avatar`, '').setImage(avatar)
        )
    },

    eval({message, user, args, cmd}) {
        if (this.author.id !== Config.ownerId) return this.channel.send( Tools.Embed.denied() )

        const code = args.join(' ')
        if (!code) return this.channel.send('Ingresa código que poder evaluar.')

        try {
            this.channel.send(eval(code), {code: 'x1'})
        } catch(err) {
            this.channel.send(`ERROR!\n${err}`, {code: 'javascript'})
        }
    }
}

module.exports.help = {
    github: 'Muestra el enlace al código fuente del BOT y datos sobre el desarrollo.',
    eval: 'Evalua código JavaScript y luego muestra el resultado.',
    avatar: 'Muestra en grande tu avatar o el de otro usuario que menciones.'
}