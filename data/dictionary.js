const food = new Map([
  ["不要吃", { cn: "不要吃", canto: "唔好食" }],
  ["自己想啦", { cn: "{meal}吃什麼？自己想啦", canto: "{meal}食咩？咁大個人自己諗啦" }],
]);

const drink = new Map([
  ["不要喝", { cn: "不要喝", canto: "唔好飲" }],
  ["自己想啦", { cn: "喝什麼？自己想啦", canto: "飲咩？咁大個人自己諗啦" }],
]);

// const set = new Map([
//   ["不要喝", { cn: "不要喝", canto: "唔好飲" }],
//   ["自己想啦", { cn: "自己想啦", canto: "自己諗啦" }],
// ]);

module.exports = {
  food,
  drink,
};
