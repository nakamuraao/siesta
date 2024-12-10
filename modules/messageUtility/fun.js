const config = require('../../config.json');
const { omikuji, isOwner, dinnerTonight, pickDrinks } = require('../utility');
const botzoneDB = require('../dbFunction/botChannel');
const Obj_cre = new botzoneDB.botzone;
const { default: randomFn } = require("random");

module.exports = {
  async execute(msg) {
    if (msg.content === "菜單機率" && await Obj_cre.findChannel(msg.channelId)) {
      const dinner = require("../../data/dinner");
      const foodTotalCount = dinner.good.length + dinner.strange.length;
      const foodGoodProbi = (dinner.good.length * 100 / foodTotalCount).toFixed(2);
      const foodStrangProbi = (dinner.strange.length * 100 / foodTotalCount).toFixed(2);

      const drinks = require("../../data/drinks");
      const drinksTotalCount = drinks.good.length + drinks.strange.length;
      const drinksGoodProbi = (drinks.good.length * 100 / drinksTotalCount).toFixed(2);
      const drinksStrangProbi = (drinks.strange.length * 100 / drinksTotalCount).toFixed(2);

      msg.reply([
        `:cooking:食物菜單裡有 **${foodTotalCount}** 項東西，其中：`,
        `- 正常的東西：有 **${dinner.good.length}** 項，抽到的機率約為 **${foodGoodProbi}%**`,
        `- 奇怪的東西：有 **${dinner.strange.length}** 項，抽到的機率約為 **${foodStrangProbi}%**`,
        "",
        `:bubble_tea:飲料菜單裡有 **${drinksTotalCount}** 項東西，其中：`,
        `- 正常的東西：有 **${drinks.good.length}** 項，抽到的機率約為 **${drinksGoodProbi}%**`,
        `- 奇怪的東西：有 **${drinks.strange.length}** 項，抽到的機率約為 **${drinksStrangProbi}%**`,
      ].join("\n"));
    } else if (msg.content.includes('機率') && (await Obj_cre.findChannel(msg.channelId) || isOwner(msg.author.id))) {
      const num = randomFn.int(0, 100);
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
    } else if ((msg.content.includes('喝什麼') || msg.content.includes('飲咩')) && await Obj_cre.findChannel(msg.channelId)) {
      const drink = pickDrinks();
      if (msg.content.includes("喝什麼")) {
        msg.reply(drink === "不要喝" ? "不要喝" : drink === "自己想啦" ? "喝什麼？自己想啦" : `就喝${drink}`);
      } else if (msg.content.includes("飲咩")) {
        msg.reply(drink === "不要喝" ? "唔好飲" : drink === "自己想啦" ? "飲咩？咁大個人自己諗啦" : `就飲${drink}`);
      }
    }
  }
};
