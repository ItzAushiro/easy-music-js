const Command = require("../structures/command.js");
const { QueueRepeatMode } = require('discord-player');
const { MessageEmbed } = require('discord.js');
module.exports = new Command({
	name: "loop",
    aliases: ['repeat'],
	description: "Boucle la file d'attente du serveur",
	permission: "SEND_MESSAGES",
    options: [
        { description: 'Mode boucle à régler', name: 'mode', type: 3 }
    ],
	async run(message, args, client, slash) {
        const queue = client.player.getQueue(message.guild);
        if (!queue) return;
        if(args.length === 0) {
            if(await queue.repeatMode === QueueRepeatMode.OFF || await queue.repeatMode === QueueRepeatMode.AUTOPLAY) {
                queue.setRepeatMode(QueueRepeatMode.QUEUE);
                return message.reply({ embeds: [{ description: `🔄 | Boucler la **file d'attente**.`, color: 0x44b868}] });
            }
            else if(await queue.repeatMode === QueueRepeatMode.QUEUE) {
                queue.setRepeatMode(QueueRepeatMode.TRACK);
                return message.reply({ embeds: [{ description: `🔂 | Lecture en boucle de la **piste actuelle**.`, color: 0x44b868}] });
            }
            else if(await queue.repeatMode === QueueRepeatMode.TRACK) {
                queue.setRepeatMode(QueueRepeatMode.OFF);
                return message.reply({ embeds: [{ description: `✅ | La boucle est maintenant **désactivée**.`, color: 0x44b868}] });
            }
        }
        if(args.includes("off") || args.includes("disable") || args.includes("none")) { 
            queue.setRepeatMode(QueueRepeatMode.OFF);
            slash ? message.reply({embeds: [{ description: `✅ La boucle est maintenant désactivée.`, color: 0x44b868 }]}) : message.react("✅");
        }
        else if(args.includes("track") || args.includes("song") || args.includes("current")) {
            queue.setRepeatMode(QueueRepeatMode.TRACK);
            slash ? message.reply({embeds: [{ description: `🔂 Boucler la piste actuelle.`, color: 0x44b868 }]}) : message.react("🔂");
        }
        else if(args.includes("queue") || args.includes("all")) {
            queue.setRepeatMode(QueueRepeatMode.QUEUE);
            slash ? message.reply({embeds: [{ description: `🔄 Boucler la file d'attente.`, color: 0x44b868}] }) : message.react("🔄");
        }
        else if(args.includes("autoplay")){
            queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
            slash ? message.reply({embeds: [{ description: `▶️ La lecture automatique a été activée.`, color: 0x44b868}] }) : message.react("▶️");
        }
        else {
            const embed = new MessageEmbed()
            embed.setColor('#44b868');
            let mode;
            if(await queue.repeatMode === QueueRepeatMode.OFF) mode = "`Désactivé`";
            else if(await queue.repeatMode === QueueRepeatMode.TRACK) mode = "`Pister`";
            else if(await queue.repeatMode === QueueRepeatMode.QUEUE) mode = "`File d'attente`";
            else if(await queue.repeatMode === QueueRepeatMode.AUTOPLAY) mode = "`Lecture automatique`";
			embed.setDescription(`Mode de boucle actuel : ${mode}\nOptions : désactivé, piste, file d'attente, lecture automatique`);
            message.reply({embeds: [embed]});
        }
	}
});