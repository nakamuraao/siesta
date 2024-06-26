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
        { name: 'v 4.0.0 (2024/6/15)', value: '更新至discord.js v14，優化程式碼' },
        { name: 'v 4.0.1 (2024/6/18)', value: '用戶回報ddinstagram不顯示，暫停轉換instagram連結' },
        { name: 'v 4.0.2 (2024/6/19)', value: '優化`/report` `/serversetup`指令' },
        { name: 'v 4.0.3 (2024/6/19)', value: '更新指令執行失敗訊息，優化程式碼' },
        { name: 'v 4.0.4 (2024/6/21)', value: '更新晚餐資料庫' }
      );

    await interaction.reply({ embeds: [botstatsembed] });
  }
};
