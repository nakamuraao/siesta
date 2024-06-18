const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { version } = require('../package.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('version')
    .setDescription('版本更新紀錄'),
  async execute(interaction) {
    const botstatsembed = new EmbedBuilder()
      .setColor('#FFFFFF')
      .setThumbnail(`${interaction.client.user.avatarURL()}`)
      .setTitle('版本更新紀錄')
      .setDescription('詳見https://github.com/nakamuraao/siesta')
      .addFields(
        { name: 'v 4.0.0 (2024/6/15)', value: '更新至discord.js v14，優化程式碼' },
        { name: 'v 4.0.1 (2024/6/18)', value: '用戶回報ddinstagram不顯示，暫停轉換instagram連結' }
      );

    await interaction.reply({ embeds: [botstatsembed] });
  }
};
