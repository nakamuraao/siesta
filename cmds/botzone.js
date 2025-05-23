const { SlashCommandBuilder, MessageFlags } = require('discord.js')
const botzone = require('../modules/dbFunction/botChannel')
const { isAdmin, logTime } = require('../modules/utility')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('botzone')
    .setDescription('設定機器人區域')
    .addStringOption(option =>
      option.setName('move')
        .setDescription('選擇動作')
        .setRequired(true)
        .addChoices({ name: 'add', value: 'add' }, { name: 'remove', value: 'remove' })),

  async execute(interaction) {
    if (!isAdmin(interaction)) {
      interaction.reply({ content: '此指令僅限管理員使用', flags: MessageFlags.Ephemeral })
      return
    }
    const channelId = interaction.channel.id
    const Obj = new botzone.botzone(channelId)
    const move = interaction.options.getString('move')

    if (move === 'add') {
      if (!await Obj.findChannel(channelId)) {
        await Obj.addBotZone(channelId)
        await interaction.reply('已將此頻道設為機器人區域')
        logTime()
        console.log(`-----------------------\n${interaction.user.displayName} 新增了機器人頻道 ${channelId}\n-----------------------`)
      } else {
        await interaction.reply({ content: '此頻道已經是機器人區域', flags: MessageFlags.Ephemeral })
      }
    } else if (move === 'remove') {
      if (!await Obj.findChannel(channelId)) {
        await interaction.reply({ content: '此頻道非機器人區域', flags: MessageFlags.Ephemeral })
      } else {
        await Obj.deleteChannel(channelId)
        await interaction.reply('已取消機器人區域')
        logTime()
        console.log(`-----------------------\n${interaction.user.displayName} 取消了機器人頻道 ${channelId}\n-----------------------`)
      }
    } else {
      await interaction.reply({ content: '執行此指令時出現問題', flags: MessageFlags.Ephemeral })
    }
  },
}
