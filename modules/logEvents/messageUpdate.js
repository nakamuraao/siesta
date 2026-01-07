const logging = require('../dbFunction/log');

const Obj = new logging.log();
const { EmbedBuilder } = require('discord.js');

module.exports = {
  async execute(oldMessage, newMessage, client) {
    const logChannel = client.channels.cache.get(await Obj.logChannelId(oldMessage.guildId));
    if (await Obj.findLogChannel(oldMessage.guildId)) {
      const embed = new EmbedBuilder().setColor('#68c3e7').setTitle(`訊息編輯 #${oldMessage.channel.name}`).setDescription(`${oldMessage.author.displayName}<@${oldMessage.author.id}>`);
      if (oldMessage.content) {
        embed.addFields({ name: '舊訊息', value: `${oldMessage.content}`, inline: false }, { name: '新訊息', value: `${newMessage.content}`, inline: false });
      } else {
        embed.addFields({ name: '舊訊息', value: '`' + 'nothing' + '`', inline: false }, { name: '新訊息', value: `${newMessage.content}`, inline: false });
      }
      await logChannel.send({ embeds: [embed] });
    }
  },
};
