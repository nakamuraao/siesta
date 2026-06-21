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
        { name: 'v 4.5.1 (2026/6/10)', value: '修正錯誤與資料庫重整' },
        { name: 'v 4.5.2 (2026/6/20)', value: '更新生日模組(Oliver Mak)' },
        { name: 'v 4.5.3 (2026/6/21)', value: '修正錯誤與更新discord.js v.14' },
      );

    await interaction.reply({ embeds: [botstatsembed] });
  },
};
