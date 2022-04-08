const Command = require("../structures/command.js");

module.exports = new Command({
	name: "disconnect",
	aliases: ['dc'],
	description: "Se déconnecte de la chaîne musicale et efface la file d'attente du serveur",
	permission: "SEND_MESSAGES",
	async run(message, args, client, slash) {
        const queue = client.player.getQueue(message.guild);
        if (queue) await queue.destroy(true);
		message.guild.me.voice.disconnect();
        slash ? message.reply({embeds: [{ description: `👋 Déconnecté.`, color: 0x44b868 }]}) : message.react('👋');
	}
});