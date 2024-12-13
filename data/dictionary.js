const food = new Map([
  ["不要吃", { cn: "不要吃", canto: "唔好食" }],
  ["吃什麼自己想啦", { cn: "{meal}吃什麼？自己想啦", canto: "{meal}食咩？咁大個人自己諗啦" }],
  ["那個吧", { cn: "{meal}就吃那個吧", canto: "{meal}就食嗰樣啦" }],
]);

const drink = new Map([
  ["不要喝", { cn: "不要喝", canto: "唔好飲" }],
  ["喝什麼自己想啦", { cn: "喝什麼？自己想啦", canto: "飲咩？咁大個人自己諗啦" }],
  ["那個吧", { cn: "就喝那個吧", canto: "就飲嗰樣啦" }],
]);

const setMeal = new Map([
  ["不要吃", { cn: "不要吃", canto: "唔好食" }],
  ["不要喝", { cn: "不要喝", canto: "唔好飲" }],
  ["吃什麼自己想啦", { cn: "吃什麼就自己想啦", canto: "食咩就自己諗啦" }],
  ["喝什麼自己想啦", { cn: "喝什麼就自己想啦", canto: "飲咩就自己諗啦" }],
  ["那個吧", { cn: "那個吧", canto: "嗰樣啦" }],
]);

module.exports = {
  food,
  drink,
  setMeal,
};
