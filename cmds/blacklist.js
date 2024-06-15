const { SlashCommandBuilder } = require('discord.js');
const { isOwner, logTime } = require('../modules/utility');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('blacklist')
    .setDescription('將使用者從此機器人所有伺服器停權(擁有者限定)')
    .addStringOption(option =>
      option.setName('userid')
        .setDescription('使用者ID')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('原因')
        .setRequired(true)),

  async execute(interaction, client) {
    if (!isOwner(interaction.user.id)) {
      await interaction.reply({ content:'此指令僅限擁有者使用', ephemeral: true });
      return;
    }

    const userId = interaction.options.getString('userid');
    const reason = interaction.options.getString('reason');
    const Guilds = client.guilds.cache.map(guild => guild.id);

    for (i = 0; i < Guilds.length; i++) {
      const server = client.guilds.cache.get(Guilds[i]);
      server.bans.create(userId, { reason: reason }).catch((error) => interaction.channel.send(`無法將使用者自 ${server.name} 停權`));
    }

    await interaction.reply({ content:'已將成員從所有共同伺服器停權' });

    logTime();
    console.log(`-----------------------\nblacklisted ${userId}\n-----------------------`);
  }
};
