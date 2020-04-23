const github = 'https://github.com/nicolito128/Muphasa-bot'

exports.commands = {
    github({message, user, args, cmd}) {
        this.channel.send(`¡Hola, ${user}! Soy **${Config.name}** y fui desarrollado por ${message.member.toString(Config.ownerId)}. Mi código: ${github}`)
    }
}