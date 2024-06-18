const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('個人資訊')
    .addUserOption(option => option.setName('user').setDescription('目標使用者').setRequired(true)),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const user_cache = interaction.guild.members.cache.get(user.id);
    const joinTime = user_cache.joinedTimestamp;
    const userinfoembed = new EmbedBuilder()
      .setColor('#FFFFFF')
      .setThumbnail(`${user.avatarURL()}`)
      .setDescription(`<@${user.id}>`)
      .addFields(
        { name: '用戶名 :', value: `${user.displayName}` },
        { name: `UID :`, value: `${user.id}` },
        { name: `加入DC時間 :`, value: `<t:${parseInt(user.createdTimestamp / 1000)}>` },
        { name: `加入伺服器時間 :`, value: `<t:${parseInt(joinTime / 1000)}>` },
      );
    await interaction.reply({ embeds: [userinfoembed] });

  } };
