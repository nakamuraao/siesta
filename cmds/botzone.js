const {SlashCommandBuilder} = require('@discordjs/builders')
const {isAdmin} = require('../modules/utility')
const botzone = require('../modules/botzone-db')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('botzone')
        .setDescription('設定機器人區域')
        .addStringOption(option=>option.setName('move').setDescription('選擇動作').setRequired(true).addChoices({name:'add',value:'add'},{name:'remove',value:'remove'})),

    async execute(interaction) {
        if(!isAdmin(interaction)){
            interaction.reply({ content:'此指令僅限管理員使用', ephemeral: true })
            return
        }        
        const channelId = interaction.channel.id
        const Obj = new botzone.botzone(channelId)
        const move = interaction.options.getString('move')

        if(move === 'add'){
            if(!Obj.findChannel(channelId)){
                Obj.addBotZone(channelId)
                interaction.reply('已將此頻道設為機器人區域')
            }else{
                interaction.reply({ content:'此頻道已經是機器人區域', ephemeral: true })
                return
            }
        }else if(move === 'remove'){
            if(!Obj.findChannel(channelId)){
                interaction.reply({ content:'此頻道非機器人區域', ephemeral: true })
                return
            }else{
                Obj.deleteChannel(channelId)
                interaction.reply('已取消機器人區域')
            }
        }else{
            interaction.reply({ content:'執行此指令時出現問題', ephemeral: true })
        }

        
        }
}