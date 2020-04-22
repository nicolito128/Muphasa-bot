const github = 'https://github.com/nicolito128/Muphasa-bot'

exports.commands = {
    github({message, by, args, cmd}) {
        message.channel.send(`¡Hola! Soy *${Config.name}* y fui desarrollado por ${Config.ownerId}. Puedes encontrar aquí mi código: ${github}`)
    }
}