const { isOwner } = require('../modules/utility');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('產生邀請連結(擁有者限定)')
    .addSubcommand(sub =>
      sub.setName('bot')
        .setDescription('機器人邀請連結'))
    .addSubcommand(sub =>
      sub.setName('server')
        .setDescription('伺服器邀請連結')
        .addStringOption(option =>
          option.setName('serverid')
            .setDescription('伺服器ID')
            .setRequired(true))),

  async execute(interaction, client) {
    if (!isOwner(interaction.user.id)) {
      await interaction.reply({ content:'此指令僅限擁有者使用', ephemeral: true });
      return;
    }

    if (interaction.options.getSubcommand() === 'bot') {
      const embed = new EmbedBuilder().setColor('#FFFFFF').setDescription('https://discordapp.com/api/oauth2/authorize?client_id=843890891704893530&permissions=8&scope=bot%20applications.commands');
      await interaction.reply({ embeds:[embed] });
    } else if (interaction.options.getSubcommand() === 'server') {
      const server_Id = interaction.options.getString('serverid');
      const server = client.guilds.cache.get(server_Id);
      await server.channels.cache
        .filter(channel => channel.type == 0)
        .first().createInvite({ maxAge: 43200, maxUses: 5 })
        .then(async invite => {
          const embed = new EmbedBuilder().setColor('#FFFFFF').setTitle('前往 ' + server.name).setDescription(invite.url);
          await interaction.reply({ embeds:[embed] });
        });

    }
  }
};
