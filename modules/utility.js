const config = require('../config.json');
const { EmbedBuilder } = require('discord.js');
const dinner = require('../dinner.json');

function isAdmin(interaction) {
  if (interaction.memberPermissions.has('ADMINISTRATOR', true) || interaction.user.id === config.oid) {
    return true;
  }

}

function isOwner(id) {
  if (id === config.oid) {
    return true;
  }
}

function omikuji(msg) {
  const random = randomNumber(0, 14);
  const author = msg.author.tag;
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

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function logTime() {
  const now = new Date();
  const time = now.toTimeString();
  console.log(time);
}

function dinnerTonight() {
  const random = Math.floor(Math.random() * (dinner.dinner.length - 1));
  return dinner.dinner[random];
}

module.exports.isAdmin = isAdmin;
module.exports.isOwner = isOwner;
module.exports.omikuji = omikuji;
module.exports.randomNumber = randomNumber;
module.exports.logTime = logTime;
module.exports.dinnerTonight = dinnerTonight;
