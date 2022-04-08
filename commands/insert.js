const Command = require("../structures/command.js");

module.exports = new Command({
	name: "insert",
    aliases: ['i', 'pn', 'playnext'],
	description: "Insère la chanson spécifiée à la position suivante dans la file d'attente",
	permission: "SEND_MESSAGES",
    options: [
        { description: 'URL or song name', name: 'song', required: true, type: 3 }
    ],
	async run(message, args, client, slash) {
        if(!message.member.voice.channelId)
            return message.reply({ embeds: [{ description: `Vous n'êtes pas dans un canal vocal !`, color: 0xb84e44 }], ephemeral: true });
        if(message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId)
            return message.reply({ embeds: [{ description: `Vous n'êtes pas dans mon canal vocal !`, color: 0xb84e44 }], ephemeral: true });
		
		const queue = client.player.getQueue(message.guild);
		if(!queue || !args[0]) return;
        
        if(slash) await message.deferReply();
        let query = args.join(" "), reply = {};
        const searchResult = await client.player.search(query, { requestedBy: slash ? message.user : message.author, searchEngine: "dodong" })
        if (!searchResult || !searchResult.tracks.length)
            reply = { embeds: [{ description: `Aucun résultat trouvé!`, color: 0xb84e44 }], ephemeral: true };
        
        else if(searchResult.playlist)
            reply = { embeds: [{ description: `Cette commande ne prend pas en charge les listes de lecture.\nUtilisez **${client.prefix}play** à la place.`, color: 0xb84e44 }], ephemeral: true };
		
		else {
            queue.insert(searchResult.tracks[0], 0);

            reply = {
                embeds: [{
                    description: `En file d'attente **[${searchResult.tracks[0].title}](${searchResult.tracks[0].url})** à la position **1**`,
                    color: 0x44b868
                }]
            };
        }
		if(slash) message.editReply(reply);
		else message.reply(reply);
	}
});
