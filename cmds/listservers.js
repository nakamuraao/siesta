const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { isOwner } = require('../modules/utility');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('listservers')
    .setDescription('列出機器人所在伺服器(擁有者限定)'),

  async execute(interaction, client) {
    if (!isOwner(interaction.user.id)) {
      await interaction.reply({ content:'此指令僅限擁有者使用', ephemeral: true });
      return;
    }
    const guildId = client.guilds.cache.map(guild => guild.id);
    const guildName = client.guilds.cache.map(guild => guild.name);
    const embed = new MessageEmbed().setColor('GREY').setTitle('所在伺服器');
    for (i = 0; i < guildId.length; i++) {
      embed.addField(guildName[i], guildId[i]);
    }
    await interaction.reply({ embeds:[embed] });
  }
};
