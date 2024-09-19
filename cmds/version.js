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
        { name: 'v 4.1.0 (2024/8/29)', value: '修正log事件問題' },
        { name: 'v 4.1.1 (2024/9/19)', value: '更新晚餐(由oliver139提供PR)、修正inrole指令問題、調整log事件顏色' }
      );

    await interaction.reply({ embeds: [botstatsembed] });
  }
};
