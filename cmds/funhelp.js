const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const botzoneDB = require('../modules/dbFunction/botChannel')

const Obj_cre = new botzoneDB.botzone()
const { isOwner } = require('../modules/utility')

function generateHelpMsg() {
  return {
    color: 0xFFFFFF,
    title: '現在可用的功能',
    // description: "現在可用的功能",
    // thumbnail: { url: "https://cdn.discordapp.com/attachments/966618791276605470/1329445510485905522/image.png" },
    fields: [
      {
        name: '# 指令',
        value: [
          '**菜單類：**',
          '- 菜單機率',
          '- 菜單有沒有{食物或飲料}',
          '---',
          '- {時間}吃什麼(正常的｜奇怪的)',
          '- {時間}吃甚麼(正常的｜奇怪的)',
          '- {時間}食咩(正常野｜奇怪野)',
          '- {時間}食乜(正常野｜奇怪野)',
          '---',
          '- 喝什麼(正常的｜奇怪的)',
          '- 喝甚麼(正常的｜奇怪的)',
          '- 飲咩(正常野｜奇怪野)',
          '- 飲乜(正常野｜奇怪野)',
          '---',
          '- 來個(正常｜奇怪)套餐',
          '- 來份(正常｜奇怪)套餐',
          '- 要個(正常｜奇怪)套餐',
          '- 要份(正常｜奇怪)套餐',
          '',
          '**其他：**',
          '- 擲幣',
          '- 抽籤',
          '====================',
        ].join('\n'),
      },
      {
        name: '# 有效的「吃什麼」時間',
        value: [
          '**時間類：**',
          [
            '早上',
            '朝早',
            '上午',
            '上晝',
            '中午',
            '晏晝',
            '下午',
            '下晝',
            '晚上',
            '夜晚',
            '今早',
            '今朝',
            '今晚',
            '明天',
            '聽日',
            '明早',
            '聽朝',
            '明晚',
            '聽晚',
            '待會',
            '陣間',
          ].join('、'),
          '',
          '**用餐時間類：**',
          [
            '早餐',
            '中餐',
            '午餐',
            '下午茶',
            '晚餐',
            '宵夜',
            '消夜',
            '前菜',
            '主菜',
            '正餐',
            '甜品',
            '零食',
            '小吃',
          ].join('、'),
          '',
          '**節日類：**',
          [
            '聖誕',
            '聖誕節',
            '聖誕大餐',
            '拳擊日',
            'Boxing Day',
            '冬至',
            '除夕',
            '除夕夜',
            '除夕晚',
            '除夕晚上',
            '元旦',
            '過年',
            '新年',
            '正月',
            '清明',
            '清明節',
            '清明大餐',
            '餓鬼節',
            '復活節',
            '佛誕',
            '國慶',
            '重陽',
            '重陽節',
            '端午',
            '端午節',
            '中秋',
            '中秋節',
          ].join('、'),
          '',
          '**特殊類：**',
          ['巴尼陣亡紀念日', '生日', '光棍節', '黑色星期五', 'Black Friday', '網絡星期一', 'Cyber Monday', '感恩節'].join('、'),
        ].join('\n'),
      },
    ],
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('funhelp')
    .setDescription('顯示趣味功能的說明書')
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),

  async execute(interaction) {
    const isRightChannel = await Obj_cre.findChannel(interaction.channelId)
    if (isRightChannel || isOwner(interaction.user.id)) {
      await interaction.reply({ content: '**趣味功能**', embeds: [generateHelpMsg()] })
    } else {
      await interaction.reply({ content: '請在機器人區域中使用', ephemeral: true })
    }
  },
}
