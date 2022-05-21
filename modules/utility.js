const config = require('../config.json')
const {MessageEmbed} = require('discord.js')

function isAdmin(interaction) {
    if(interaction.memberPermissions.has('ADMINISTRATOR',true)) {
        return true;
    }

}

function isOwner(id) {
    if(id === config.oid){
        return true;
    }
}

function omikuji(msg){

        const random = Math.floor(Math.random()*15);
        const daikichi = new MessageEmbed()
            .setColor('#c8a9d6')
            .setTitle(`**${msg.author.tag} 的抽籤結果**`)
            .setImage('https://media.discordapp.net/attachments/867034103097196544/928972567111401482/omikuji_daikichi.png');
        const syoukichi = new MessageEmbed()
            .setColor('#c8a9d6')
            .setTitle(`**${msg.author.tag} 的抽籤結果**`)
            .setImage('https://media.discordapp.net/attachments/867034103097196544/928972567560216576/omikuji_syoukichi.png');
        const kichi = new MessageEmbed()
            .setColor('#c8a9d6')
            .setTitle(`**${msg.author.tag} 的抽籤結果**`)
            .setImage('https://media.discordapp.net/attachments/867034103097196544/928972567967068200/omikuji_kichi.png');
        const suekichi = new MessageEmbed()
            .setColor('#c8a9d6')
            .setTitle(`**${msg.author.tag} 的抽籤結果**`)
            .setImage('https://media.discordapp.net/attachments/867034103097196544/928972569137270794/omikuji_suekichi.png');
        const chuukichii = new MessageEmbed()
            .setColor('#c8a9d6')
            .setTitle(`**${msg.author.tag} 的抽籤結果**`)
            .setImage('https://media.discordapp.net/attachments/867034103097196544/928972568684298290/omikuji_chuukichi.png');
        const kyou = new MessageEmbed()
            .setColor('#c8a9d6')
            .setTitle(`**${msg.author.tag} 的抽籤結果**`)
            .setImage('https://media.discordapp.net/attachments/867034103097196544/928972568357122108/omikuji_kyou.png');
        const daikyou = new MessageEmbed()
            .setColor('#c8a9d6')
            .setTitle(`**${msg.author.tag} 的抽籤結果**`)
            .setImage('https://media.discordapp.net/attachments/867034103097196544/928972569556680755/omikuji_daikyou.png');
        if ((random === 0)||(random === 1)||(random === 2)){
             msg.channel.send({embeds:[daikichi]})
        }else if ((random === 3)||(random === 4)){
             msg.channel.send({embeds:[syoukichi]})
        }else if ((random === 5)||(random === 6)||(random === 7)){
             msg.channel.send({embeds:[kichi]})
        }else if ((random === 8)||(random === 9)){
             msg.channel.send({embeds:[suekichi]})
        }else if ((random === 10)||(random === 11)){
             msg.channel.send({embeds:[chuukichii]})
        }else if ((random === 12)||(random === 13)){
             msg.channel.send({embeds:[kyou]})
        }else if (random === 14){
             msg.channel.send({embeds:[daikyou]})
        }
    
}

function randomNumber(min, max){
    Math.floor(Math.random() * (max - min + 1) + min);
}

function logTime(){
    const now = new Date()
    const time = now.toTimeString()
    console.log(time)
}

module.exports.isAdmin = isAdmin;
module.exports.isOwner = isOwner;
module.exports.omikuji = omikuji;
module.exports.randomNumber = randomNumber;
module.exports.logTime = logTime;