const { SlashCommandBuilder } = require('discord.js');
const { isOwner } = require('../modules/utility');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('洗版指令(擁有者限定)')
    .addStringOption(option => option.setName('message').setDescription('message').setRequired(true))
    .addIntegerOption(option => option.setName('times').setDescription('times').setRequired(false)),

  async execute(interaction) {
    if (isOwner(interaction.user.id)) {
      const message = interaction.options.getString('message');
      const times = interaction.options.getInteger('times');
      if (times == null) {
        await interaction.reply({ content:'`' + message + '`', ephemeral:true });
        await interaction.channel.send(message);
      } else {
        await interaction.reply({ content:'重複' + '`' + message + '`' + times + '次', ephemeral:true });
        for (let i = 0; i < times; i++) {
          await interaction.channel.send(message);
        }
      }

    } else {
      await interaction.reply({ content:'此指令僅限擁有者使用', ephemeral: true });
    }
  }
};
