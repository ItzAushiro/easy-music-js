const Command = require("../structures/command.js");

module.exports = new Command({
	name: "resume",
	aliases: [],
	description: "Reprend la file d'attente si elle est en pause",
	permission: "SEND_MESSAGES",
	async run(message, args, client, slash) {
        const queue = client.player.getQueue(message.guild);
        if (!queue || !queue.playing) return;
        const paused = queue.setPaused(false);
		if(paused)
			slash ? message.reply({embeds: [{ description: `▶️ Piste reprise.`, color: 0x44b868 }]}) : message.react('▶️');
	}
});