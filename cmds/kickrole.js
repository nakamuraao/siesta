const { SlashCommandBuilder } = require('@discordjs/builders');
const {isAdmin, logTime} = require('../modules/utility')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kickrole')
		.setDescription('踢出身分組中的成員')
        .addStringOption(option=> option.setName('kick-or-ban').setDescription('kick or ban').addChoices({name:'kick',value:'kick'},{name:'ban',value:'ban'}).setRequired(true))
        .addRoleOption(option => option.setName('role').setDescription('目標身分組').setRequired(true)),
    
    async execute(interaction){
        if(!isAdmin(interaction)){
            await interaction.reply({ content:'此指令僅限管理員使用', ephemeral: true })
        }

        const targetrole = interaction.options.getRole('role')
        const allMembers = await interaction.guild.members.fetch();
        const choice = interaction.options.getString('kick-or-ban')
        allMembers.forEach(member => {
            if(member.roles.cache.some(role=> role.id === targetrole.id)) {
                if(choice === 'kick'){
                    member.kick().catch((error)=>interaction.channel.send(`無法踢出<@${member.id}>`))
                }else if(choice === 'ban'){
                    member.ban().catch((error)=>interaction.channel.send(`無法停權<@${member.id}>`))
                }
            }
        });
        await interaction.reply('已踢出身分組中的成員')
        
        logTime()
        console.log(`${interaction.user.tag} 踢出了 ${targetrole.name} (${interaction.guild.name})\n-----------------------`)
    }
}