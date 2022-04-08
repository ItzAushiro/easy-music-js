const Command = require("../structures/command.js");

module.exports = new Command({
	name: "seek",
	aliases: [],
	description: "Vide la file d'attente du serveur",
	permission: "SEND_MESSAGES",
	options: [
        { description: 'Position de la chanson actuelle à rechercher', name: 'seconds', required: true, type: 4 }
    ],
	async run(message, args, client, slash) {
        const queue = client.player.getQueue(message.guild);
        if (!queue || !queue.playing || !args[0]) return;
        if (args[0] * 1000 >= queue.current.durationMS) return message.react('❌');
		await queue.seek(args[0] * 1000);

        slash ? message.reply({embeds: [{ description: `⏩ Cherche à se positionner.`, color: 0x44b868 }]}) : message.react('⏩');
	}
});