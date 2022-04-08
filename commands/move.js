const Command = require("../structures/command.js");

module.exports = new Command({
	name: "move",
    aliases: ['m'],
	description: "Déplace une chanson vers une position différente dans la file d'attente",
	permission: "SEND_MESSAGES",
    options: [
        { description: 'Position de la piste à déplacer', name: 'oldposition', required: true, type: 4 },
        { description: 'Nouvelle position de la piste', name: 'newposition', required: true, type: 4 }
    ],
	async run(message, args, client, slash) {
        const queue = client.player.getQueue(message.guild);
        if (!queue || !args[0] || !args[1]) return;
        const trackIndex = args[0] - 1;
        if(!queue.tracks[trackIndex]) return;
        const trackName = queue.tracks[trackIndex].title;
        const trackUrl = queue.tracks[trackIndex].url;
        const track = queue.remove(trackIndex);
        queue.insert(track, args[1] - 1);
        message.reply({
            embeds: [
                {
                    description: `Déplacement de [${trackName}](${trackUrl}) vers la position **${args[1]}**`,
                    color: 0x44b868
                }
            ]
        });
	}
});