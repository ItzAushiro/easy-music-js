const Command = require("../structures/command.js");
const { MessageEmbed } = require('discord.js');
const maxVolume = 100;

module.exports = new Command({
    name: "volume",
    aliases: ["vol"],
    description: "Ajusté le volume du robot",
    permission: "SEND_MESSAGES",
    options: [
        { description: 'Niveau de volume de 1 à 100', name: 'level', type: 4 }
    ],
    async run(message, args, client, slash) {
        const queue = client.player.getQueue(message.guild);
        if (!queue || !queue.playing) {
            const embed = new MessageEmbed();
            embed.setColor('#b84e44');
            embed.setDescription(`Il n'y a rien en cours de lecture sur le serveur.`);
            return message.reply({ embeds: [embed], ephemeral: true });
        }

        // returns the current volume, instructions for adjusting the volume if theres no args
        const vol = parseInt(args);
        if (!vol) {
            const embed = new MessageEmbed();
            embed.setColor('#44b868');
            embed.setDescription(`Le volume est réglé sur 🔊 ${queue.volume} \n*↳ Veuillez saisir entre **1** et **${maxVolume}** pour modifier le volume.*`);
            return message.reply({ embeds: [embed], ephemeral: true });
        }

        // checks if the volume has already set on the requested value
        if (queue.volume === vol) {
            const embed = new MessageEmbed();
            embed.setColor('#b84e44');
            embed.setDescription(`Le volume que vous souhaitez modifier est le même que celui en cours. \n*↳ Veuillez réessayer avec un numéro différent.*`);
            return message.reply({ embeds: [embed] });
        }

        // checks the requested value is valid
        if (vol < 0 || vol > maxVolume) {
            const embed = new MessageEmbed();
            embed.setColor('#b84e44');
            embed.setDescription(`le nombre spécifié n'est pas valide. \n*↳ Veuillez saisir entre **1** et **${maxVolume}** pour modifier le volume.*`);
            return message.reply({ embeds: [embed] });
        }

        const success = queue.setVolume(vol);
        if(success)
            slash ? message.reply({embeds: [{ description: `✅ Volume réglé sur ${vol}`, color: 0x44b868 }]}) : message.react(`✅`);
    },
});
