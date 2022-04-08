const Event = require("../structures/event.js");

module.exports = new Event("ready", client => {
	console.log("EasyMusic is ready! ");
	client.user.setActivity(`${client.prefix}help`, { type: 'STREAMING' , url : "https://twitch.tv/itzaushiro" });
});