const Command = require("../structures/command.js");

module.exports = new Command({
	name: "play",
    aliases: ['p'],
	description: "Joue la chanson spécifiée",
	permission: "SEND_MESSAGES",
    options: [
        { description: 'URL ou le nom de la music', name: 'song', required: true, type: 3 }
    ],
	async run(message, args, client, slash) {
        if(!message.member.voice.channelId)
            return message.reply({ embeds: [{ description: `Vous n'êtes pas dans un canal vocal!`, color: 0xb84e44 }], ephemeral: true });
        if(message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId)
            return message.reply({ embeds: [{ description: `Vous n'êtes pas dans mon canal vocal!`, color: 0xb84e44 }], ephemeral: true });
        if(!args[0]) return;
        
        if(!message.guild.me.permissionsIn(message.member.voice.channel).has(client.requiredVoicePermissions)) return;

        if(slash) await message.deferReply();
        let query = args.join(" "), reply = {};
        const searchResult = await client.player.search(query, { requestedBy: slash ? message.user : message.author, searchEngine: "dodong" })
        if (!searchResult || !searchResult.tracks.length) {
            reply = { embeds: [{ description: `Aucun résultat trouvé!`, color: 0xb84e44 }], ephemeral: true };
            slash ? message.editReply(reply) : message.reply(reply);
            return;
        }
        const queue = await client.player.createQueue(message.guild,{ metadata: { channel: message.channel },

            bufferingTimeout: 1000,
            disableVolume: false, // disabling volume controls can improve performance
            leaveOnEnd: true,
			leaveOnStop: true,
            spotifyBridge: false
			//leaveOnEmpty: true, // not working for now, discord-player issue
			//leaveOnEmptyCooldown: 300000,
        });
        let justConnected;
        try {
            if (!queue.connection) {
                justConnected = true;
                await queue.connect(message.member.voice.channel);
            }
        } catch {
            client.player.deleteQueue(message.guild);
            reply = { embeds: [{ description: `Impossible de rejoindre votre canal vocal !`, color: 0xb84e44 }] };
            slash ? message.editReply(reply) : message.reply(reply);
            return;
        }
        
        if(searchResult.playlist) {
            reply = { embeds: [{
                description: `Pistes **${searchResult.tracks.length}** en file d'attente de [${searchResult.tracks[0].playlist.title}](${searchResult.tracks[0].playlist.url})`,
                color: 0x44b868
            }] };
            queue.addTracks(searchResult.tracks);
        } else {
            reply = { embeds: [{
                description: `Pistes **[${searchResult.tracks[0].title}](${searchResult.tracks[0].url})**`,
                color: 0x44b868
            }] };
            queue.addTrack(searchResult.tracks[0]);
        }
        slash ? message.editReply(reply) : message.reply(reply);

        if(justConnected) queue.play();
	}
});
