const { SlashCommandBuilder } = require('@discordjs/builders');
const unverifiedrole = '943714271127306251'
const memberrole = '943714271156633620'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('checkrole')
		.setDescription('身分組確認(管理用)'),

	async execute(interaction) {
        if (interaction.user.roles.cache.has(`943714271156633624`)){
            const allMembers = await interaction.guild.members.fetch();
            const role = await interaction.guild.roles.cache.find(role => role.id === unverifiedrole);
            const memrole = await interaction.guild.roles.cache.find(memrole => memrole.id === memberrole)
            allMembers.forEach(member => {
                if((member.roles.has(role))&&(member.roles.has(memrole))) {
                    member.roles.remove(role)
                    interaction.reply('已將已認證成員拔除未認證身分')
    }})
        }else{
            await interaction.reply({content:'此指令為管理員專用', ephemeral: true})
        }
}
};