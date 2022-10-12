const { SlashCommandBuilder } = require('@discordjs/builders');
const { isAdmin, logTime } = require('../modules/utility');
const log = require('../modules/dbFunction/log');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('log-attatchments')
    .setDescription('在此頻道紀錄附件刪除')
    .addSubcommand(sub =>
      sub.setName('add').setDescription('新增記錄頻道')
    )
    .addSubcommand(sub =>
      sub.setName('remove').setDescription('移除記錄頻道')
    ),

  async execute(interaction) {
    if (!isAdmin(interaction)) {
      interaction.reply({ content:'此指令僅限管理員使用', ephemeral: true });
      return;
    }
    const channelId = interaction.channel.id;
    const serverId = interaction.guild.id;
    const Obj = new log.log(serverId);
    if (interaction.options.getSubcommand() === 'add') {
      if (!await Obj.findLogChannel(serverId)) {
        await Obj.addLogChannel(serverId, interaction.guild.name, channelId);
        await interaction.reply('已將此頻道設為附件記錄頻道');
        logTime();
        console.log(`${interaction.user.tag} 新增了附件紀錄頻道 ${channelId}`);
      } else {
        await interaction.reply({ content:'此頻道已經是附件紀錄頻道', ephemeral: true });
        return;
      }
    } else if (interaction.options.getSubcommand() === 'remove') {
      if (!await Obj.findLogChannel(serverId)) {
        await interaction.reply({ content:'此頻道非附件紀錄頻道', ephemeral: true });
        return;
      } else {
        await Obj.deleteLogChannel(serverId);
        await interaction.reply('已取消附件紀錄頻道');
        logTime();
        console.log(`${interaction.user.tag} 取消了附件紀錄頻道 ${channelId}`);
      }
    }
  }
};
