const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverstats')
    .setDescription('伺服器基本資訊'),

  async execute(interaction) {
    const serverinfoembed = new EmbedBuilder()
      .setColor('#FFFFFF')
      .setTitle(`${await (interaction.guild).name} 伺服器資訊`)
      .setThumbnail(`${await (interaction.guild).iconURL()}`)
      .addFields(
        { name: '伺服器人數 :', value: `${await (interaction.guild).memberCount}` },
        { name: `伺服器建立時間 :`, value: `<t:${Number.parseInt(await (interaction.guild).createdTimestamp / 1000)}>` },
        { name: `伺服器擁有者 :`, value: `<@${await (interaction.guild).ownerId}>` },
      )
      .setFooter({ text: `伺服器ID : ${await (interaction.guild).id}` });

    await interaction.reply({ embeds: [serverinfoembed] });
  },
};
