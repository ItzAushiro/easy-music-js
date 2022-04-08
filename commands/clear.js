const Command = require("../structures/command.js");

module.exports = new Command({
	name: "clear",
	aliases: [],
	description: "Vide la file d'attente du serveur",
	permission: "SEND_MESSAGES",
	async run(message, args, client, slash) {
        const queue = client.player.getQueue(message.guild);
        if (queue) {
			queue.clear();

        	slash ? message.reply({embeds: [{ description: `✅ La file d'attente a été vidée.`, color: 0x44b868 }]}) : message.react('✅');
		}
	}
});