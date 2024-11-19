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
    } else if (msg.content === `<@${config.cid}>我婆` || msg.content === `<@!${config.cid}>我婆`) {
      msg.reply(isOwner(msg.author.id) ? '沒錯♥' : '婆你個大頭 醒');
    } else if (msg.content.includes('吃什麼') && await Obj_cre.findChannel(msg.channelId)) {
      const mealMatch = [
        "早餐", "午餐", "晚餐", "宵夜",
        "早上", "上午", "中午", "下午", "晚上",
        "今晚",
        "明早", "明天", "明晚",
        "待會",
      ];
      for (let index = 0; index < mealMatch.length; index++) {
        const matchText = `${mealMatch[index]}吃什麼`;
        if (msg.content.includes(matchText)) {
          const res = dinnerTonight();
          msg.reply(res === "不要吃" ? `不要吃晚餐` : `${mealMatch[index]}就吃${res}`);
          break;
        }
      }
    }
  }
};
