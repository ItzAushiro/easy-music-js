const Command = require("../structures/command.js");
const config = require("../config");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = new Command({
    name: "testslash",
    aliases: [],
    description: "Enregistrez les commandes slash pour le serveur.",
    permission: "ADMINISTRATOR",
    async run(message, args, client, slash) {
        const slashCommands = client.commands.map(cmd => ({
            name: cmd.name,
            description: cmd.description,
            options: cmd.options,
            defaultPermission: true
        }));
        const rest = new REST({ version: '9' }).setToken(config.botToken);
        await rest.put(Routes.applicationGuildCommands(config.clientId, message.guildId), { body: slashCommands })
            .then(() => message.reply(`Des commandes slash ont été enregistrées pour cette guilde.\nUne fois le cache des commandes globales mis à jour, cette guilde peut afficher des commandes en double.`))
            .catch(error => {
                message.reply(`error: ${error}`);
            });
    }
});