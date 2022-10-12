const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('findurl')
    .setDescription('產生附件連結')
    .addAttachmentOption(option => option.setName('attatchment').setDescription('attatchment').setRequired(true)),

  async execute(interaction) {
    const embed = new MessageEmbed().setColor('BLUE').setTitle('附件連結');
    const attatchment = interaction.options.getAttachment('attatchment');
    embed.setDescription(attatchment.url);
    await interaction.reply({ embeds:[embed] });
  }

};
