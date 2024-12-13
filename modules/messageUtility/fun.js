const config = require('../../config.json');
const { omikuji, isOwner } = require('../utility');
const botzoneDB = require('../dbFunction/botChannel');
const Obj_cre = new botzoneDB.botzone;
const { default: randomFn } = require("random");
const { isAskingMeal, eatDrinkWhat, getMenuStat } = require("../foodDrink");

module.exports = {
  async execute(msg) {
    if (msg.content === "菜單機率" && await Obj_cre.findChannel(msg.channelId)) {
      msg.reply(getMenuStat());
    } else if (msg.content.includes('機率') && (await Obj_cre.findChannel(msg.channelId) || isOwner(msg.author.id))) {
      const num = randomFn.int(0, 100);
      msg.channel.send(`${num}%`);
    } else if (msg.content.includes('抽籤') && await Obj_cre.findChannel(msg.channelId)) {
      omikuji(msg);
    } else if (msg.content === `<@${config.cid}>我婆` || msg.content === `<@!${config.cid}>我婆`) {
      msg.reply(isOwner(msg.author.id) ? '沒錯♥' : '婆你個大頭 醒');
    } else if (isAskingMeal(msg.content) && !msg.author.bot && await Obj_cre.findChannel(msg.channelId)) {
      const choice = eatDrinkWhat(msg.content);

      // Error Handling
      if (choice === false) {
        msg.reply("累了，你自己想吧");
        return;
      }

      if (choice !== null) msg.reply(choice);
    } else if (msg.content === "菜單測試" && isOwner(msg.author.id)) {
      const output = [
        eatDrinkWhat("早餐吃什麼"),
        eatDrinkWhat("早餐吃什麼", 1),
        eatDrinkWhat("早餐吃什麼", 2),
        "-----------------------------",
        eatDrinkWhat("喝什麼"),
        eatDrinkWhat("喝什麼", 1),
        eatDrinkWhat("喝什麼", 2),
        "-----------------------------",
        eatDrinkWhat("來份套餐"),
        eatDrinkWhat("來份套餐", 1),
        eatDrinkWhat("來份套餐", 2),
      ];
      console.debug(output);
      msg.reply(output.join("\n"));
    }
  }
};
