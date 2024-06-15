const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverstats')
    .setDescription('伺服器基本資訊'),

  async execute(interaction) {
    const serverinfoembed = new EmbedBuilder()
      .setColor('#FFFFFF')
      .setTitle(`${interaction.guild.name} 伺服器資訊`)
      .setThumbnail(`${interaction.guild.iconURL()}`)
      // .setURL('YOUR_SERVER_INVITATION_GOES_HERE')
      .addFields(
        { name: '伺服器人數 :', value: `${interaction.guild.memberCount}` },
        { name: `伺服器建立時間 :`, value: interaction.guild.createdTimestamp / 1000 },
        { name: `伺服器擁有者 :`, value:`<@${interaction.guild.ownerId}>` }
      )
      .setFooter({ text:`伺服器ID : ${interaction.guild.id}` });

    await interaction.reply({ embeds: [serverinfoembed] });

  },
};
