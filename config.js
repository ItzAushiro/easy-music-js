module.exports = {

	//	These values will be ignored if you have set the environment variables (must be in uppercase)
	
		prefix: "e!", // required, command prefix
		botToken: "OTYwOTYyODM4NzM2ODAxODgy.YkyEYg.aDiRckG_rnqtjGe8gUSzQdGsOYU", // required, https://discordjs.guide/preparations/setting-up-a-bot-application.html#your-token
		clientId: "960962838736801882", // optional, the bot's client ID, leave empty to disable slash commands
		geniusApiToken: "VjgNSYVZv6qsup7NP7_B3tLxtBDRpKBt2MRft_s78rNtg2lUL3Jf-BeVlbhXb2_l", // optional, but recommended for lyrics search - https://genius.com/api-clients

		// https://github.com/JoshCunningHum/Dodong-webplayer
		// still under development, so you should leave these empty
		webplayer: "", // optional
		cors: "*", // optional - stored in an array for multiple socket connections in the future. Set to "*" to accept all
};
