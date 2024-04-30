const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const characters = require('../characters.json');
const { isOwner } = require('../modules/utility');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('characters')
    .setDescription('切換人設(擁有者限定)')
    .addSubcommand(sub => sub.setName('list').setDescription('列出可用人設'))
    .addSubcommand(sub => sub.setName('set').setDescription('設定人設').addNumberOption(option => option.setName('character').setDescription('人設編號').setRequired(true))),

  async execute(interaction, client) {
    if (!isOwner(interaction.user.id)) {
      await interaction.reply({ content:'此指令僅限擁有者使用', ephemeral: true });
      return;
    }

    if (interaction.options.getSubcommand() === 'list') {
      const embed = new MessageEmbed().setTitle('可用人設').setColor('#c8a9d6');
      let string = '';

      for (let i = 0; i < (characters.list.length); i++) {
        string = string.concat(`${i+1}. ${characters.list[i]}\n`);
      }
      embed.setDescription(string);
      await interaction.reply({ embeds:[embed] });

    } else if (interaction.options.getSubcommand() === 'set') {
      const num = interaction.options.getNumber('character');
      try {
        client.user.setUsername(characters.characters[num].name);
        client.user.setAvatar(characters.characters[num].icon);
        await interaction.reply('已變更人設');
      } catch (error) {
        await interaction.reply('數值錯誤');
      }
    }

  }
};
