const {SlashCommandBuilder} = require('@discordjs/builders')
const {MessageEmbed} = require('discord.js')
const config = require('../config.json')
const gameble = require('../modules/dbFunction/currencySystem')
const {randomNumber, isOwner} = require('../modules/utility')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('gambling').setDescription('賭博指令')
        .addSubcommand(sub=>sub.setName('help').setDescription('幫助'))
        .addSubcommand(sub=>sub.setName('stats').setDescription('領錢、註冊、查看資訊'))
        .addSubcommand(sub=>sub.setName('wheel').setDescription('命運之輪').addIntegerOption(option=>option.setName('bet').setDescription('賭注大小').setRequired(true)))
        .addSubcommand(sub=>sub.setName('betroll').setDescription('擲骰子').addIntegerOption(option=>option.setName('bet').setDescription('賭注大小').setRequired(true)))
        .addSubcommand(sub=>sub.setName('leaderboard').setDescription('排行榜'))
        .addSubcommand(sub=>sub.setName('guessnumber').setDescription('猜數字，每注100').addIntegerOption(option=>option.setName('number').setDescription('數字').setRequired(true)))
        //.addSubcommand(sub=>sub.setName('giveaway').setDescription('全伺服器歡天喜地(擁有者限定)').addIntegerOption(option=>option.setName('amount').setDescription('數量').setRequired(true)))
        .addSubcommand(sub=>sub.setName('award').setDescription('獎勵(擁有者限定)').addUserOption(option=>option.setName('user').setDescription('目標').setRequired(true)).addIntegerOption(option=>option.setName('amount').setDescription('$$').setRequired(true))),
        

    async execute(interaction,client){
        const Obj = new gameble.currency(interaction.user.id)
        switch(interaction.options.getSubcommand()){
            case 'help':
                const embed = new MessageEmbed().setTitle('賭博模組').setColor('BLUE').addFields(
                    {name:'stats',value:`檢視自身使用者資訊\n每小時可領取100${config.currencyName}\n第一次使用賭博指令者請先執行此指令進行註冊`},
                    {name:'wheel',value:'命運之輪'},
                    {name:'betroll',value:'擲骰子\n24(含)以下得0\n25-30得1倍\n31-35得2倍\n36得4倍'},
                    {name:'guessnumber',value:'猜數字(1～20)，每注100\n未猜中獎金會累計'},
                    {name:'leaderboard',value:'排行榜'}
                    );
                interaction.reply({ embeds: [embed] });
                break;
            case 'stats':
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
                    await Obj.updateUserTag(interaction.user.id,interaction.user.tag)
                }else{
                    await Obj.addUser(interaction.user.id,interaction.user.tag);
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
		            await interaction.reply({ content: '請先執行stats指令', ephemeral: true });
	            }else if(stats.balance < bets) {
		            await interaction.reply({ content: '賭注不能高過總財產', ephemeral: true });
	            }else if(bets < 10) {
		            await interaction.reply({ content: '賭注不可小於10', ephemeral: true });
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
		            await interaction.reply({ content: '請先執行stats指令', ephemeral: true });
	            }else if(stat.balance < bet) {
		            await interaction.reply({ content: '賭注不能高過總財產', ephemeral: true });
	            }else if(bet < 10) {
		            await interaction.reply({ content: '賭注不可小於10', ephemeral: true });
	            }else{
                    const roll = randomNumber(1,36)
                    const embed = new MessageEmbed().setColor('#0000FF').setTitle('擲骰結果')
                    if(roll == 36){
                        embed.setDescription(`${interaction.user.tag} 擲出了 36 ! 獲得4倍獎金 !`)
                        Obj.updateBalance(interaction.user.id, stat.balance + Math.round(bet*4))
                    }else if(roll > 30){
                        embed.setDescription(`${interaction.user.tag} 擲出了 ${roll} ! 獲得2倍獎金 !`)
                        Obj.updateBalance(interaction.user.id, stat.balance + Math.round(bet*2))
                    }else if(roll > 24){
                        embed.setDescription(`${interaction.user.tag} 擲出了 ${roll} ! 獲得1倍獎金 !`)
                        Obj.updateBalance(interaction.user.id, stat.balance + Math.round(bet*1))
                    }else{
                        embed.setDescription(`${interaction.user.tag} 擲出了 ${roll}，銘謝惠顧再接再厲～`)
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
            case 'guessnumber':
                const number = await interaction.options.getInteger('number')
                const answer = randomNumber(1,20)
                const jackpot = await Obj.getUserStats('00000000')
                if(await Obj.isUserExist(interaction.user.id)) {
                    const stats = await Obj.getUserStats(interaction.user.id);
                    if (stats.balance<100){
                        await interaction.reply({ content: '賭注不能高過總財產', ephemeral: true });
	                }else if (number == answer){
                        const embed = new MessageEmbed().setColor('GREY').setTitle('恭喜中獎!!!!!').setDescription(`獲得累計獎金 : ${jackpot.balance}\n現有財產 : ${stats.balance + jackpot.balance}`)
                        await Obj.updateBalance(interaction.user.id,stats.balance + jackpot.balance)
                        await Obj.updateBalance('00000000',1000)
                        await interaction.reply({embeds:[embed]})
                    }else{
                        await Obj.updateBalance(interaction.user.id,stats.balance-100)
                        await Obj.updateBalance('00000000',jackpot.balance+100)
                        const embed = new MessageEmbed().setColor('GREY').setDescription(`未中獎，下次再努力吧～\n累計獎金 : ${jackpot.balance+100}`)
                        await interaction.reply({embeds:[embed]})}
                }else{
                    await interaction.reply({ content: '請先執行stats指令', ephemeral: true });}
            break;
            case 'leaderboard':
                const boardEmbed = new MessageEmbed().setColor('BLUE')
                const board = await Obj.leaderboard();
                let i = 0;
                for(const user of board) {
                    i ++;
                    //const tag = await interaction.guild.members.cache.get(user.user_id)
                    const tag = await client.users.fetch(user.user_id)
                    //const tag = await interaction.guild.members.cache.fetch(user.user_id)
                    //console.log(tag)
                    //console.log(await interaction.guild);
                    //console.log(tag.user.username)
                    //console.log(user.user_id)
                    //console.log(tag)
                    //console.log(board)
                    boardEmbed.addField(tag.username,user.balance.toString(),false)
                    if (i == 10) break;
                }
                await interaction.reply({embeds:[boardEmbed]})
                break;
            /*case 'giveaway':
                const amount = interaction.options.getInteger('amount')
                
                break;*/
            case 'award':
                const user = interaction.options.getUser('user')
                const money = interaction.options.getInteger('amount')
                const status = await Obj.getUserStats(user.id);
                if(isOwner(interaction.user.id)){
                    await Obj.updateBalance(user.id, status.balance + money);
                    interaction.reply(`給予 ${user.tag} ${money} ${config.currencyName}`)
                }else{
                    await interaction.reply({ content:'此指令僅限擁有者使用', ephemeral: true })};
                break;
            default:
                await interaction.reply({ content: '出現問題，請重試後洽<@678493512836317194>', ephemeral: true });
                break;
        }
    }

        
}