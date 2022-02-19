const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const {oid} = require('./../config.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('確認機器人的狀態'),
	async execute(interaction) {
        const botstatsembed = new MessageEmbed()
            .setColor('#68c3e7')
            .setThumbnail(`${interaction.client.user.avatarURL()}`)
            .addFields(
                {name: '用戶名 :', value: `${interaction.client.user.tag}`},
                {name: `CID :`, value: `${interaction.client.user.id}`},
                {name: `建立時間 :`, value: `${interaction.client.user.createdAt.toLocaleDateString()} ${interaction.client.user.createdAt.toLocaleTimeString()}`},
            )
    if (interaction.channel.id === '932619809991049216' || interaction.user.id === oid){
		await interaction.reply({ embeds: [botstatsembed] });
    }else{
        interaction.reply({ content:'請到<#932619809991049216>頁面使用', ephemeral: true})}
    },
};