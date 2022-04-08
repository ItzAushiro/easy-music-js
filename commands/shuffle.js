const Command = require("../structures/command.js");

module.exports = new Command({
	name: "shuffle",
	aliases: [],
	description: "Mélange la file d'attente du serveur",
	permission: "SEND_MESSAGES",
	async run(message, args, client, slash) {
        const queue = client.player.getQueue(message.guild);
        if (!queue) return;
        
        await queue.shuffle();
        slash ? message.reply({embeds: [{ description: `🔀 Mélanger la file d'attente.`, color: 0x44b868 }]}) : message.react('🔀');
	}
});