const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { oid } = require('./../config.json');
const { version } = require('../package.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription('確認機器人的狀態'),
  async execute(interaction) {
    const botstatsembed = new EmbedBuilder()
      .setColor('#FFFFFF')
      .setThumbnail(`${interaction.client.user.avatarURL()}`)
      .addFields(
        { name: '用戶名 :', value: `${interaction.client.user.displayName}` },
        { name: `ID :`, value: `${interaction.client.user.id}` },
        { name: `建立時間 :`, value: `<t:${parseInt(interaction.client.user.createdTimestamp / 1000)}>` },
        { name: `擁有者 :`, value: `蒼アオ <@${oid}>` },
        { name: '版本', value: version }
      );

    await interaction.reply({ embeds: [botstatsembed] });
  }
};
