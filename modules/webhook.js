const { WebhookClient } = require('discord.js');
const webhooks = require('../webhook.json');

module.exports = {
  async execute(msg) {
    // normal
    if (msg.channelId === webhooks.mikeneko.normalChannel) {
      const webhook = new WebhookClient({ url: webhooks.mikeneko.normal });
      if (msg.content.startsWith('補') || msg.content.startsWith('—') || msg.content.startsWith('-') || msg.content.startsWith('–')) {
        webhook.send({
          content: `${msg.content}`,
          username: `${msg.author.tag}`,
          avatarURL: `${msg.author.avatarURL()}`,
        });
      } else {
        webhook.send({
          content: ` : ${msg.content}`,
          username: `${msg.author.tag}`,
          avatarURL: `${msg.author.avatarURL()}`,
        });
      }
    }

    // tc
    if (msg.channelId === webhooks.mikeneko.tcChannel) {
      const webhook = new WebhookClient({ url: webhooks.mikeneko.tcMember });
      if (msg.content.startsWith('補') || msg.content.startsWith('—') || msg.content.startsWith('-') || msg.content.startsWith('–')) {
        webhook.send({
          content: `${msg.content}`,
          username: `${msg.author.tag}`,
          avatarURL: `${msg.author.avatarURL()}`,
        });
      } else {
        webhook.send({
          content: ` : ${msg.content}`,
          username: `${msg.author.tag}`,
          avatarURL: `${msg.author.avatarURL()}`,
        });
      }
    }

    // yt
    if (msg.channelId === webhooks.mikeneko.ytChannel) {
      const webhook = new WebhookClient({ url: webhooks.mikeneko.ytMember });
      if (msg.content.startsWith('補') || msg.content.startsWith('—') || msg.content.startsWith('-') || msg.content.startsWith('–')) {
        webhook.send({
          content: `${msg.content}`,
          username: `${msg.author.tag}`,
          avatarURL: `${msg.author.avatarURL()}`,
        });
      } else {
        webhook.send({
          content: ` : ${msg.content}`,
          username: `${msg.author.tag}`,
          avatarURL: `${msg.author.avatarURL()}`,
        });
      }
    }
    // 檢舉區
    if (msg.channelId === webhooks.mikeneko.reportChannel) {
      msg.author.send('已收到你的檢舉，管理員會盡速處理').catch((error) => {
        console.log(error);
      });
      const webhook = new WebhookClient({ url: webhooks.mikeneko.report });
      webhook.send({
        content: `${msg.content}`,
        username: `${msg.author.tag}`,
        avatarURL: `${msg.author.avatarURL()}`,
      });

      if (msg.attachments.size > 0) {
        msg.attachments.forEach((a) => {
          const url = a.url;
          webhook.send({
            content: `${url}`,
            username: `${msg.author.tag}`,
            avatarURL: `${msg.author.avatarURL()}`,
          });
        });
      }
    }

    // amemiya
    if (msg.channelId === webhooks.mikeneko.amemiyaChannel) {
      const webhook = new WebhookClient({ url: webhooks.mikeneko.amemiya });
      if (msg.content.startsWith('補') || msg.content.startsWith('—') || msg.content.startsWith('-') || msg.content.startsWith('–')) {
        webhook.send({
          content: `${msg.content}`,
          username: `${msg.author.tag}`,
          avatarURL: `${msg.author.avatarURL()}`,
        });
      } else {
        webhook.send({
          content: ` : ${msg.content}`,
          username: `${msg.author.tag}`,
          avatarURL: `${msg.author.avatarURL()}`,
        });
      }
    }

    // yoru normal
    if (msg.channelId === webhooks.yoru.normalChannel) {
      const webhook = new WebhookClient({ url: webhooks.yoru.normal });
      if (msg.content.startsWith('補') || msg.content.startsWith('—') || msg.content.startsWith('-') || msg.content.startsWith('–')) {
        webhook.send({
          content: `${msg.content}`,
          username: `${msg.author.tag}`,
          avatarURL: `${msg.author.avatarURL()}`,
        });
      } else {
        webhook.send({
          content: ` : ${msg.content}`,
          username: `${msg.author.tag}`,
          avatarURL: `${msg.author.avatarURL()}`,
        });
      }
    }

    // yoru report
    if (msg.channelId === webhooks.yoru.reportChannel) {
      msg.author.send('已收到你的檢舉，管理員會盡速處理').catch((error) => {
        console.log(error);
      });
      const webhook = new WebhookClient({ url: webhooks.yoru.report });
      webhook.send({
        content: `${msg.content}`,
        username: `${msg.author.tag}`,
        avatarURL: `${msg.author.avatarURL()}`,
      });

      if (msg.attachments.size > 0) {
        msg.attachments.forEach((a) => {
          const url = a.url;
          webhook.send({
            content: `${url}`,
            username: `${msg.author.tag}`,
            avatarURL: `${msg.author.avatarURL()}`,
          });
        });
      }
    }
  },
};
