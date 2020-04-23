Muphasa - Discord Bot
========================================================================

Introducción
------------------------------------------------------------------------

Muphasa es un código dedicado a ser un BOT para [Discord][1]. Actualmente se encuentra en una etapa muy temprana de desarrollo y pruebas, por lo cual no se puede asegurar que sea completamente estable.

    [1]: https://discordapp.com/


Instalación y Ejecución
------------------------------------------------------------------------

(Requiere Node.js v10+)

Clona el repositorio e instala las dependencias:

    git clone https://github.com/nicolito128/Muphasa-bot
    npm install

Recuerda que para poder iniciar el BOT tendrás que tener registrada la aplicación en [Discord Developers][2]

    [2]: https://discordapp.com/developers

La configuración del bot se encuentra en **config/config-example.js**. Sólo necesitas rellenar los exports con los datos esenciales:

    exports.token = ""
    exports.prefix = ""
    exports.ownerId = ""

Por último para iniciar el BOT puedes utilizar el comando:

    node src/index.js

o:

    npm start