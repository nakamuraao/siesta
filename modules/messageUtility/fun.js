const config = require('../../config.json');
const { omikuji, isOwner, flipCoin } = require('../utility');
const botzoneDB = require('../dbFunction/botChannel');
const Obj_cre = new botzoneDB.botzone;
const { default: randomFn } = require("random");
const { isAskingMeal, eatDrinkWhat, getMenuStat, isCheckingMenu, checkItem } = require("../foodDrink");

module.exports = {
  async execute(msg) {
    const isRightChannel = await Obj_cre.findChannel(msg.channelId);
    if (msg.content === "菜單機率" && (isRightChannel || isOwner(msg.author.id))) {
      msg.reply(getMenuStat());
    } else if (msg.content.includes('機率') && (isRightChannel || isOwner(msg.author.id))) {
      const num = randomFn.int(0, 100);
      msg.channel.send(`${num}%`);
    } else if (msg.content.includes('抽籤') && isRightChannel) {
      omikuji(msg);
    } else if (msg.content === `<@${config.cid}>我婆` || msg.content === `<@!${config.cid}>我婆`) {
      msg.reply(isOwner(msg.author.id) ? '沒錯♥' : '婆你個大頭 醒');
    } else if (["擲幣", "擲硬幣", "擲銀", "擲銀仔", "擲公字"].includes(msg.content) && isRightChannel) {
      msg.reply(flipCoin(msg.author));
    } else if (msg.content === "撒幣" && isRightChannel) {
      msg.reply(flipCoin(msg.author, true));
    } else if (isAskingMeal(msg.content) && !msg.author.bot && isRightChannel) {
      const choice = eatDrinkWhat(msg.content);

      // Error Handling
      if (choice === false) {
        msg.reply("累了，你自己想吧");
        return;
      }

      if (choice !== null) msg.reply(choice);
    } else if (isCheckingMenu(msg.content) && (isRightChannel || isOwner(msg.author.id))) {
      if (msg.content.trim() === "菜單有沒有") {
        msg.reply(randomFn.boolean() ? "有，有菜單" : "你要不要看看你到底在問什麼？");
        return;
      }
      const item = msg.content.replace("菜單有沒有", "").replace("?", "").replace("？", "").trim();
      msg.reply(checkItem(item));
    } else if (msg.content === "菜單測試" && isOwner(msg.author.id)) {
      const output = [
        eatDrinkWhat("早餐吃什麼"),
        eatDrinkWhat("早餐吃什麼", 1),
        eatDrinkWhat("早餐吃什麼", 2),
        eatDrinkWhat("早餐吃什麼", 3),
        "-----------------------------",
        eatDrinkWhat("喝什麼"),
        eatDrinkWhat("喝什麼", 1),
        eatDrinkWhat("喝什麼", 2),
        eatDrinkWhat("喝什麼", 3),
        "-----------------------------",
        eatDrinkWhat("來份套餐"),
        eatDrinkWhat("來份套餐", 1),
        eatDrinkWhat("來份套餐", 2),
        eatDrinkWhat("來份套餐", 3),
      ];
      console.debug(output);
      msg.reply(output.join("\n"));
    }
  }
};
