const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const {oid} = require('./../config.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverstats')
		.setDescription('伺服器基本資訊'),

	async execute(interaction) {
        const serverinfoembed = new MessageEmbed()
	        .setColor('#c8a9d6')
        	.setTitle(`${interaction.guild.name} 伺服器資訊`)
            .setThumbnail(`${interaction.guild.iconURL()}`)
//	        .setURL('YOUR_SERVER_INVITATION_GOES_HERE')
	        .addFields(
		        {name: '伺服器人數 :', value: `${interaction.guild.memberCount}`},
		        {name: `伺服器建立時間 :`, value: `${interaction.guild.createdAt.toLocaleDateString()} ${interaction.guild.createdAt.toLocaleTimeString()}`},
		        {name: `伺服器擁有者 :`, value:`<@${interaction.guild.ownerId}>`}
        	)
        	.setFooter({text:`伺服器ID : ${interaction.guild.id}`})
	if (interaction.channel.id === '877249017950642307' || interaction.user.id === oid || interaction.channel.id === '877249017950642307'){
		await interaction.reply({ embeds: [serverinfoembed] });
	}else{
		interaction.reply({ content:'請到機器人區域使用', ephemeral: true})
	}
	
	},
};