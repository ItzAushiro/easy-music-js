const Command = require("../structures/command.js");

module.exports = new Command({
	name: "pause",
	aliases: [],
	description: "Suspend la file d'attente",
	permission: "SEND_MESSAGES",
	async run(message, args, client, slash) {
        const queue = client.player.getQueue(message.guild);
        if (!queue || !queue.playing) return;
        const paused = queue.setPaused(true);
		if(paused)
			slash ? message.reply({embeds: [{ description: `⏸️ Piste en pause.`, color: 0x44b868 }]}) : message.react('⏸️');
	}
});