const Command = require("../structures/command.js");
const { MessageEmbed } = require('discord.js');

module.exports = new Command({
	name: "invite",
	aliases: ['inv'],
	description: "Lien pour inviter le bot",
	permission: "SEND_MESSAGES",
	async run(message, args, client, slash) {
		const embed = new MessageEmbed()
			.setDescription(`**Lien pour inviter EasyMusic** : https://discord.com/api/oauth2/authorize?client_id=960962838736801882&permissions=8&scope=applications.commands%20bot`).setColor('GREEN');
		const m = await message.reply({ embeds: [embed] });
		const msg = slash ? await message.fetchReply() : m;
		embed.setDescription(`**Lien pour inviter EasyMusic** : https://discord.com/api/oauth2/authorize?client_id=960962838736801882&permissions=8&scope=applications.commands%20bot`).setColor('RANDOM');(
			{ embeds: [embed] }
		);
	}
});