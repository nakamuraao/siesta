const { SlashCommandBuilder, ChannelType, ThreadAutoArchiveDuration } = require('discord.js');
const database = require('../modules/dbFunction/database');
const { logTime } = require('../modules/utility');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('report')
    .setDescription('開啟檢舉用私人討論串'),

  async execute(interaction) {
    const Obj = new database.ServerDB(interaction.guild.id);
    if (!await Obj.findServer(interaction.guild.id)) {
      interaction.reply({ content:'請通知管理員先執行`/serversetup`指令', ephemeral:true });
      return;
    }

    const admin = await Obj.findAdminRole(interaction.guild.id);
    const date = new Date();
    const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const time = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}-${minute}`;

    const thread = await interaction.channel.threads.create({
      name: `編號[${time}]`,
      autoArchiveDuration: ThreadAutoArchiveDuration.ThreeDays,
      type: ChannelType.PrivateThread,
      reason: `由 ${interaction.user.displayName} 建立檢舉用頻道`
    });
    logTime();
    console.log(`討論串建立了 : ${interaction.guild.name} ${thread.name}\n檢舉人 : ${interaction.user.displayName} ${interaction.user.id}\n-----------------------`);

    thread.members.add(interaction.member.id);
    thread.send(`<@${interaction.member.id}>您好\n這個討論串只有您與<@&${admin}>看的見\n請將您要投訴的內容、訊息連結、截圖都貼在這個地方，會由管理員進行處置。\n**請務必注意若在此標註任何人，他將會被邀請進入此討論串。**`);
    await interaction.reply({ content:`投訴專用討論串<#${thread.id}>已建立，請放心的在該討論串進行投訴`, ephemeral: true });
  }
};
