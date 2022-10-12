const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('listbot')
    .setDescription('列出伺服器中的機器人'),

  async execute(interaction) {
    let string = '';
    const allMembers = await interaction.guild.members.fetch();
    allMembers.forEach(member => {
      if (member.user.bot) {
        // console.log(member.id)
        string = string.concat('`' + member.id + '`' + ' ' + member.user.tag + '\n');
      }
    });

    const embed = new MessageEmbed().setTitle(`伺服器中的機器人`).setDescription(string).setColor('BLUE');
    await interaction.reply({ embeds:[embed] });
  }
};
