const { schedule } = require('node-cron');

// Cron小幫手
// https://crontab.guru/

class cronJob {
  constructor(client, channelId) {
    this.client = client;
    this.channelId = channelId;
  }

  // 輸送簡易訊息
  setPlainMessage(period, message, channelId = this.channelId) {
    if (channelId === undefined) {
      throw new Error('Channel ID not provided');
    }

    schedule(period, async () => {
      console.log(this.client.channels.cache.get(channelId));
      await this.client.channels.cache.get(channelId).send({ content: message });
    });
  }

  // 輸送嵌入式訊息
  setEmbedMessage(period, embed_message, channelId = this.channelId) {
    if (channelId === undefined) {
      throw new Error('Channel ID not provided');
    }

    schedule(period, async () => {
      await this.client.channels.cache.get(channelId).send({ embeds: embed_message });
    });
  }

  // 自由放入Message Object
  // https://discord.js.org/#/docs/discord.js/v13/typedef/MessageOptions
  setFreeMessage(period, content, channelId = this.channelId) {
    if (channelId === undefined) {
      throw new Error('Channel ID not provided');
    }

    schedule(period, async () => {
      await this.client.channels.cache.get(channelId).send(content);
    });
  }

  // 自訂行動
  setRepeatAction(period, action) {
    schedule(period, () => {
      action();
    });
  }
}

module.exports = {
  object: cronJob,
  MINUTE: '* * * * *', // Every minute
  HOUR: '0 * * * *', // Every hour
  DAILY: '0 */24 * * *', // Daily at 00:00
  MONTH: '0 0 1 * *', // First day of every month
};
