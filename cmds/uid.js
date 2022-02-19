const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('uid')
		.setDescription('查詢UID'),
	async execute(interaction) {
        const uidembed = new MessageEmbed()
        	.setColor('#68c3e7')
            .setDescription('`'+`${interaction.user.id}`+'`')

		await interaction.reply({ embeds: [uidembed] });
    }
};