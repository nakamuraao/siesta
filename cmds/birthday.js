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
  addBirthday,
  delBirthday,
];
// #endregion

const command = new SlashCommandBuilder().setName('birthday').setDescription('今天是我生日');
subCommands.forEach((subCmd) => {
  command.addSubcommand(subCmd);
});

module.exports = {
  data: command,

  async execute(interaction) {
    if (isOwner(interaction.user.id) || interaction.guild.id === miaomi) {
      if (interaction.options.getSubcommand() === 'today') {
        const Obj = new birthday.birthday();
        const embed = new EmbedBuilder().setColor('#FFFFFF').setTitle('今日壽星').setDescription(await Obj.birthdayToday());
        await interaction.reply({ embeds: [embed] });
      } else if (interaction.options.getSubcommand() === 'recent') {
        const Obj = new birthday.birthday();
        const embed = new EmbedBuilder().setColor('#FFFFFF').setTitle('最近生日').setDescription(await Obj.birthdayRecent());
        await interaction.reply({ embeds: [embed] });
      } else if (interaction.options.getSubcommand() === 'add') {
        const user = interaction.options.getUser('user');
        const month = interaction.options.getInteger('month');
        const day = interaction.options.getInteger('day');
        const userid = user.id;
        const Obj = new birthday.birthday(userid);
        if (month > 12 || month < 1 || day > 31 || day < 1) {
          await interaction.reply({ content: '日期格式錯誤', flags: MessageFlags.Ephemeral });
        } else if (!await Obj.findBirthday(userid)) {
          await Obj.addBirthday(userid, month, day);
          await interaction.reply(`已加入 ${user.username} 之生日 ${month}月${day}日`);
        } else {
          await interaction.reply({ content: '此用戶已有生日紀錄', flags: MessageFlags.Ephemeral });
        }
      } else if (interaction.options.getSubcommand() === 'delete') {
        const user = interaction.options.getUser('user');
        const userid = user.id;
        const Obj = new birthday.birthday(userid);
        if (!await Obj.findBirthday(userid)) {
          await interaction.reply({ content: '無此用戶生日紀錄', flags: MessageFlags.Ephemeral });
        } else {
          await Obj.deleteBirthday(userid);
          await interaction.reply(`已刪除 ${user.username} 之生日`);
        }
      }
    } else {
      await interaction.reply({ content: '此指令僅限擁有者及部分伺服器使用', flags: MessageFlags.Ephemeral });
      return;
    }

    if (interaction.options.getSubcommand() === 'bot') {
      const embed = new EmbedBuilder().setColor('#FFFFFF').setDescription('https://discordapp.com/api/oauth2/authorize?client_id=843890891704893530&permissions=8&scope=bot%20applications.commands');
      await interaction.reply({ embeds: [embed] });
    }
  },
};
