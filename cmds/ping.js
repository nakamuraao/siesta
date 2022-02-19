const { SlashCommandBuilder } = require('@discordjs/builders');
const {oid} = require('./../config.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('確認延遲'),

	async execute(interaction) {

		const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
		interaction.editReply(`${sent.createdTimestamp - interaction.createdTimestamp}ms`);

	}
};