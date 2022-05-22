const {SlashCommandBuilder} = require('@discordjs/builders')
const {isOwner} = require('../modules/utility')
const {MessageEmbed} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('產生邀請連結(擁有者限定)'),

    async execute(interaction){
        if (!isOwner(interaction.user.id)){
            await interaction.reply({ content:'此指令僅限擁有者使用', ephemeral: true })
            return
        }
        const embed = new MessageEmbed().setColor('WHITE').setDescription('https://discordapp.com/api/oauth2/authorize?client_id=843890891704893530&permissions=66186303&scope=bot%20applications.commands')
        await interaction.reply({embeds:[embed]})
    }

}