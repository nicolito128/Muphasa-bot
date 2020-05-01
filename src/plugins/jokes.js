'use strict';
const Embed = Tools('embed')
const DB = Tools('db')
const jokes = new DB('jokes')

module.exports.commands = {
    joke({message, user, args, cmd}) {
        let targetUser = this.mentions.members.first() || user;

        if (!jokes.has(this.guild.id)) return this.channel.send(Embed.notify('¡Oh no!', `Parece que este servidor no tiene ninguna broma registrada. Intenta anañadir alguna con \`${Config.prefix}addjoke < joke >\``))

        const guildJokes = jokes.get(this.guild.id)
        const rand = Math.round(Math.random() * ((guildJokes.length - 1) - 0) + 0)
        const randomJoke = guildJokes[rand]

        this.channel.send(`${targetUser} ${randomJoke}`)
    },

    addjoke({message, user, args, cmd}) {
        if (!this.member.hasPermission('ADD_REACTIONS')) return this.channel.send(Embed.denied())

        const joke = args.join(' ')
        if (joke.length < 16) return this.channel.send(`La broma no puede tener una longitud menor a 16 carácteres.`)
        
        const guildId = this.guild.id
        if (!jokes.get(guildId)) {
            jokes.set(guildId, [])
        }
        jokes.put(guildId, joke)

        this.channel.send(Embed.notify(
            '¡Broma añadida!',
            `Añadiste la siguiente joke: \`${joke}\``
        ))
    },

    deljoke({message, user, args, cmd}) {
        if (!this.member.hasPermission('ADD_REACTIONS')) return this.channel.send(Embed.denied())
        if (args.length > 1 || args.length < 1) return this.channel.send(`¡Comando invalido! Uso: \`${Config.prefix}deljoke < id >\`. Puedes encontrar el Id de una joke con \`${Config.prefix}jokelist\``)
        if (isNaN(args[0])) return this.channel.send(`La 'id' ingresada debe ser un número válido.`)

        const guildId = this.guild.id
        const jokeId = args[0]
        if (!jokes.get(guildId)[jokeId]) return this.channel.send(`No existe ninguna joke asociada a esa id.`)

        jokes.call(function(){
            this.data[guildId].splice(jokeId, 1)
            this.write()
        })

        this.channel.send(`Joke **${jokeId}** eliminada de la base de datos.`)
    },

    jokelist({message, user, args, cmd}) {
        const guildJokes = jokes.get(this.guild.id)
        if (!guildJokes || guildJokes === []) return this.channel.send(`No hay ninguna broma añadida en este servidor.`)

        let jokeList = []
        for (let i = 0, j = guildJokes[i]; i < guildJokes.length; i++) {
            jokeList.push(`\`${i}: ${j}\``)
        }

        this.channel.send(Embed.notify('Lista de bromas', jokeList))
    },

    searchjoke({message, user, args, cmd}) {
        if (args.length > 1 || args.length < 1) return this.channel.send(`¡Comando invalido! Uso: \`${Config.prefix}searchjoke < id >\`.`)
        if (isNaN(args[0])) return this.channel.send(`La 'id' ingresada debe ser un número válido.`)

        const guildId = this.guild.id
        const jokeId = args[0]
        const joke = jokes.get(guildId)[jokeId]
        if (!joke) return this.channel.send(`No existe ninguna joke asociada a esa id.`)

        this.channel.send(Embed.notify(`Joke #${jokeId}`, joke))
    }
}

module.exports.help = {
    joke: {info: 'Haz que el bot cuente un chiste de su base de datos.'},
    addjoke: {usage: 'joke', info: 'Añade una nueva broma a la base de datos.'},
    deljoke: {usage: 'id', info: 'Elimina una broma de la base de datos.'},
    jokelist: {info: 'Mira la lista de bromas disponibles en el servidor.'},
    searchjoke: {usage: 'id', info: 'Busca una joke especifica de la base de datos.'}
}