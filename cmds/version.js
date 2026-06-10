const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('version')
    .setDescription('版本更新紀錄'),
  async execute(interaction) {
    const botstatsembed = new EmbedBuilder()
      .setColor('#FFFFFF')
      .setThumbnail(`${interaction.client.user.avatarURL()}`)
      .setTitle('版本更新紀錄')
      .setDescription('詳見 https://github.com/nakamuraao/siesta')
      .addFields(
        { name: 'v 4.3.0 (2025/7/22)', value: '新增隨機挑選(Oliver Mak)' },
        { name: 'v 4.4.0 (2025/12/3)', value: '更新反應' },
        { name: 'v 4.5.0 (2026/6/9)', value: '新增生日模組(私人)' },
        { name: 'v 4.5.1 (2026/6/10)', value: '修正錯誤與資料庫重整' },
      );

    await interaction.reply({ embeds: [botstatsembed] });
  },
};
