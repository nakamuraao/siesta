const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { isAdmin, logTime } = require('../modules/utility');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('停權使用者')
    .addStringOption(option => option.setName('userid').setDescription('使用者ID').setRequired(true)),

  async execute(interaction) {
    if (!isAdmin(interaction)) {
      await interaction.reply({ content:'此指令僅限管理員使用', ephemeral: true });
      return;
    }

    const userId = interaction.options.getString('userid');
    interaction.guild.bans.create(userId);
    const embed = new MessageEmbed().setColor('GREY').setTitle('已停權使用者').addField('使用者ID', userId, false);
    await interaction.reply({ embeds:[embed] });

    logTime();
    console.log(`${interaction.user.tag} 將 ${userId} 自 ${interaction.guild.name} 停權\n-----------------------`);
  }
};
