const Command = require("../structures/command.js");
const { MessageEmbed } = require('discord.js');

module.exports = new Command({
	name: "botinfo",
	aliases: [],
	description: "Affiche des informations sur le bot",
	permission: "SEND_MESSAGES",
	async run(message, args, client, slash) {
		const embed = new MessageEmbed()
			.setDescription(`**Ping du bot**: ${client.ws.ping} ms
			**Prefix du bot** : ${client.prefix}\n
			**Nombre de serveur où le bot est** : ${client.guilds.cache.size} serveurs
			**Node.js version** : ${process.version}
			**Créateur** : ItzAushiro#2551
			**Nombres de commandes** : 25 commandes
			**En train de regarder** : ${client.guilds.cache.reduce((a, b) => a + b?.memberCount, 0)} membres`).setColor('RANDOM');
		const m = await message.reply({ embeds: [embed] });
		const msg = slash ? await message.fetchReply() : m;
		embed.setDescription(`**Ping du bot**: ${client.ws.ping} ms
		**Prefix du bot** : ${client.prefix}\n
		**Nombre de serveur où le bot est** : ${client.guilds.cache.size} serveurs
		**Node.js version** : ${process.version}
		**Créateur** : ItzAushiro#2551
		**Nombres de commandes** : 25 commandes
		**En train de regarder** : ${client.guilds.cache.reduce((a, b) => a + b?.memberCount, 0)} Membres`).setColor('RANDOM');(
			{ embeds: [embed] }
		);
	}
});