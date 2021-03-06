const { token } = require('./config.json');
const fs = require('fs');
const sql = require('sequelize')
const { Client, Collection, Intents,MessageEmbed,WebhookClient} = require('discord.js');
const  config  = require('./config.json');
const {omikuji, randomNumber,isOwner,dinnerTonight} = require('./modules/utility');
const  botzoneDB  = require('./modules/dbFunction/botChannel');
const logging = require('./modules/dbFunction/log')
const client = new Client({partials:["CHANNEL","MESSAGE","USER"], intents: [Intents.FLAGS.GUILDS , Intents.FLAGS.GUILD_MESSAGES ,Intents.FLAGS.GUILD_WEBHOOKS , Intents.FLAGS.DIRECT_MESSAGES,Intents.FLAGS.GUILD_BANS , Intents.FLAGS.GUILD_MEMBERS]});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./cmds/${file}`);
	client.commands.set(command.data.name, command);
}


const sequelize = new sql('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const servers = require('./modules/dbStructure/servers')(sequelize, sql.DataTypes)
const botzone = require('./modules/dbStructure/botChannel')(sequelize, sql.DataTypes)
const log = require('./modules/dbStructure/log')(sequelize,sql.DataTypes)
const currency = require('./modules/dbStructure/currency')(sequelize,sql.DataTypes)

client.once('ready', () => {
	const now = new Date()
	const time = now.toTimeString()
	console.log(`${time}`)

	servers.sync()
	//新增 : 更新servers人數
	botzone.sync()
	log.sync()
	currency.sync()

	console.log(`以 ${client.user.tag} 登入`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;


	try {
		await command.execute(interaction,client);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

});

client.on('messageDelete', async msg=>{
	const Obj = new logging.log
	if(msg.attachments.size>0){
		if(await Obj.findLogChannel(msg.guildId)){
			
			const embed = new MessageEmbed().setColor('GREEN').setTitle(`附件刪除 #${msg.channel.name}`).setDescription(msg.author.tag)
			if(msg.content){
				embed.addField('訊息內容',`${msg.content}`,false)
			}
			const logChannel = client.channels.cache.get(await Obj.logChannelId(msg.guildId))
			
			msg.attachments.forEach(a=>{
				const url = a.url
				logChannel.send(url)
			})
			await logChannel.send({embeds:[embed]})
		}else return
	}
})

client.on('messageCreate', async msg => {

	if (msg.author.bot) return;	
	const Obj = new botzoneDB.botzone(msg.channel.id);
	//監控
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
	}else if(msg.content.includes('機率')&&(await Obj.findChannel(msg.channelId)||isOwner(msg.author.id))){
		let min = 0
		let max = 100
		const num = randomNumber(min,max)
		msg.channel.send(`${num}%`)
	}else if (msg.content.includes('抽籤')&& await Obj.findChannel(msg.channelId)){
		omikuji(msg)
	}else if(msg.content.includes('晚餐吃什麼')&& await Obj.findChannel(msg.channelId)){
		//const din = await dinnerTonight()
		msg.reply(`今天晚餐吃 ${dinnerTonight()}`)
	}else if (msg.content === `<@${config.cid}>我婆` || msg.content === `<@!${config.cid}>我婆`){
		if (isOwner(msg.author.id)){
			msg.reply('沒錯♥')
		}else{
			msg.reply('婆你個大頭 醒')
		}
	}else if (msg.content.includes('蒼')){
        if (msg.author.id === config.oid) return;
		const embed = new MessageEmbed()
			.setColor('AQUA')
			.setTitle(`${msg.author.tag}(${msg.author.id}) 在 #${msg.channel.name} 提及了蒼`)
			.setDescription(`<#${msg.channelId}> <@${msg.author.id}>\n`+ msg.content )
		client.users.fetch(config.oid).then((owner) => 
		owner.send({embeds:[embed]}))
	}


	//normal
	if (msg.channelId === config.webhooks.mikeneko.normalChannel){

		const webhook = new WebhookClient({url : config.webhooks.mikeneko.normal});
		webhook.send({
			content: ` : ${msg.content}`,
			username: `${msg.author.tag}`,
			avatarURL: `${msg.author.avatarURL()}`
		})

	}

	//tc
	if (msg.channelId === config.webhooks.mikeneko.tcChannel){

		const webhook = new WebhookClient({url : config.webhooks.mikeneko.tcMember});
		webhook.send({
			content: ` : ${msg.content}`,
			username: `${msg.author.tag}`,
			avatarURL: `${msg.author.avatarURL()}`
		})

	}

	//yt
	if (msg.channelId === config.webhooks.mikeneko.ytChannel){

		const webhook = new WebhookClient({url : config.webhooks.mikeneko.ytMember});
		webhook.send({
			content: ` : ${msg.content}`,
			username: `${msg.author.tag}`,
			avatarURL: `${msg.author.avatarURL()}`
		})

	}
	//檢舉區
	if (msg.channelId === config.webhooks.mikeneko.reportChannel){

		msg.author.send('已收到你的檢舉，管理員會盡速處理').catch(error=>{
			console.log(error)
		})
		const webhook = new WebhookClient({url : config.webhooks.mikeneko.report});
		webhook.send({
			content: `${msg.content}`,
			username: `${msg.author.tag}`,
			avatarURL: `${msg.author.avatarURL()}`
		})

		if (msg.attachments.size > 0){
			msg.attachments.forEach(a=>{
				const url = a.url
				webhook.send({
					content: `${url}`,
					username: `${msg.author.tag}`,
					avatarURL: `${msg.author.avatarURL()}`
				})
			})}
	}

	//amemiya
	if (msg.channelId === config.webhooks.mikeneko.amemiyaChannel){

		const webhook = new WebhookClient({url : config.webhooks.mikeneko.amemiya});
		webhook.send({
			content: ` : ${msg.content}`,
			username: `${msg.author.tag}`,
			avatarURL: `${msg.author.avatarURL()}`
		})

	}
})

client.login(token);