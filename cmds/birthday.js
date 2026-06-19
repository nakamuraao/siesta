const path = require('node:path');
const Canvas = require('@napi-rs/canvas');
const { SlashCommandBuilder, MessageFlags, AttachmentBuilder } = require('discord.js');
const { miaomi } = require('../config.json');
const Birthday = require('../modules/dbFunction/birthday');
const { isOwner } = require('../modules/utility');

// #region : Sub commands
function todayWhoBirthday(sub) {
  return sub
    .setName('today')
    .setDescription('今天誰生日？');
}

function recentWhoBirthday(sub) {
  return sub
    .setName('recent')
    .setDescription('最近誰生日？');
}

function listBirthday(sub) {
  return sub
    .setName('list')
    .setDescription('列出所有生日');
}

function addBirthday(sub) {
  return sub
    .setName('add')
    .setDescription('加入生日')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('誰的生日？')
        .setRequired(true))
    .addIntegerOption(option =>
      option
        .setName('month')
        .setDescription('月')
        .setRequired(true))
    .addIntegerOption(option =>
      option
        .setName('day')
        .setDescription('日')
        .setRequired(true));
}

function delBirthday(sub) {
  return sub
    .setName('delete')
    .setDescription('刪除生日紀錄')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('要刪除的人')
        .setRequired(true),
    );
}

function sendBdCard(sub) {
  return sub
    .setName('card')
    .setDescription('發送生日卡')
    .addStringOption(option =>
      option
        .setName('message')
        .setDescription('文字訊息'))
    .addBooleanOption(option =>
      option
        .setName('tag')
        .setDescription('要tag他/她嗎？'));
}

const subCommands = [
  todayWhoBirthday,
  recentWhoBirthday,
  listBirthday,
  addBirthday,
  delBirthday,
  sendBdCard,
];
// #endregion

// #region : Build Command
const command = new SlashCommandBuilder().setName('birthday').setDescription('今天是我生日');
subCommands.forEach(subCmd => command.addSubcommand(subCmd));
// #endregion

// #region : Create interaction (All return a reply object)
async function todayInteraction(bdObj) {
  return {
    embeds: [{
      color: 0xFAD241,
      title: '今日壽星',
      description: await bdObj.birthdayToday(),
    }],
  };
}

async function recentInteraction(bdObj) {
  return {
    embeds: [{
      color: 0xFFFFFF,
      title: '這3個月內生日的人：',
      description: await bdObj.birthdayRecent(),
    }],
  };
}

async function listInteraction(bdObj) {
  const bds = await bdObj.showAllBirthday();

  return {
    embeds: [{
      color: 0xFFFFFF,
      title: '我有記着大家的生日啊！',
      fields: [{
        name: `大家的生日：`,
        value: bds.map(bd => `<@${bd.user_id}> - ${bd.bdMonth}月${bd.bdDay}日`).join('\n'),
      }],
    }],
  };
}

async function addInteraction(bdObj, options) {
  const user = options.getUser('user');
  const month = options.getInteger('month');
  const day = options.getInteger('day');
  const userid = user.id;

  if (month > 12 || month < 1 || day > 31 || day < 1) {
    return { content: '日期格式錯誤', flags: MessageFlags.Ephemeral };
  } else if (!await bdObj.findBirthday(userid)) {
    await bdObj.addBirthday(userid, month, day);
    return `已加入 ${user.username} 之生日 ${month}月${day}日`;
  } else {
    return { content: '此用戶已有生日紀錄', flags: MessageFlags.Ephemeral };
  }
}

async function deleteInteraction(bdObj, options) {
  const user = options.getUser('user');
  const userid = user.id;

  if (!await bdObj.findBirthday(userid)) {
    return { content: '無此用戶生日紀錄', flags: MessageFlags.Ephemeral };
  } else {
    await bdObj.deleteBirthday(userid);
    return `已刪除 ${user.username} 之生日`;
  }
}

async function cardInteraction(bdObj, options, member) {
  const bds = await bdObj.showAllBirthday();
  if (bds.length === 0) {
    return { content: '今天沒人生日啦～', flags: MessageFlags.Ephemeral };
  }

  const tag = options.getBoolean('tag') || true;

  const message = options.getString('message') || '生日大快樂！Happy Birthday！お誕生日おめでとう！';
  const files = [];
  const avatar = await Canvas.loadImage(member.displayAvatarURL());

  if (bds.filter(d => d.user_id !== member.id).length > 0) {
    const canvas = Canvas.createCanvas(500, 598);
    const context = canvas.getContext('2d');

    const background = await Canvas.loadImage(path.join(__dirname, '../assets/images/bd_card.jpg'));
    const hat = await Canvas.loadImage(path.join(__dirname, '../assets/images/party_hat2.png'));

    context.drawImage(background, 0, 0, 500, 599);

    context.save();
    context.beginPath();
    context.arc(97 + 130, 125 + 130, 130, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();
    context.drawImage(avatar, 97, 125, 259, 259);
    context.restore();

    context.drawImage(hat, 71, 25, 138, 165);

    files.push(new AttachmentBuilder(await canvas.encode('jpeg'), { name: `bd-card-${member.id}.jpg` }));
  }

  if (bds.some(d => d.user_id === member.id)) {
    const canvas = Canvas.createCanvas(1040, 720);
    const context = canvas.getContext('2d');

    const background = await Canvas.loadImage(path.join(__dirname, '../assets/images/hbd_me.jpg'));
    const hat = await Canvas.loadImage(path.join(__dirname, '../assets/images/party_hat3.png'));

    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    context.save();
    context.beginPath();
    context.arc(314 + 160, 104 + 160, 160, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();
    context.drawImage(avatar, 314, 104, 320, 320);
    context.restore();

    context.drawImage(hat, 71, 25, 138, 165);

    files.push(new AttachmentBuilder(await canvas.encode('jpeg'), { name: `bd-card-me-${member.id}.jpg` }));
  }

  return {
    content: tag ? `${bds.map(u => `<@${u.user_id}>`).join(' ')} ${message}` : message,
    files,
  };
}

const actionDict = new Map([
  ['today', todayInteraction],
  ['recent', recentInteraction],
  ['list', listInteraction],
  ['add', addInteraction],
  ['delete', deleteInteraction],
  ['card', cardInteraction],
]);
// #endregion

module.exports = {
  data: command,
  execute: async (interaction) => {
    if (!isOwner(interaction.user.id) && interaction.guild.id !== miaomi) {
      await interaction.reply({ content: '此指令僅限擁有者及部分伺服器使用', flags: MessageFlags.Ephemeral });
      return;
    }

    const bdObj = new Birthday();
    const action = actionDict.get(interaction.options.getSubcommand());

    if (action) {
      const reply = await action(bdObj, interaction.options, interaction.member);
      await interaction.reply(reply);
    }
  },
};
