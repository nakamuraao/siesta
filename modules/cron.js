// const Discord = require("discord.js");
const { schedule } = require('node-cron');

class cronJob {
  constructor(client, channelId) {
    this.client = client;
    this.channelId = channelId;
  }

  setPlainMessage(period, message, channelId = this.channelId) {
    if (channelId === undefined) throw "Channel ID not provided";

    schedule(period, async () => {
      console.log(this.client.channels.cache.get(channelId));
      await this.client.channels.cache.get(channelId).send({ content: message });
    });
  }

  setEmbedMessage(period, embed_message, channelId = this.channelId) {
    if (channelId === undefined) throw "Channel ID not provided";

    schedule(period, async () => {
      await this.client.channels.cache.get(channelId).send({ embeds: embed_message });
    });
  }

  setFreeMessage(period, content, channelId = this.channelId) {
    if (channelId === undefined) throw "Channel ID not provided";

    schedule(period, async () => {
      await this.client.channels.cache.get(channelId).send(content);
    });
  }

  setRepeatAction(period, action) {
    schedule(period, () => {
      action();
    });
  }
}

// https://discord.js.org/#/docs/discord.js/v13/typedef/MessageOptions

module.exports = {
  "object": cronJob,
  "MINUTE": "* * * * *", // Every minute
  "HOUR": "0 * * * *", // Every hour
  "DAILY": "0 */24 * * *", // Daily at 00:00
  "MONTH": "0 0 1 * *", // First day of every month
};
// module.exports = async client => {
//   console.log("cron OK", new Date(), client.channels.cache.get("1029664008430682143"));
//   cron.schedule("*/1 * * * *", async () => {
//     console.log("cron job time", new Date(), client.channels);
//     await client.channels.cache.get("1029664008430682143").send("cron");
//   });
// };
