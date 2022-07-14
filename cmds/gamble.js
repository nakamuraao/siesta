const {SlashCommandBuilder} = require('@discordjs/builders')
const {MessageEmbed} = require('discord.js')
const config = require('../config.json')
const gameble = require('../modules/dbFunction/currencySystem')
const {randomNumber} = require('../modules/utility')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('gambling').setDescription('賭博指令')
        .addSubcommand(sub=>sub.setName('help').setDescription('幫助'))
        .addSubcommand(sub=>sub.setName('status').setDescription('領錢、註冊、查看資訊'))
        .addSubcommand(sub=>sub.setName('wheel').setDescription('命運之輪').addIntegerOption(option=>option.setName('bet').setDescription('賭注大小').setRequired(true)))
        .addSubcommand(sub=>sub.setName('betroll').setDescription('擲骰子').addIntegerOption(option=>option.setName('bet').setDescription('賭注大小').setRequired(true))),
        

    async execute(interaction){
        const Obj = new gameble.currency(interaction.user.id)
        switch(interaction.options.getSubcommand()){
            case 'help':
                const embed = new MessageEmbed().setTitle('賭博模組').setColor('BLUE').addFields(
                    {name:'status',value:`檢視自身使用者資訊\n每小時可領取100${config.currencyName}\n第一次使用賭博指令者請先執行此指令進行註冊`},
                    {name:'wheel',value:'命運之輪'},
                    {name:'betroll',value:'擲骰子\n24(含)以下得0\n25-30得1倍\n31-35得2倍\n36得4倍'},
                    /*{name:'buyticket',value:''},*/
                    /*{name:'mine',value:`在危險礦場挖礦。不須賭注，一分鐘限挖掘一次，每次得5${config.currencyName}\n有機率發生工安意外而住院治療(未來視情況導入保險系統)`}*/);
                interaction.reply({ embeds: [embed] });
                break;
            case 'status':
                if(await Obj.isUserExist(interaction.user.id)){
                    const stats = await Obj.getUserStats(interaction.user.id);
		            const embed = new MessageEmbed().setColor('#0000FF').setTitle('使用者資料')
			        .addField('使用者名稱：', interaction.user.tag, true)
			        .addField('使用者ID：', interaction.user.id, true)
		            if(Date.now()-stats.signTime >= Obj.signDuration*60*60*1000 ) {
			            await Obj.updateBalance(interaction.user.id, stats.balance + Obj.perSign);
			            await Obj.updateSignTime(interaction.user.id);
			            embed.addField('餘額：', `${stats.balance + Obj.perSign}`, true)
				            .setDescription(`已簽到 +${Obj.perSign}，${Obj.signDuration}小時後可再次領取獎勵!`);
		            } else {
			            embed.addField('餘額：', `${stats.balance}`, true)} 
                    await interaction.reply({ embeds: [embed] });
                }else{
                    await Obj.addUser(interaction.user.id);
		            const embed = new MessageEmbed().setColor('#0000FF').setTitle('使用者資料')
			            .setDescription('初來乍到')
			            .addField('使用者名稱：', interaction.user.tag, true)
			            .addField('使用者ID：', interaction.user.id, true)
			            .addField('餘額：', `${Obj.initBalance}`, true);
		            await interaction.reply({ embeds: [embed] });
                };
                break;
            case 'wheel':
	            const stats = await Obj.getUserStats(interaction.user.id);
	            const bets = interaction.options.getInteger('bet');
	            const wheel = [0.1, 0.2, 0.3, 0.5, 1.2, 1.5, 1.7, 2.5];
	            const arrow = ['↙️', '⬇️', '⬅️', '↖️', '↘️', '⬆️', '➡️', '↗️'];
	            if(!stats) {
		            await interaction.reply({ content: '請先執行status指令', ephemeral: true });
	            }else if(stats.balance < bets) {
		            await interaction.reply({ content: '賭注不能高過總財產', ephemeral: true });
	            }else if(bets < 0) {
		            await interaction.reply({ content: '賭注不可為負', ephemeral: true });
	            }else {
		            const pos = randomNumber(0, 7);
		            const plate = `【0.5】 【1.5】 【2.5】\n\n【0.3】      ${arrow[pos]}       【1.7】\n\n【0.1】 【0.2】 【1.2】`;
		            const embed = new MessageEmbed().setColor('#0000FF').setTitle(plate)
			            .setDescription(`你贏得${Math.round(bets*wheel[pos])}`);
		            await Obj.updateBalance(interaction.user.id, stats.balance - bets + Math.round(bets*wheel[pos]));
		            await interaction.reply({ embeds: [embed] });
	            };
                break;
            case 'betroll':
                const stat = await Obj.getUserStats(interaction.user.id);
	            const bet = interaction.options.getInteger('bet');
                if(!stat) {
		            await interaction.reply({ content: '請先執行status指令', ephemeral: true });
	            }else if(stat.balance < bet) {
		            await interaction.reply({ content: '賭注不能高過總財產', ephemeral: true });
	            }else if(bet < 0) {
		            await interaction.reply({ content: '賭注不可為負', ephemeral: true });
	            }else{
                    const roll = randomNumber(1,36)
                    const embed = new MessageEmbed().setColor('#0000FF').setTitle('擲骰結果')
                    if(roll == 36){
                        embed.setDescription(`${interaction.user.id} 擲出了 36 ! 獲得4倍獎金 !`)
                        Obj.updateBalance(interaction.user.id, stat.balance + Math.round(bet*4))
                    }else if(roll > 30){
                        embed.setDescription(`${interaction.user.id} 擲出了 ${roll} ! 獲得2倍獎金 !`)
                        Obj.updateBalance(interaction.user.id, stat.balance + Math.round(bet*2))
                    }else if(roll > 24){
                        embed.setDescription(`${interaction.user.id} 擲出了 ${roll} ! 獲得1倍獎金 !`)
                        Obj.updateBalance(interaction.user.id, stat.balance + Math.round(bet*1))
                    }else{
                        embed.setDescription(`${interaction.user.id} 擲出了 ${roll}，銘謝惠顧再接再厲～`)
                        Obj.updateBalance(interaction.user.id, stat.balance - bet)
                    }

                    await interaction.reply({embeds:[embed]})
                };
                break;
            /*case 'buyticket':
                ;
                break;
            case 'mine':
                ;
                break;
            case 'edit':
                ;
                break;*/
            default:
                await interaction.reply({ content: '出現問題，請重試後洽<@678493512836317194>', ephemeral: true });
                break;
        }
    }

        
}