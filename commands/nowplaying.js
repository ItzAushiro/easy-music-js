const Command = require("../structures/command.js");
const { MessageEmbed } = require('discord.js');
module.exports = new Command({
	name: "nowplaying",
    aliases: ['np'],
	description: "Affiche des informations sur la chanson en cours de lecture",
	permission: "SEND_MESSAGES",
	async run(message, args, client, slash) {
        const queue = client.player.getQueue(message.guild);
        if (!queue || !queue.playing) {
            const embed = new MessageEmbed();
            embed.setColor('#b84e44');
            embed.setDescription(`Il n'y a rien en cours de lecture sur le serveur.`);
            return message.reply({ embeds: [embed] });
        }
        const progress = queue.createProgressBar({ timecodes: true, length: 8 });

        const title = ['spotify-custom', 'soundcloud-custom'].includes(queue.current.source) ?
             `${queue.current.author} - ${queue.current.title}` : `${queue.current.title}`;

        return message.reply({
            embeds: [
                {
                    description: `**[${title}](${queue.current.url})** - ${queue.current.requestedBy}`,
                    thumbnail: {
                        url: `${queue.current.thumbnail}`
                    },
                    fields: [
                        {
                            name: '\u200b',
                            value: progress.replace(/ 0:00/g, ' ◉ LIVE')
                        }
                    ],
                    color: 0x44b868
                }
            ]
        });
	}
});