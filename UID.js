const { token } = require('./config.json');
const fs = require('fs');
const { Client, Collection, Intents, WebhookClient,MessageEmbed } = require('discord.js');
const  config  = require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS , Intents.FLAGS.GUILD_MESSAGES ,Intents.FLAGS.GUILD_WEBHOOKS] });
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
	//新增檢舉區

	//人設指令
	const args = msg.content.slice(prefix.length).split(' ')
	if(msg.content.startsWith(prefix) && msg.author.id === '678493512836317194'){
		if (msg.content.includes('listcharacters') || msg.content.includes('lc')){
			const embed = new MessageEmbed()
				.setColor('#c5c6c9')
				.setTitle('可用人設')
				.setDescription('1.エミリア\n2.めぐみん\n3.ニニム\n4.シエスタ\n5.シエル\n6.イレイナ\n7.Zeta\n8.レーナ')
			msg.channel.send({embeds:[embed]})
			await msg.delete()
		}else if(msg.content.includes('setcharacter') || msg.content.includes('sc')){
			if(args[1] === '1'){
				client.user.setUsername('エミリア')
				client.user.setAvatar('https://media.discordapp.net/attachments/867034103097196544/964534390451490857/unknown.png')
			}else if(args[1] === '2'){
				client.user.setUsername('めぐみん')
				client.user.setAvatar('https://media.discordapp.net/attachments/867034103097196544/964534908414459914/unknown.png')
			}else if(args[1] === '3'){
				client.user.setUsername('ニニム')
				client.user.setAvatar('https://cdn.discordapp.com/attachments/867034103097196544/964535108369518654/unknown.png')
			}else if(args[1] === '4'){
				client.user.setUsername('シエスタ')
				client.user.setAvatar('https://media.discordapp.net/attachments/867034103097196544/964852363707953162/IMG_20220402_1134062.jpg?width=468&height=468')
			}else if(args[1] === '5'){
				client.user.setUsername('シエル')
				client.user.setAvatar('https://media.discordapp.net/attachments/867034103097196544/962620978075160586/FGo0dVpVEAAWgjS.png')
			}else if(args[1] === '6'){
				client.user.setUsername('イレイナ')
				client.user.setAvatar('https://media.discordapp.net/attachments/867034103097196544/964535722457575454/unknown.png')
			}else if(args[1] === '7'){
				client.user.setUsername('Vestia Zeta')
				client.user.setAvatar('https://media.discordapp.net/attachments/867034103097196544/964850615991803904/zeta.png')
			}else if(args[1] === '8'){
				client.user.setUsername('レーナ')
				client.user.setAvatar('https://media.discordapp.net/attachments/867034103097196544/964536496801591307/unknown.png')
			}
			await msg.channel.send('已變更人設')
			msg.delete()
		}else if(msg.content.includes('bomb')){
			for(let i=0; i<args[1]; i++){
				msg.channel.send(args[2])
			}
		}
	}

	//監控
	if (msg.content.includes('蒼')){

		client.users.fetch(config.oid).then((owner) => 
		owner.send({embeds:[embed]}))
	}

	//DM
	if (msg.channel.type === 'DM' && !msg.author.id===(config.oid)){
		const embed = new MessageEmbed()
			.setColor('#c5c6c9')
			.setTitle(`來自 <@${msg.author.id}> ${msg.author.tag} (${msg.author.id})的訊息`)
			.addField(`訊息內容`, msg.content, false)
			.setFooter({text:`來信時間 : ${msg.createdAt.toLocaleDateString()} ${msg.createdAt.toLocaleTimeString()}`})
		if (msg.attachments.hasAny()){
			embed.setImage(msg.attachments)
			}

		client.users.fetch(config.oid).then((owner)=>
		owner.send({embeds:[embed]})
		)
	}
	
})

client.login(token);