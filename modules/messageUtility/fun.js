const config = require('../../config.json');
const { omikuji, isOwner, dinnerTonight, pickDrinks, pickFoodDrink } = require('../utility');
const botzoneDB = require('../dbFunction/botChannel');
const Obj_cre = new botzoneDB.botzone;
const { default: randomFn } = require("random");

// #region : 吃什麼喝什麼

// 時間和類別
const mealMatch = [
  "早餐", "中餐", "午餐", "下午茶", "晚餐", "宵夜",
  "早上", "朝早", "上午", "上晝", "中午", "晏晝", "下午", "下晝", "晚上", "夜晚",
  "今早", "今朝", "今晚",
  "明天", "聽日", "明早", "聽朝", "明晚", "聽晚",
  "待會", "陣間",
  "前菜", "主菜", "正餐", "甜品", "零食", "小吃",
];

// 觸發的文字
function isAskingMeal(msg) {
  const matchPatterns = [
    "吃什麼",
    "食咩",
    "喝什麼",
    "飲咩",
    // "來份套餐",
    // "要個套餐",
  ];
  return matchPatterns.some(item => msg.includes(item));
}

// 選擇餐點
function eatDrinkWhat(msg) {
  const matchPatterns = [
    { key: `喝什麼`, type: "drink", lang: "cn", ans: "就喝{drink}" },
    { key: `飲咩`, type: "drink", lang: "canto", ans: "就飲{drink}" },
    // { key: `來份套餐`, type: "set", lang: "cn", ans: "那就吃{food}\n飲料的話就要{drink}" },
    // { key: `要個套餐`, type: "set", lang: "canto", ans: "咁就食{food}\n野飲就要{drink}" },
  ];

  const meal = mealMatch.find(term => msg.includes(term));
  if (meal) {
    matchPatterns.push(
      { key: `${meal}吃什麼`, type: "food", lang: "cn", ans: `${meal}就吃{food}` },
      { key: `${meal}食咩`, type: "food", lang: "canto", ans: `${meal}就食{food}` },
    );
  }

  const match = matchPatterns.find(({ key }) => msg.includes(key));

  if (!match) return null;

  const dict = require("../../data/dictionary");
  try {
    let choice, choiceProcessed;
    switch (match.type) {
      case "food":
      case "drink":
        choice = pickFoodDrink(match.type);
        choiceProcessed = dict[match.type].get(choice)?.[match.lang] ?? choice;
        return match.ans
          .replace(`{meal}`, meal)
          .replace(`{${match.type}}`, choiceProcessed);

      case "set":
        choice = {
          food: pickFoodDrink("food"),
          drink: pickFoodDrink("drink"),
        };
        choiceProcessed = {
          food: dict.food.get(choice.food)?.[match.lang] ?? choice.food,
          drink: dict.drink.get(choice.drink)?.[match.lang] ?? choice.drink,
        };
        return match.ans
          .replace(`{food}`, choiceProcessed.food)
          .replace(`{drink}`, choiceProcessed.drink);
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
//  #endregion

module.exports = {
  async execute(msg) {
    if (msg.content === "菜單機率" && await Obj_cre.findChannel(msg.channelId)) {
      const dinner = require("../../data/dinner");
      const foodTotalCount = dinner.good.length + dinner.strange.length;
      const foodGoodProbi = (dinner.good.length * 100 / foodTotalCount).toFixed(2);
      const foodStrangeProbi = (dinner.strange.length * 100 / foodTotalCount).toFixed(2);

      const drinks = require("../../data/drinks");
      const drinksTotalCount = drinks.good.length + drinks.strange.length;
      const drinksGoodProbi = (drinks.good.length * 100 / drinksTotalCount).toFixed(2);
      const drinksStrangeProbi = (drinks.strange.length * 100 / drinksTotalCount).toFixed(2);

      msg.reply([
        `:cooking:食物菜單裡有 **${foodTotalCount}** 項東西，其中：`,
        `- 正常的東西：有 **${dinner.good.length}** 項，抽到的機率約為 **${foodGoodProbi}%**`,
        `- 奇怪的東西：有 **${dinner.strange.length}** 項，抽到的機率約為 **${foodStrangeProbi}%**`,
        "",
        `:bubble_tea:飲料菜單裡有 **${drinksTotalCount}** 項東西，其中：`,
        `- 正常的東西：有 **${drinks.good.length}** 項，抽到的機率約為 **${drinksGoodProbi}%**`,
        `- 奇怪的東西：有 **${drinks.strange.length}** 項，抽到的機率約為 **${drinksStrangeProbi}%**`,
      ].join("\n"));
    } else if (msg.content.includes('機率') && (await Obj_cre.findChannel(msg.channelId) || isOwner(msg.author.id))) {
      const num = randomFn.int(0, 100);
      msg.channel.send(`${num}%`);
    } else if (msg.content.includes('抽籤') && await Obj_cre.findChannel(msg.channelId)) {
      omikuji(msg);
    } else if (msg.content === `<@${config.cid}>我婆` || msg.content === `<@!${config.cid}>我婆`) {
      msg.reply(isOwner(msg.author.id) ? '沒錯♥' : '婆你個大頭 醒');
    } else if (isAskingMeal(msg.content) && !msg.author.bot && await Obj_cre.findChannel(msg.channelId)) {
      const choice = eatDrinkWhat(msg.content);

      // Error Handle
      if (choice === false) {
        msg.reply("累了，你自己想吧");
        return;
      }

      if (choice !== null) msg.reply(choice);
    }
  }
};
