const Command = require("../structures/command.js");

module.exports = new Command({
	name: "previous",
	aliases: ['back', 'prev'],
	description: "Lit la piste précédente",
	permission: "SEND_MESSAGES",
	async run(message, args, client, slash) {
        const queue = client.player.getQueue(message.guild);
        if (!queue || !queue.playing) return;
        
        await queue.back();

        slash ? message.reply({embeds: [{ description: `⏮️ Lecture de la piste précédente.`, color: 0x44b868 }]}) : message.react('⏮️');
	}
});