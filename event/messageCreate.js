const config = require('../config.json')
const {prefix} = require('../config.json')
const {WebhookClient,MessageEmbed } = require('discord.js');


module.exports = async (client, msg) => {
    //normal
	if (msg.channelId === '950020050792894464'){

		const webhook = new WebhookClient({url : config.webhooks.mikeneko.normal});
		webhook.send({
			content: `${msg.content}`,
			username: `${msg.author.tag}`,
			avatarURL: `${msg.author.avatarURL()}`
		})

	}

	//tc
	if (msg.channelId === '951115920607154186'){

		const webhook = new WebhookClient({url : config.webhooks.mikeneko.tcMember});
		webhook.send({
			content: `${msg.content}`,
			username: `${msg.author.tag}`,
			avatarURL: `${msg.author.avatarURL()}`
		})

	}

	//yt
	if (msg.channelId === '951116441497792664'){

		const webhook = new WebhookClient({url : config.webhooks.mikeneko.ytMember});
		webhook.send({
			content: `${msg.content}`,
			username: `${msg.author.tag}`,
			avatarURL: `${msg.author.avatarURL()}`
		})

	}
	//檢舉區
	if (msg.channelId === '965615569686642729'){

		msg.author.send('已收到你的檢舉，管理員會盡速處理')
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

	//人設指令
	const args = msg.content.slice(prefix.length).split(' ')
	if(msg.content.startsWith(prefix) && msg.author.id === config.oid){
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
        if (msg.author.id === config.oid) return;
		const embed = new MessageEmbed()
			.setColor('AQUA')
			.setTitle(`${msg.author.tag}(${msg.author.id}) 在 #${msg.channel.name} 提及了蒼`)
			.setDescription(`<#${msg.channelId}> <@${msg.author.id}>\n`+ msg.content )
		client.users.fetch(config.oid).then((owner) => 
		owner.send({embeds:[embed]}))
	}

	/*if(msg.content.includes('check')){
		console.log(`check from ${msg.author.tag} in ${msg.channel.type}`)
		console.log('check')
		msg.author.send('check')
		client.users.fetch('862307742710366240').then((owner)=>
		owner.send('check'))
	}*/

}