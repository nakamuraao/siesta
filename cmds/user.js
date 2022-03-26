const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const {oid} = require('./../config.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('個人資訊'),
	async execute(interaction) {
        const userinfoembed = new MessageEmbed()
        	.setColor('#68c3e7')
	        .setThumbnail(`${interaction.user.avatarURL()}`)
	        .addFields(
		        {name: '用戶名 :', value: `${interaction.user.tag}`},
		        {name: `UID :`, value: `${interaction.user.id}`},
        		{name: `加入DC時間 :`, value: `${interaction.user.createdAt.toLocaleDateString()} ${interaction.user.createdAt.toLocaleTimeString()}`},
        	)
	interaction.reply({ embeds: [userinfoembed] });
	
}}