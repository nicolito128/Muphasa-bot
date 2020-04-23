Plugins
========================================================================

En esta carpeta se almacenan todos los plugins y comandos que los usuarios podrán ejecutar con el BOT.

Para crear comandos se tiene que exportar un objeto **commands** en cada archivo. Los métodos definidos dentro de este objeto serán entendidos como un comando que los usuarios pueden ejecutar.

Por ejemplo:

    exports.commands = {
        greet({message, user, args, cmd}) {
            this.channel.send(`Hello, ${user}!`)
        }
    }

Cada comando recibe un **objeto** con los parametros que se pueden utilizar.

**{ message }** es un [Message][1]

**{ user }** es un [GuildMember][2]

**{ args }** es un matriz de strings con los parametros adicionales

**{ cmd }** es el comando que se está utilizando

[1]: https://discord.js.org/#/docs/main/stable/class/Message
[2]: https://discord.js.org/#/docs/main/stable/class/GuildMember


Cache y llamada de Comandos
------------------------------------------------------------------------

Cuando el BOT intenta conectarse al servidor inmediamente se ejecuta un método de la class Plugins (loadPlugins), todos los archivos *.js* son requeridos y los modulos *commands* se asignan en una propiedad de Plugins que actua como cache. Así cuando se intenta llamar a un command sólo se verifica que existe en el cache para ejecutarlo. En caso de que no exista se devuelve un **null**.

Los comandos son llamados a través del método **call()**, que recibe como *this* el objeto **message**.