const { SlashCommandBuilder, MessageFlags } = require('discord.js')
const log = require('../modules/dbFunction/log')
const { isAdmin, logTime } = require('../modules/utility')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('logchannel')
    .setDescription('在此頻道紀錄訊息編輯與刪除')
    .addSubcommand(sub =>
      sub.setName('add')
        .setDescription('新增記錄頻道'),
    )
    .addSubcommand(sub =>
      sub.setName('remove')
        .setDescription('移除記錄頻道'),
    ),

  async execute(interaction) {
    if (!isAdmin(interaction)) {
      interaction.reply({ content: '此指令僅限管理員使用', flags: MessageFlags.Ephemeral })
      return
    }
    const channelId = interaction.channel.id
    const serverId = interaction.guild.id
    const Obj = new log.log(serverId)
    if (interaction.options.getSubcommand() === 'add') {
      if (!await Obj.findLogChannel(serverId)) {
        await Obj.addLogChannel(serverId, interaction.guild.name, channelId)
        await interaction.reply('已將此頻道設為記錄頻道')
        logTime()
        console.log(`${interaction.user.displayName} 新增了紀錄頻道 ${channelId}`)
      } else {
        await interaction.reply({ content: '此頻道已經是紀錄頻道', flags: MessageFlags.Ephemeral })
      }
    } else if (interaction.options.getSubcommand() === 'remove') {
      if (!await Obj.findLogChannel(serverId)) {
        await interaction.reply({ content: '此頻道非紀錄頻道', flags: MessageFlags.Ephemeral })
      } else {
        await Obj.deleteLogChannel(serverId)
        await interaction.reply('已取消紀錄頻道')
        logTime()
        console.log(`${interaction.user.displayName} 取消了紀錄頻道 ${channelId}`)
      }
    }
  },
}
