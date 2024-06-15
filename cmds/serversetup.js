const { SlashCommandBuilder } = require('@discordjs/builders');
const database = require('../modules/dbFunction/database');
const { isAdmin, logTime } = require('../modules/utility');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serversetup')
    .setDescription('設定伺服器資訊')
    .addRoleOption(option => option.setName('admin').setDescription('管理員身分組').setRequired(false)), /* .addRoleOption(option => option.setName('muterole').setDescription('禁言身分組').setRequired(true))*/
  async execute(interaction) {
    if (!isAdmin(interaction)) {
      interaction.reply({ content:'此指令僅限管理員使用', ephemeral: true });
      return;
    }

    const guildId = interaction.guild.id;
    const guildName = interaction.guild.name;
    // const muteroleid = interaction.options.getRole('muterole')
    const adminroleid = interaction.options.getRole('admin');
    const guildMembers = interaction.guild.memberCount;

    // const muterole = muteroleid.id
    const adminrole = adminroleid.id;
    const Obj = new database.ServerDB(guildId);
    if (!await Obj.findServer(guildId)) {
      await Obj.addServer(guildId, guildName, guildMembers, adminrole);
    } else {
      await Obj.updateServer(guildId, guildName, guildMembers, adminrole);
    }

    await interaction.reply('已更新伺服器設定');
    logTime();
    console.log(`-----------------------\n${interaction.user.displayName} 更新了 ${interaction.guild.name} 的設定\n-----------------------`);
  }
};
