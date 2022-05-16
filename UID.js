const { token } = require('./config.json');
const fs = require('fs');
const { Client, Collection, Intents,MessageEmbed } = require('discord.js');
const  config  = require('./config.json');
const client = new Client({partials:["CHANNEL"], intents: [Intents.FLAGS.GUILDS , Intents.FLAGS.GUILD_MESSAGES ,Intents.FLAGS.GUILD_WEBHOOKS , Intents.FLAGS.DIRECT_MESSAGES , Intents.FLAGS.GUILD_MEMBERS]});
const prefix = '-'

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

	//DM
	if (msg.channel.type === 'DM'){
		if(msg.author.id === config.oid)return;
		const embed1 = new MessageEmbed()
			.setColor('#c5c6c9')
			.setTitle(`來自 ${msg.author.tag} (${msg.author.id})的訊息`)
			.setDescription(`<@${msg.author.id}>\n` + msg.content)
			.setFooter({text:`來信時間 : ${msg.createdAt.toLocaleDateString()} ${msg.createdAt.toLocaleTimeString()}`})

		if(msg.attachments.size > 0){
			msg.attachments.forEach(a=>{
				const url = a.url
				embed1.setImage(url)
			})
		}
		client.users.fetch(config.oid).then((owner)=>
		owner.send({embeds:[embed1]})
		)
	}

	require('./event/messageCreate')(msg,client)
})

client.login(token);