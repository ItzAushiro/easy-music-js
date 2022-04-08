const Command = require("../structures/command.js");

module.exports = new Command({
	name: "lyrics",
	aliases: ['l'],
	description: "Affiche les paroles de la chanson actuelle ou spécifiée",
	permission: "SEND_MESSAGES",
    options: [
        { description: 'Nom de la chanson pour rechercher les paroles', name: 'name', type: 3 }
    ],
	async run(message, args, client, slash) {
        const queue = client.player.getQueue(message.guild);
        if(args.length !== 0 || (queue && queue.playing)) {
            let query;
            if(args.length !== 0) query = args.join(" ");
            else query = queue.current.title;

            const result = await client.lyrics.search(query);
            if(!result) {
                message.reply({ embeds: [{ description: !args ? "Aucune parole trouvée pour `"+query+"`.\nEssayez de rechercher manuellement en utilisant `"+client.prefix+"lyrics <songtitle>`" : "Aucune parole trouvée pour `"+query+"`. Essayez d'être plus précis dans votre requête !", color: 0xb84e44}], ephemeral: true });
            }
            else {
                let trimmedLyrics = result.lyrics.length > 4095 ? result.lyrics.substring(0, 4092) + "..." : result.lyrics;
                message.reply({ embeds: [{
                    title: `${result.title} - ${result.artist.name}`,
                    url: result.url,
                    thumbnail: {
                        url: result.thumbnail,
                    },
                    description: trimmedLyrics,
                    color: 0x44b868
                }] });
            }
        }
	}
});