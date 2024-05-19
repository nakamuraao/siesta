const logging = require('../dbFunction/log');
const Obj_del = new logging.log;
const axios = require('axios');
const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
  async execute(msg, client){
      if (msg.attachments.size > 0) {
        if (await Obj_del.findLogChannel(msg.guildId)) {
            const embed = new MessageEmbed().setColor('GREEN').setTitle(`附件刪除 #${msg.channel.name}`).setDescription(msg.author.tag);
            if (msg.content) {
            embed.addFields({name: '訊息內容', value: `${msg.content}`, inline: false});
            }
            const logChannel = client.channels.cache.get(await Obj_del.logChannelId(msg.guildId));
        
            msg.attachments.forEach(async a => {
            const url = a.url;
            const response = await axios.get(url, { responseType: "arraybuffer" });
            const buff = Buffer.from(response.data, "base64");
            const file = new MessageAttachment(buff, a.name );
            logChannel.send({ files: [file] });
            });
            await logChannel.send({ embeds:[embed] });
            } else { return; };
        } else {
            if (await Obj_del.findLogChannel(msg.guildId)) {
                const embed = new MessageEmbed().setColor('GREEN').setTitle(`訊息刪除 #${msg.channel.name}`).setDescription(msg.author.tag);
                if (msg.content) {
                    embed.addFields({name: '訊息內容', value: `${msg.content}`, inline: false});
                }
                const logChannel = client.channels.cache.get(await Obj_del.logChannelId(msg.guildId));
                await logChannel.send({ embeds:[embed] });
            } else { return; };
        }
    }
}