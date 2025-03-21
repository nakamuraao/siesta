const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const database = require('../modules/dbFunction/database')
const { isAdmin, isOwner } = require('../modules/utility')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serversetup')
    .setDescription('伺服器資訊設定')
    .addSubcommand(sub =>
      sub.setName('setup')
        .setDescription('設定伺服器資訊')
        .addRoleOption(option =>
          option.setName('admin')
            .setDescription('管理員身分組')
            .setRequired(true)))
    .addSubcommand(sub =>
      sub.setName('list')
        .setDescription('列出伺服器資訊')),

  async execute(interaction) {
    if (!isAdmin(interaction)) {
      interaction.reply({ content: '此指令僅限管理員使用', ephemeral: true })
      return
    }

    const guildId = interaction.guild.id
    const Obj = new database.ServerDB(guildId)

    if (interaction.options.getSubcommand() === 'setup') {
      const guildName = interaction.guild.name
      const adminroleid = interaction.options.getRole('admin')
      const adminrole = adminroleid.id
      if (!await Obj.findServer(guildId)) {
        await Obj.addServer(guildId, guildName, adminrole)
      } else {
        await Obj.updateServer(guildId, guildName, adminrole)
      }
      await interaction.reply('已更新伺服器設定')
    } else if (interaction.options.getSubcommand() === 'list') {
      if (isOwner) {
        const serverList = await Obj.listServer()
        const embed_o = new EmbedBuilder()
          .setColor('#FFFFFF')
          .setTitle('所有伺服器之管理員身分組')
          .setDescription(serverList)
        await interaction.reply({ embeds: [embed_o] })
      } else {
        const admin = Obj.findAdminRole(guildId)
        const embed = new EmbedBuilder()
          .setColor('#FFFFFF')
          .setTitle('本伺服器之管理員身分組')
          .setDescription(`\`${admin}\` ` + `<@&${admin}>`)
        await interaction.reply({ embeds: [embed] })
      }
    }
  },
}
