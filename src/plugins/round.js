'use strict';
const Embed = Tools('embed')

const shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.round(Math.random() * (currentIndex - 1));
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

const generateFreePlaces = (arr) => {
    let freePlaces = []

    if ( arr.length >= 5 && (arr.length % 2) !== 0 ) {
        for (let i = 0, l = arr.length - 2; i < l; i++) {
            let el = arr[i]
            freePlaces.push([el])
        }
    }

    freePlaces.forEach((place, index) => {
        let i = arr.indexOf(place[0])
        arr.splice(i, 1)
    })

    return freePlaces
}

const generateGroups = (arr) => {
    let arrShuffled = shuffle(arr)
    let freePlaces = generateFreePlaces(arrShuffled)
    let groups = []

    for (let i = 1, group = [], player1, player2; i <= arrShuffled.length; i += 2) {
        player1 = arrShuffled[i - 1]
        player2 = arrShuffled[i]
        group.push(player1)
        if (player2 !== undefined) group.push(player2)

        groups.push(group)
        group = []
    }

    return freePlaces.concat(groups)
}

module.exports.commands = {
    round({message, user, args, cmd}) {
        const players = args.join(' ').split(',')
        const groups = generateGroups(players)

        let free = []
        let versus = []
        groups.forEach(group => {
            if (group.length <= 1) {
                free.push(`**${group[0]}** pasa de ronda`)
            } else {
                versus.push(`**${group[0]}** vs **${group[1]}**`)
            }
        })

        this.channel.send(
            Embed.notify('Encuentros', free.concat(versus))
        )
    }
}

module.exports.help = {
    round: {usage: '[nick1, nick2, nick3...]', info: 'Genera una ronda de encuentros aleatorios'}
}