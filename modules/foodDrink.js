const { default: randomFn } = require("random");

const dinner = require('../data/dinner');
const drinks = require('../data/drinks');
const dict = require("../data/dictionary");

function pickFood(group) {
  switch (group) {
    case "good":
      return randomFn.choice(dinner.good);

    case "strange":
      return randomFn.choice(dinner.strange);

    default:
      return randomFn.choice(dinner);
  }
}
function pickDrinks(group) {
  switch (group) {
    case "good":
      return randomFn.choice(drinks.good);

    case "strange":
      return randomFn.choice(drinks.strange);

    default:
      return randomFn.choice(drinks);
  }
}
function pickFoodDrink(type, testMode, group) {
  switch (type) {
    case "food":
      if (testMode === 1) return "吃什麼自己想啦";
      if (testMode === 2) return "不要吃";
      if (testMode === 3) return "那個食物吧";
      return pickFood(group);

    case "drink":
      if (testMode === 1) return "喝什麼自己想啦";
      if (testMode === 2) return "不要喝";
      if (testMode === 3) return "那個飲料吧";
      return pickDrinks(group);
  }
}

// #region : 菜單機率
function getMenuStat() {
  const foodTotalCount = dinner.good.length + dinner.strange.length;
  const foodGoodProbi = (dinner.good.length * 100 / foodTotalCount).toFixed(2);
  const foodStrangeProbi = (dinner.strange.length * 100 / foodTotalCount).toFixed(2);

  const drinksTotalCount = drinks.good.length + drinks.strange.length;
  const drinksGoodProbi = (drinks.good.length * 100 / drinksTotalCount).toFixed(2);
  const drinksStrangeProbi = (drinks.strange.length * 100 / drinksTotalCount).toFixed(2);

  return [
    `:cooking:食物菜單裡有 **${foodTotalCount}** 項東西，其中：`,
    `- 正常的東西：有 **${dinner.good.length}** 項，抽到的機率約為 **${foodGoodProbi}%**`,
    `- 奇怪的東西：有 **${dinner.strange.length}** 項，抽到的機率約為 **${foodStrangeProbi}%**`,
    "",
    `:bubble_tea:飲料菜單裡有 **${drinksTotalCount}** 項東西，其中：`,
    `- 正常的東西：有 **${drinks.good.length}** 項，抽到的機率約為 **${drinksGoodProbi}%**`,
    `- 奇怪的東西：有 **${drinks.strange.length}** 項，抽到的機率約為 **${drinksStrangeProbi}%**`,
  ].join("\n");
}
//  #endregion

// #region : 吃什麼喝什麼

// 時間和類別
const mealMatch = [
  "早餐", "中餐", "午餐", "下午茶", "晚餐", "宵夜", "消夜",
  "早上", "朝早", "上午", "上晝", "中午", "晏晝", "下午", "下晝", "晚上", "夜晚",
  "今早", "今朝", "今晚",
  "明天", "聽日", "明早", "聽朝", "明晚", "聽晚",
  "待會", "陣間",
  "前菜", "主菜", "正餐", "甜品", "零食", "小吃",
  "聖誕", "聖誕節", "聖誕大餐", "拳擊日", "Boxing Day", "冬至", "除夕", "除夕夜", "除夕晚", "除夕晚上", "元旦", "過年", "新年", "正月",
  "清明", "清明節", "清明大餐", "餓鬼節", "復活節", "佛誕", "國慶", "重陽", "重陽節", "端午", "端午節", "中秋", "中秋節",
  "巴尼陣亡紀念日", "生日", "光棍節", "黑色星期五", "Black Friday", "網絡星期一", "Cyber Monday", "感恩節",
];
mealMatch.sort((a, b) => b.length - a.length);

// 觸發的文字
function isAskingMeal(msg) {
  const matchPatterns = [
    "吃什麼",
    "吃甚麼",
    "食咩",
    "食乜",
    "喝什麼",
    "喝甚麼",
    "飲咩",
    "飲乜",
    "來個套餐",
    "來份套餐",
    "要個套餐",
    "要份套餐",
    "來個正常套餐",
    "來份正常套餐",
    "要個正常套餐",
    "要份正常套餐",
    "來個奇怪套餐",
    "來份奇怪套餐",
    "要個奇怪套餐",
    "要份奇怪套餐",
  ];
  return matchPatterns.some(item => msg.includes(item));
}

// 抽
function eatDrinkWhat(msg, testMode) {
  const matchPatterns = [
    { key: `喝什麼正常的`, type: "drink", lang: "cn", group: "good" },
    { key: `喝甚麼正常的`, type: "drink", lang: "cn", group: "good" },
    { key: `喝什麼奇怪的`, type: "drink", lang: "cn", group: "strange" },
    { key: `喝甚麼奇怪的`, type: "drink", lang: "cn", group: "strange" },
    { key: `喝什麼`, type: "drink", lang: "cn" },
    { key: `喝甚麼`, type: "drink", lang: "cn" },
    { key: `飲咩正常野`, type: "drink", lang: "canto", group: "good" },
    { key: `飲乜正常野`, type: "drink", lang: "canto", group: "good" },
    { key: `飲咩奇怪野`, type: "drink", lang: "canto", group: "strange" },
    { key: `飲乜奇怪野`, type: "drink", lang: "canto", group: "strange" },
    { key: `飲咩`, type: "drink", lang: "canto" },
    { key: `飲乜`, type: "drink", lang: "canto" },
    { key: `來個正常套餐`, type: "setMeal", lang: "cn", group: "good" },
    { key: `來份正常套餐`, type: "setMeal", lang: "cn", group: "good" },
    { key: `要個正常套餐`, type: "setMeal", lang: "canto", group: "good" },
    { key: `要份正常套餐`, type: "setMeal", lang: "canto", group: "good" },
    { key: `來個奇怪套餐`, type: "setMeal", lang: "cn", group: "strange" },
    { key: `來份奇怪套餐`, type: "setMeal", lang: "cn", group: "strange" },
    { key: `要個奇怪套餐`, type: "setMeal", lang: "canto", group: "strange" },
    { key: `要份奇怪套餐`, type: "setMeal", lang: "canto", group: "strange" },
    { key: `來個套餐`, type: "setMeal", lang: "cn" },
    { key: `來份套餐`, type: "setMeal", lang: "cn" },
    { key: `要個套餐`, type: "setMeal", lang: "canto" },
    { key: `要份套餐`, type: "setMeal", lang: "canto" },
  ];

  const replyTemplate = new Map([
    ["drink", { cn: `就喝{drink}`, canto: `就飲{drink}` }],
    ["setMeal", {
      food: { cn: `那就吃{food}`, canto: `咁就食{food}` },
      drink: { cn: `飲料的話就要{drink}`, canto: `野飲就要{drink}` },
    }],
  ]);

  const meal = mealMatch.find(term => msg.includes(term));
  // console.debug(`🚀 ~ eatDrinkWhat ~ meal:`, meal);
  if (meal) {
    matchPatterns.push(
      { key: `${meal}吃什麼正常的`, type: "food", lang: "cn", group: "good" },
      { key: `${meal}吃甚麼正常的`, type: "food", lang: "cn", group: "good" },
      { key: `${meal}吃什麼奇怪的`, type: "food", lang: "cn", group: "strange" },
      { key: `${meal}吃甚麼奇怪的`, type: "food", lang: "cn", group: "strange" },
      { key: `${meal}吃什麼`, type: "food", lang: "cn" },
      { key: `${meal}吃甚麼`, type: "food", lang: "cn" },
      { key: `${meal}食咩正常野`, type: "food", lang: "canto", group: "good" },
      { key: `${meal}食乜正常野`, type: "food", lang: "canto", group: "good" },
      { key: `${meal}食咩奇怪野`, type: "food", lang: "canto", group: "strange" },
      { key: `${meal}食乜奇怪野`, type: "food", lang: "canto", group: "strange" },
      { key: `${meal}食咩`, type: "food", lang: "canto" },
      { key: `${meal}食乜`, type: "food", lang: "canto" },
    );
    replyTemplate.set("food", { cn: `${meal}就吃{food}`, canto: `${meal}就食{food}` });
  }

  const match = matchPatterns.find(({ key }) => msg.includes(key));
  // console.debug(`🚀 ~ eatDrinkWhat ~ match:`, match);

  if (!match) return null;

  try {
    let choice, reply;
    switch (match.type) {
      case "food":
      case "drink":
        choice = pickFoodDrink(match.type, testMode, match.group);
        reply = dict[match.type].get(choice)?.[match.lang] ?? replyTemplate.get(match.type)[match.lang];
        return reply
          .replace(`{meal}`, meal)
          .replace(`{${match.type}}`, choice);

      case "setMeal":
        choice = {
          food: pickFoodDrink("food", testMode, match.group),
          drink: pickFoodDrink("drink", testMode, match.group),
        };
        reply = {
          food: dict.setMeal.get(choice.food)?.[match.lang] ?? replyTemplate.get("setMeal")["food"][match.lang],
          drink: dict.setMeal.get(choice.drink)?.[match.lang] ?? replyTemplate.get("setMeal")["drink"][match.lang],
        };
        return Object.values(reply).join("\n")
          .replace(`{food}`, choice.food)
          .replace(`{drink}`, choice.drink);
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

// #endregion

// #region : 辨別菜單
function isCheckingMenu(msg) {
  return msg.startsWith("菜單有沒有");
}

function identifyItem(item) {
  // const output = {
  //   type: "food|drink",
  //   matchType: "exact|similar",
  //   matchedKey: "",
  //   menuType: "good|strange",
  // };
  // find for exact match
  if (dinner.good.includes(item)) {
    return {
      type: "food",
      matchType: "exact",
      matchedKey: item,
      menuType: "good",
    };
  } else if (dinner.strange.includes(item)) {
    return {
      type: "food",
      matchType: "exact",
      matchedKey: item,
      menuType: "strange",
    };
  } else if (drinks.good.includes(item)) {
    return {
      type: "drink",
      matchType: "exact",
      matchedKey: item,
      menuType: "good",
    };
  } else if (drinks.strange.includes(item)) {
    return {
      type: "drink",
      matchType: "exact",
      matchedKey: item,
      menuType: "strange",
    };
  }

  // find for similar match
  let matchedItem = dinner.good.find(menuItem => menuItem.includes(item));
  if (matchedItem) {
    return {
      type: "food",
      matchType: "similar",
      matchedKey: matchedItem,
      menuType: "good",
    };
  }
  matchedItem = dinner.strange.find(menuItem => menuItem.includes(item));
  if (matchedItem) {
    return {
      type: "food",
      matchType: "similar",
      matchedKey: matchedItem,
      menuType: "strange",
    };
  }
  matchedItem = drinks.good.find(menuItem => menuItem.includes(item));
  if (matchedItem) {
    return {
      type: "drink",
      matchType: "similar",
      matchedKey: matchedItem,
      menuType: "good",
    };
  }
  matchedItem = drinks.strange.find(menuItem => menuItem.includes(item));
  if (matchedItem) {
    return {
      type: "drink",
      matchType: "similar",
      matchedKey: matchedItem,
      menuType: "strange",
    };
  }

  return null;
}

function checkItem(item) {
  const res = identifyItem(item);
  if (res === null) return "沒有";

  const trans = new Map([
    ["food", "食物"],
    ["drink", "飲品"],
    ["good", "正常"],
    ["strange", "奇怪"],
  ]);

  if (res.matchType === "exact") {
    return `**「${item}」**有在 **${trans.get(res.type)}** 菜單裡，屬於 **${trans.get(res.menuType)}** 類別`;
  } else {
    return `**「${item}」**沒有在菜單裡。最相似的項目是 **${trans.get(res.type)}** 菜單裡的 **「${res.matchedKey}」**，屬於 **${trans.get(res.menuType)}** 類別`;
  }
}
//  #endregion

module.exports = {
  getMenuStat,
  pickFood,
  pickDrinks,
  pickFoodDrink,
  isAskingMeal,
  eatDrinkWhat,
  isCheckingMenu,
  identifyItem,
  checkItem,
};
