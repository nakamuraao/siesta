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
    } else if ((msg.content.includes('吃什麼') || msg.content.includes('食咩')) && await Obj_cre.findChannel(msg.channelId)) {
      const mealMatch = [
        "早餐", "中餐", "午餐", "下午茶", "晚餐", "宵夜",
        "早上", "朝早", "上午", "上晝", "中午", "晏晝", "下午", "下晝", "晚上", "夜晚",
        "今早", "今朝", "今晚",
        "明天", "聽日", "明早", "聽朝", "明晚", "聽晚",
        "待會", "陣間",
      ];
      for (let index = 0; index < mealMatch.length; index++) {
        if (msg.content.includes(`${mealMatch[index]}吃什麼`)) {
          const res = dinnerTonight();
          msg.reply(res === "不要吃" ? "不要吃" : res === "自己想啦" ? `${mealMatch[index]}吃什麼？自己想啦` : `${mealMatch[index]}就吃${res}`);
          break;
        } else if (msg.content.includes(`${mealMatch[index]}食咩`)) {
          const res = dinnerTonight();
          msg.reply(res === "不要吃" ? "唔好食" : res === "自己想啦" ? `${mealMatch[index]}食咩？咁大個人自己諗啦` : `${mealMatch[index]}就食${res}`);
          break;
        }
      }
    }
  }
};
