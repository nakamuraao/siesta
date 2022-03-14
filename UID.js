const { token } = require('./config.json');
const fs = require('fs');
const { Client, Collection, Intents, WebhookClient } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS , Intents.FLAGS.GUILD_MESSAGES ,Intents.FLAGS.GUILD_WEBHOOKS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./cmds/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log(`以 ${client.user.tag} 登入`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

});

client.on('messageCreate', async msg => {
	if (msg.author.bot) return;

	if (msg.channelId === '950020050792894464'){

		const webhook = new WebhookClient({url : 'https://discord.com/api/webhooks/952935493153222756/7mtoiRicyc-4LJ5zmvMhedcXDzUFhi9pw_tEncTZ7UEhYB5vabMZmfdqo72GqNp6Se_J'});
		webhook.send({
			content: `${msg.content}`,
			username: `${msg.author.tag}`,
			avatarURL: `${msg.author.avatarURL}`
		})

	}
})

client.login(token);