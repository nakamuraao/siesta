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
        { name: 'v 4.0.4 (2024/6/21)', value: '更新晚餐資料庫' },
        { name: 'v 4.0.5 (2024/6/26)', value: '修正資料庫問題' },
        { name: 'v 4.1.0 (2024/8/29)', value: '修正log事件問題' }
      );

    await interaction.reply({ embeds: [botstatsembed] });
  }
};
