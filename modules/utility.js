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
  logTime,
};
