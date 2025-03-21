const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('listbot')
    .setDescription('列出伺服器中的機器人'),

  async execute(interaction) {
    let string = ''
    const allMembers = await interaction.guild.members.fetch()
    allMembers.forEach((member) => {
      if (member.user.bot) {
        string = string.concat(`\`${member.id}\`` + ` ${member.user.displayName}\n`)
      }
    })

    const embed = new EmbedBuilder().setTitle(`伺服器中的機器人`).setDescription(string).setColor('#FFFFFF')
    await interaction.reply({ embeds: [embed] })
  },
}
