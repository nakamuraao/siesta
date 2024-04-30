const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { oid } = require('./../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription('確認機器人的狀態'),
  async execute(interaction) {
    const botstatsembed = new MessageEmbed()
      .setColor('#68c3e7')
      .setThumbnail(`${interaction.client.user.avatarURL()}`)
      .setURL('https://github.com/nakamuraao/UID')
      .addFields(
        { name: '用戶名 :', value: `${interaction.client.user.tag}` },
        { name: `ID :`, value: `${interaction.client.user.id}` },
        { name: `建立時間 :`, value: `${interaction.client.user.createdAt.toLocaleDateString()} ${interaction.client.user.createdAt.toLocaleTimeString()}` },
        { name: `擁有者 :`, value: `蒼アオ<@${oid}>` },
        { name: '版本', value: 'v 2.4.4 (2024/4/30)' }
      );

    await interaction.reply({ embeds: [botstatsembed] });
  }
};
