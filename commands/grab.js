const Command = require("../structures/command.js");

module.exports = new Command({
	name: "grab",
    aliases: ['g'],
	description: "Vous envoie un message privé avec des informations sur la chanson en cours de lecture",
	permission: "SEND_MESSAGES",
	async run(message, args, client, slash) {
        const queue = client.player.getQueue(message.guild);
        if (!queue || !queue.playing) {
            return message.reply({ embeds: [{ description: `Il n'y a rien en cours de lecture sur le serveur.`, color: 0xb84e44 }], ephemeral: true });
        }
		if (slash)
			message.reply({ embeds: [{ description: `Envoyé un message privé !`, color: 0x44b868 }], ephemeral: true });
		else
			message.react('📩');
	
		let playlist = "";
		if(queue.current.playlist)
			playlist = ` ┃ À partir de: [${queue.current.playlist.title}](${queue.current.playlist.url})`;

        return message.author.send({ embeds: [{
			description: `**[${queue.current.title}](${queue.current.url})**\nby ${queue.current.author}\n\n` +
						`${queue.current.duration}${playlist}`,
			thumbnail: {
				url: `${queue.current.thumbnail}`
			},
			footer: {
				text: `mis en file d'attente par ${queue.current.requestedBy.username}#${queue.current.requestedBy.discriminator}`
			},
			color: 0x44b868
        }]});
	}
});