const Command = require("../structures/command.js");
const { MessageEmbed } = require('discord.js');

module.exports = new Command({
	name: "ping",
	aliases: [],
	description: "Affiche le ping du bot",
	permission: "SEND_MESSAGES",
	async run(message, args, client, slash) {
		const embed = new MessageEmbed()
			.setDescription(` :green_circle: API latence: **${client.ws.ping} ms**`).setColor('#b84e44');
		const m = await message.reply({ embeds: [embed] });
		const msg = slash ? await message.fetchReply() : m;
		embed.setDescription(` :green_circle: API latence: **${client.ws.ping} ms**\n :orange_circle: Message de la latence: **${msg.createdTimestamp - message.createdTimestamp} ms**\n`).setColor('#44b868');
		msg.edit(
			{ embeds: [embed] }
		);
	}
});