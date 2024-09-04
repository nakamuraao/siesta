const config = require('../../config.json');
const { omikuji, randomNumber, isOwner, dinnerTonight } = require('../utility');
const botzoneDB = require('../dbFunction/botChannel');
const Obj_cre = new botzoneDB.botzone;

module.exports = {
  async execute(msg) {
    if (msg.content.includes('機率') && (await Obj_cre.findChannel(msg.channelId) || isOwner(msg.author.id))) {
      const num = randomNumber(0, 100);
      msg.channel.send(`${num}%`);
    } else if (msg.content.includes('抽籤') && await Obj_cre.findChannel(msg.channelId)) {
      omikuji(msg);
    } else if (msg.content.includes('晚餐吃什麼') && await Obj_cre.findChannel(msg.channelId)) {
      const res = dinnerTonight();
      msg.reply(res === "不要吃" ? `今天不要吃晚餐` : `今天晚餐吃 ${res}`);
    } else if (msg.content === `<@${config.cid}>我婆` || msg.content === `<@!${config.cid}>我婆`) {
      if (isOwner(msg.author.id)) {
        msg.reply('沒錯♥');
      } else {
        msg.reply('婆你個大頭 醒');
      }
    }
  }
};
