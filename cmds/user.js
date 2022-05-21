const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('個人資訊')
		.addUserOption(option=> option.setName('user').setDescription('目標使用者').setRequired(true)),

	async execute(interaction) {
		const user = interaction.options.getUser('user')
        const userinfoembed = new MessageEmbed()
        	.setColor('#68c3e7')
	        .setThumbnail(`${user.avatarURL()}`)
			.setDescription(`<@${user.id}>`)
	        .addFields(
		        {name: '用戶名 :', value: `${user.tag}`},
		        {name: `UID :`, value: `${user.id}`},
        		{name: `加入DC時間 :`, value: `${user.createdAt.toLocaleDateString()} ${user.createdAt.toLocaleTimeString()}`},
        	)
		await interaction.reply({ embeds: [userinfoembed] });
	
}}