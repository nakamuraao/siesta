const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('inrole')
    .setDescription('查看身分組中的成員')
    .addRoleOption(option =>
      option.setName('role')
        .setDescription('目標身分組')
        .setRequired(true)),

  async execute(interaction) {
    const targetrole = interaction.options.getRole('role');
    let string = '';
    const allMembers = await interaction.guild.members.fetch();
    allMembers.forEach(member => {
      if (member.roles.cache.some(role => role.id === targetrole.id)) {
        string = string.concat('`' + member.id + '`' + ' ' + member.user.displayName + '\n');
      }
    });
    const embed = new EmbedBuilder().setTitle(`在 ${targetrole.name} 中的成員`).setDescription(string).setColor('#FFFFFF');
    await interaction.reply({ embeds:[embed] });
  }
};
