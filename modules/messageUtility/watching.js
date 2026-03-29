const { EmbedBuilder } = require('discord.js');
const config = require('../../config.json');

module.exports = {
  async execute(msg, client) {
    if (msg.channel.type === 'DM') {
      if (msg.author.id === config.oid) {
        return;
      }
      const embed1 = new EmbedBuilder()
        .setColor('#FFFFFF')
        .setTitle(`來自 ${msg.author.displayName} (${msg.author.id})的訊息`)
        .setDescription(`<@${msg.author.id}>\n${msg.content}`)
        .setFooter({ text: `來信時間 : <t:${msg.createdTimestamp}>` });
      client.users.fetch(config.oid).then(owner =>
        owner.send({ embeds: [embed1] }));
    } else if (msg.content.includes('蒼')) {
      if (msg.author.id === config.oid) {
        return;
      }
      for (let i = 0; i < config.ignore.length; i++) {
        if (msg.content.includes(config.ignore[i])) {
          return;
        }
      }
      const embed = new EmbedBuilder()
        .setColor('#68c3e7')
        .setTitle(`${msg.author.displayName}(${msg.author.id}) 在 #${msg.channel.name} 提及了蒼`)
        .setDescription(`<#${msg.channelId}> <@${msg.author.id}>\n${msg.content}`);
      client.users.fetch(config.oid).then(owner =>
        owner.send({ embeds: [embed] }));
    }
  },
};
