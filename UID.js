const { token } = require('./config.json');
const fs = require('fs');
const { Client, Collection, Intents, WebhookClient,MessageEmbed } = require('discord.js');
const { config } = require('process');
const client = new Client({ intents: [Intents.FLAGS.GUILDS , Intents.FLAGS.GUILD_MESSAGES ,Intents.FLAGS.GUILD_WEBHOOKS] });
const prefix = '->'

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

	//normal
	if (msg.channelId === '950020050792894464'){

		const webhook = new WebhookClient({url : 'https://discord.com/api/webhooks/952935493153222756/7mtoiRicyc-4LJ5zmvMhedcXDzUFhi9pw_tEncTZ7UEhYB5vabMZmfdqo72GqNp6Se_J'});
		webhook.send({
			content: `${msg.content}`,
			username: `${msg.author.tag}`,
			avatarURL: `${msg.author.avatarURL()}`
		})

	}

	//tc
	if (msg.channelId === '951115920607154186'){

		const webhook = new WebhookClient({url : 'https://discord.com/api/webhooks/957162016785711134/TIMHVfMweK5-w5pgkdLq6LQ1Njx0i6uMYiv8niBa2SJ79wJGhOOreoVaTVUIGEXdg2B9'});
		webhook.send({
			content: `${msg.content}`,
			username: `${msg.author.tag}`,
			avatarURL: `${msg.author.avatarURL()}`
		})

	}

	//yt
	if (msg.channelId === '951116441497792664'){

		const webhook = new WebhookClient({url : 'https://discord.com/api/webhooks/957162169127022652/fOXsGHo6tX8QHv85EOmnkSg26dNSRMmRt76twEZWURb0iu6UAuYfyA-eJHgO8GXXf5Qa'});
		webhook.send({
			content: `${msg.content}`,
			username: `${msg.author.tag}`,
			avatarURL: `${msg.author.avatarURL()}`
		})

	}

	//人設指令
	const args = msg.content.slice(prefix.length).split(' ')
	if(msg.content.startsWith(prefix) && msg.author.id === '678493512836317194'){
		if (msg.content.includes('listcharacters') || msg.content.includes('lc')){
			const embed = new MessageEmbed()
				.setColor('#c5c6c9')
				.setTitle('可用人設')
				.setDescription('1.エミリア\n2.めぐみん\n3.ニニム\n4.シエスタ\n5.シエル\n6.イレイナ\n7.Zeta\n8.レーナ')
			msg.channel.send({embeds:[embed]})
		}else if(msg.content.includes('setcharacter') || msg.content.includes('sc')){
			if(args[0] === '1'){
				client.user.setUsername('エミリア')
				client.user.setAvatar('https://media.discordapp.net/attachments/867034103097196544/964534390451490857/unknown.png')
			}else if(args[0] === '2'){
				client.user.setUsername('めぐみん')
				client.user.setAvatar('https://media.discordapp.net/attachments/867034103097196544/964534908414459914/unknown.png')
			}else if(args[0] === '3'){
				client.user.setUsername('ニニム')
				client.user.setAvatar('https://cdn.discordapp.com/attachments/867034103097196544/964535108369518654/unknown.png')
			}else if(args[0] === '4'){
				client.user.setUsername('シエスタ')
				client.user.setAvatar('https://cdn.discordapp.com/avatars/843890891704893530/74672ea8a10626234e0cd1ad7ce1e5d8.png?size=2048')
			}else if(args[0] === '5'){
				client.user.setUsername('シエル')
				client.user.setAvatar('https://media.discordapp.net/attachments/867034103097196544/962620978075160586/FGo0dVpVEAAWgjS.png')
			}else if(args[0] === '6'){
				client.user.setUsername('イレイナ')
				client.user.setAvatar('https://media.discordapp.net/attachments/867034103097196544/964535722457575454/unknown.png')
			}else if(args[0] === '7'){
				client.user.setUsername('Vestia Zeta')
				client.user.setAvatar('https://cdn.discordapp.com/avatars/843890891704893530/b41cf376ddb11755064677dccc391826.png?size=2048')
			}else if(args[0] === '8'){
				client.user.setUsername('レーナ')
				client.user.setAvatar('https://media.discordapp.net/attachments/867034103097196544/964536496801591307/unknown.png')
			}
		}
	}

	
})

client.login(token);