const config = require('../config.json');
const { default: randomFn } = require("random");
const { EmbedBuilder } = require('discord.js');
const dinner = require('../data/dinner');
const drinks = require('../data/drinks');

function isAdmin(interaction) {
  return interaction.memberPermissions.has('ADMINISTRATOR', true) || interaction.user.id === config.oid;
}

function isOwner(id) {
  return id === config.oid;
}

function omikuji(msg) {
  const random = randomFn.int(0, 14);
  const author = msg.author.displayName;
  const result = {
    daikichi: {
      color: '#c8a9d6',
      image: 'https://media.discordapp.net/attachments/867034103097196544/928972567111401482/omikuji_daikichi.png'
    },
    syoukichi: {
      color: '#c8a9d6',
      image: 'https://media.discordapp.net/attachments/867034103097196544/928972567560216576/omikuji_syoukichi.png'
    },
    kichi: {
      color: '#c8a9d6',
      image: 'https://media.discordapp.net/attachments/867034103097196544/928972567967068200/omikuji_kichi.png'
    },
    suekichi: {
      color: '#c8a9d6',
      image: 'https://media.discordapp.net/attachments/867034103097196544/928972569137270794/omikuji_suekichi.png'
    },
    chuukichii: {
      color: '#c8a9d6',
      image: 'https://media.discordapp.net/attachments/867034103097196544/928972568684298290/omikuji_chuukichi.png'
    },
    kyou: {
      color: '#c8a9d6',
      image: 'https://media.discordapp.net/attachments/867034103097196544/928972568357122108/omikuji_kyou.png'
    },
    daikyou: {
      color: '#c8a9d6',
      image: 'https://media.discordapp.net/attachments/867034103097196544/928972569556680755/omikuji_daikyou.png'
    },
  };

  switch (random) {
    case 0:
    case 1:
    case 2:
      msg.channel.send({ embeds: getFormatOmikujiResult(result.daikichi, author) });
      break;
    case 3:
    case 4:
      msg.channel.send({ embeds: getFormatOmikujiResult(result.syoukichi, author) });
      break;
    case 5:
    case 6:
    case 7:
      msg.channel.send({ embeds: getFormatOmikujiResult(result.kichi, author) });
      break;
    case 8:
    case 9:
      msg.channel.send({ embeds: getFormatOmikujiResult(result.suekichi, author) });
      break;
    case 10:
    case 11:
      msg.channel.send({ embeds: getFormatOmikujiResult(result.chuukichii, author) });
      break;
    case 12:
    case 13:
      msg.channel.send({ embeds: getFormatOmikujiResult(result.kyou, author) });
      break;
    case 14:
      msg.channel.send({ embeds: getFormatOmikujiResult(result.daikyou, author) });
      break;
  }
}

const getFormatOmikujiResult = (result, author) => {
  return [new EmbedBuilder()
    .setColor(result.color)
    .setTitle(`**${author} 的抽籤結果**`)
    .setImage(result.image)];
};

function flipCoin(msg) {
  let resultImage = "";
  let resultTxt = "";
  const author = msg.author.displayName;
  if (randomFn.int(0, 100) === 50) {
    resultTxt = "硬幣立起來了！";
    resultImage = "https://cdn.discordapp.com/attachments/966618791276605470/1329104198662619166/coin-side.png";
  } else if (randomFn.boolean()) {
    resultTxt = "正面";
    resultImage = "https://cdn.discordapp.com/attachments/966618791276605470/1329104198931058748/coin-upside.png";
  } else {
    resultTxt = "反面";
    resultImage = "https://cdn.discordapp.com/attachments/966618791276605470/1329104199195168921/coin-downside.png";
  }

  const embedMessage = new EmbedBuilder()
    .setColor('#a5a9b4')
    .setTitle(`${author} 的擲硬幣結果`)
    .setDescription(resultTxt)
    .setThumbnail(resultImage);

  msg.reply({ embeds: [embedMessage] });
}

function helpMe() {
  const embedMessage = {
    color: 0xffffff,
    author: {
      name: "阿喔A夢",
    },
    title: "好的好的",
    description: "現在可用的功能",
    thumbnail: { url: "https://cdn.discordapp.com/attachments/966618791276605470/1329445510485905522/image.png" },
    fields: [
      { name: "", value: "" },
      {
        name: "# 指令",
        value: [
          "**菜單類：**",
          "- 菜單機率",
          "- 菜單有沒有{食物或飲料}",
          "---",
          "- {時間}吃什麼(正常的｜奇怪的)",
          "- {時間}吃甚麼(正常的｜奇怪的)",
          "- {時間}食咩(正常野｜奇怪野)",
          "- {時間}食乜(正常野｜奇怪野)",
          "---",
          "- 喝什麼(正常的｜奇怪的)",
          "- 喝甚麼(正常的｜奇怪的)",
          "- 飲咩(正常野｜奇怪野)",
          "- 飲乜(正常野｜奇怪野)",
          "---",
          "- 來個(正常｜奇怪)套餐",
          "- 來份(正常｜奇怪)套餐",
          "- 要個(正常｜奇怪)套餐",
          "- 要份(正常｜奇怪)套餐",
          "",
          "**其他：**",
          "- 擲幣",
          "- 抽籤",
          "- 阿喔A夢幫幫我",
          "====================",
        ].join("\n"),
      },
      {
        name: "# 有效的「吃什麼」時間",
        value: [
          "**時間類：**",
          [
            "早上", "朝早", "上午", "上晝", "中午", "晏晝", "下午", "下晝", "晚上", "夜晚",
            "今早", "今朝", "今晚",
            "明天", "聽日", "明早", "聽朝", "明晚", "聽晚",
            "待會", "陣間",
          ].join("、"),
          "",
          "**用餐時間類：**",
          [
            "早餐", "中餐", "午餐", "下午茶", "晚餐", "宵夜", "消夜",
            "前菜", "主菜", "正餐", "甜品", "零食", "小吃"
          ].join("、"),
          "",
          "**節日類：**",
          [
            "聖誕", "聖誕節", "聖誕大餐", "拳擊日", "Boxing Day", "冬至", "除夕", "除夕夜", "除夕晚", "除夕晚上", "元旦", "過年", "新年", "正月",
            "清明", "清明節", "清明大餐", "餓鬼節", "復活節", "佛誕", "國慶", "重陽", "重陽節", "端午", "端午節", "中秋", "中秋節",
          ].join("、"),
          "",
          "**特殊類：**",
          ["巴尼陣亡紀念日", "生日", "光棍節", "黑色星期五", "Black Friday", "網絡星期一", "Cyber Monday", "感恩節"].join("、"),
        ].join("\n"),
      }
    ]
  };

  return { embeds: [embedMessage] };
}

function logTime() {
  const now = new Date();
  const time = now.toTimeString();
  console.log(time);
}

module.exports = {
  isAdmin,
  isOwner,
  omikuji,
  flipCoin,
  helpMe,
  logTime,
};
