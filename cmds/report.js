const { SlashCommandBuilder } = require('@discordjs/builders');
const database = require('../modules/database');
const { logTime } = require('../modules/utility');

module.exports = {
    data: new SlashCommandBuilder().setName('report').setDescription('開啟檢舉用私人討論串'),
    async execute(interaction) {
        if (interaction.guild.premiumTier==='TIER_2'||interaction.guild.premiumTier==='TIER_3'){
            let Obj = new database.ServerDB(interaction.guild.id)
            if (!Obj.findServer(interaction.guild.id)){
                interaction.reply({content:'請通知管理員先執行`/setup`指令',ephemeral:true})
                return
            }

            const admin = await Obj.findAdminRole(interaction.guild.id)
            let minute = new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes();
            let time = `${new Date().getDate()}`+` `+`${new Date().getHours()}`+`-`+`${minute}`;

            const thread = await interaction.channel.threads.create({
             name: `編號[${time}]`,
             autoArchiveDuration: 1440,
             type: 'GUILD_PRIVATE_THREAD',
         });
         logTime()
         console.log(`討論串建立了 : ${interaction.guild.name} ${thread.name}\n檢舉人 : ${interaction.user.tag} ${interaction.user.id}\n-----------------------`);
    

         thread.members.add(interaction.member.id);
         thread.send(`<@${interaction.member.id}>您好\n這個討論串只有您與<@&${admin}>看的見\n請將您要投訴的內容、訊息鏈結、截圖都貼在這個地方，會由管理員進行處置。`);
         await interaction.reply({content:`投訴專用討論串<#${thread.id}>已建立，請放心的在該討論串進行投訴`, ephemeral: true});
     }else{
         await interaction.reply({content:'伺服器加成等級未達2，無法使用此指令', ephemeral: true})
        }
    }
}