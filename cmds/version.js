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
        { name: 'v 4.1.2 (2024/11/19)', value: '更新晚餐(由oliver139提供PR)、修正serverstats, report問題' },
        { name: 'v 4.1.3 (2024/12/10)', value: '更新晚餐&新增"喝什麼"(由oliver139提供PR)' },
        { name: 'v 4.2.0 (2025/1/17)', value: '更新晚餐、新增`/funhelp`指令(由oliver139提供PR)' }
      );

    await interaction.reply({ embeds: [botstatsembed] });
  }
};
