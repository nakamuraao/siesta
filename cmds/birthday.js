const { EmbedBuilder, SlashCommandBuilder, MessageFlags } = require('discord.js');
const { miaomi } = require('../config.json');
const birthday = require('../modules/dbFunction/birthday');
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
      option.setName('user')
        .setDescription('誰的生日？')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('month')
        .setDescription('月')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('day')
        .setDescription('日')
        .setRequired(true));
}

function delBirthday(sub) {
  return sub
    .setName('delete')
    .setDescription('刪除生日紀錄')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('要刪除的人')
        .setRequired(true),
    );
}

const subCommands = [
  todayWhoBirthday,
  recentWhoBirthday,
  listBirthday,
  addBirthday,
  delBirthday,
];
// #endregion

// #region : Build Command
const command = new SlashCommandBuilder().setName('birthday').setDescription('今天是我生日');
subCommands.forEach((subCmd) => {
  command.addSubcommand(subCmd);
});
// #endregion

// #region : Create interaction (All return a reply object)
async function todayInteraction(bdObj) {
  const embed = new EmbedBuilder().setColor('#FFFFFF').setTitle('今日壽星').setDescription(await bdObj.birthdayToday());
  return { embeds: [embed] };
}

async function recentInteraction(bdObj) {
  const embed = new EmbedBuilder().setColor('#FFFFFF').setTitle('最近生日').setDescription(await bdObj.birthdayRecent());
  return { embeds: [embed] };
}

async function listInteraction(bdObj) {
  const bds = await bdObj.showAllBirthday();
  console.log(`🚀 ~ birthday.js:83 ~ listInteraction ~ bds:`, bds);

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

const actionDict = new Map([
  ['today', todayInteraction],
  ['recent', recentInteraction],
  ['list', listInteraction],
  ['add', addInteraction],
  ['delete', deleteInteraction],
]);
// #endregion

module.exports = {
  data: command,
  execute: async (interaction) => {
    if (!isOwner(interaction.user.id) && interaction.guild.id !== miaomi) {
      await interaction.reply({ content: '此指令僅限擁有者及部分伺服器使用', flags: MessageFlags.Ephemeral });
      return;
    }

    const bdObj = new birthday.birthday();
    const action = actionDict.get(interaction.options.getSubcommand());

    if (action) {
      const reply = await action(bdObj, interaction.options);
      await interaction.reply(reply);
    }
  },
};
