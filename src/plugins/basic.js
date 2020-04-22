const github = 'https://github.com/nicolito128/Muphasa-bot'

exports.commands = {
    github({message, by, args, cmd}) {
        message.channel.send(`¡Hola, ${by}! Soy **${Config.name}** y fui desarrollado por ${message.member.toString(Config.ownerId)}. Mi código: ${github}`)
    }
}