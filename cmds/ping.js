const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('確認延遲'),

  async execute(interaction, client) {
    const sent = await interaction.reply({ content: 'Pinging...' });
    interaction.editReply(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms\nWebsocket heartbeat: ${client.ws.ping}ms.`);
  },
};
