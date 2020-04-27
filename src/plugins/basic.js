const github = 'https://github.com/nicolito128/Muphasa-bot'

const getHexValue = n => {
    if (isNaN(n)) return null

    const hex = Number(n).toString(16)
    if (hex.length < 2) return `0${hex}`

    return hex
}

const rgbToHex = (r, g, b) => {
    const red = getHexValue(r)
    const green = getHexValue(g)
    const blue = getHexValue(b)

    return red + green + blue
}

module.exports.commands = {
    help({message, user, args, cmd}) {
        const helps = Plugins.getHelp()

        if (!args[0]) return this.channel.send('Ingresa un comando del cual quieras obtener información.')

        const target = args[0].toLowerCase()
        if (!helps[target]) return this.channel.send('No hay ayuda disponible sobre este comando o no existe.')

        this.channel.send(
            Tools.Embed.notify(
                '',
                `\`${Config.prefix}${target}${(helps[target].usage) ? ' < ' + helps[target].usage + ' > ' : ''}\` ${helps[target].info}`
            )
        )
    },

    say({message, user, args, cmd}) {
        return this.channel.send(args.join(' '))        
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

        if (typeof args[0] !== 'object') return this.channel.send('No especificaste un usuario valido.')

        const targetUser = args[0]
        let avatar = targetUser.displayAvatarURL()

        if (targetUser.avatar.startsWith('a_')) {
            avatar = avatar.replace('.webp', '.gif')
        } else {
            avatar = avatar.replace('.webp', '.png')
        }

        this.channel.send(
            Tools.Embed.notify(
                `${targetUser.username}#${targetUser.discriminator}'s avatar`,
                [`[Buscar en Google](https://www.google.com/searchbyimage?image_url=${avatar})`]
                )
                .setImage(avatar + '?size=1024')
        )
    },

    eval({message, user, args, cmd}) {
        if (this.author.id !== Config.ownerId) return this.channel.send( Tools.Embed.denied() )

        const code = args.join(' ')
        if (!code) return this.channel.send('Ingresa código que poder evaluar.')

        try {
            this.channel.send(eval(code), {code: 'javascript'})
        } catch(err) {
            this.channel.send(`ERROR!\n${err}`, {code: 'javascript'})
        }
    },

    pick({message, user, args, cmd}) {
        args = args.join(' ').split(',')
        if (args.length <= 1) return this.channel.send('Intenta ingresar más elementos para seleccionar.')
        const len = args.length
        const randomArgument = args[Math.round(Math.random() * (len - 0) + 0)]
        this.channel.send(
            Tools.Embed.notify('Random pick', `\`${randomArgument}\``)
        )
    },

    rand({message, user, args, cmd}) {
        if (isNaN(args[0])) return this.channel.send('Este comando sólo admite un número como parametro.')

        const num = parseInt(args[0])
        if (num >= (100000 * 10000000)) return this.channel.send('No voy a calcular eso, lol')

        const randomNumber = Math.round(Math.random() * (num - 0) + 0)
        this.channel.send(
            Tools.Embed.notify('Random num', `\`${randomNumber}\``)
        )
    },

    hex({message, user, args, cmd}) {
        let hex, image = 'https://dummyimage.com/1000x1000/'

        if (!args || !args[0]) return this.channel.send(`No ingresaste ningún color para mostrar. Para más información usa \`${Config.prefix}help hex\``)
        if ( args[0] && args[1] && args[2] ) {
            if ( isNaN(args[0] || isNaN(args[1]) || isNaN(args[2])) ) {
                return this.channel.send('Si ingresas valores RGB todos los parametros deben ser números.')
            }
            hex = rgbToHex(args[0], args[1], args[2])
        } else hex = args[0]

        image += `${hex}/${hex}`
        this.channel.send(
            Tools.Embed.notify('', `\`#${hex}\``, 'transparent').setImage(image)
        )
    }
}

module.exports.help = {
    github: {info: 'Muestra el enlace al código fuente del BOT y datos sobre el desarrollo.'},
    eval: {usage: 'code', info: 'Evalua código JavaScript y luego muestra el resultado.'},
    avatar: {usage: 'mention[optional]',info: 'Muestra en grande tu avatar o el de otro usuario que menciones.'},
    say: {usage: 'message', info: 'Obliga al BOT a enviar un mensaje en el canal actual.'},
    pick: {usage: 'element 1, element 2, element 3...', info: 'Selecciona un elemento aleatorio entre los proporcionados.'},
    rand: {usage: 'number', info: 'Obten un número aleatorio entre 0 y el valor proporcionado.'},
    hex: {usage: 'hex | red blue green', info: 'Muestra una imagen completamente del color hex/rgb ingresado.'}
}