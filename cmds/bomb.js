const {SlashCommandBuilder} = require('@discordjs/builders')
const {isOwner} = require('../modules/utility')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bomb')
        .setDescription('洗版指令(使用者限定)')
        .addStringOption(option=>option.setName('message').setDescription('message').setRequired(true))
        .addIntegerOption(option=>option.setName('times').setDescription('times').setRequired(true)),
    
    async execute(interaction){
        if(isOwner(interaction.user.id)){
            const message = interaction.options.getString('message')
            const times = interaction.options.getInteger('times')

            for(let i=0; i<times; i++){
                await interaction.channel.send(message)
            }
            await interaction.reply({content:'執行完畢', ephemeral: true})
        }else{
            await interaction.reply({ content:'此指令僅限擁有者使用', ephemeral: true })
        }
    }
}