const { token } = require('./config.json');
const fs = require('fs');
const sql = require('sequelize');
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const config = require('./config.json');
const { omikuji, randomNumber, isOwner, dinnerTonight } = require('./modules/utility');
const botzoneDB = require('./modules/dbFunction/botChannel');
const client = new Client({ partials:["CHANNEL", "MESSAGE", "USER"], intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_MEMBERS] });
const Obj_cre = new botzoneDB.botzone;

client.commands = new Collection();
const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./cmds/${file}`);
  client.commands.set(command.data.name, command);
}

const sequelize = new sql('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'database.sqlite',
});

const servers = require('./modules/dbStructure/servers')(sequelize, sql.DataTypes);
const botzone = require('./modules/dbStructure/botChannel')(sequelize, sql.DataTypes);
const log = require('./modules/dbStructure/log')(sequelize, sql.DataTypes);
// const currency = require('./modules/dbStructure/currency')(sequelize, sql.DataTypes);

client.once('ready', () => {
  const now = new Date();
  const time = now.toTimeString();
  console.log(`${time}`);

  servers.sync();
  botzone.sync();
  log.sync();

  console.log(`以 ${client.user.tag} 登入`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }

});

client.on('messageDelete', async msg => {
  const del = require('./modules/logEvents/messageDeleted');
  del.execute(msg, client);
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
  if (oldMessage.content === newMessage.content) return;
  const up = require('./modules/logEvents/messageUpdate');
  up.execute(oldMessage, newMessage, client);
});

client.on('messageCreate', async msg => {
  if (msg.author.bot) return;

  // webhook
  const webhook = require('./modules/webhook');
  await webhook.execute(msg);

  // 監控
  if (msg.channel.type === 'DM') {
    if (msg.author.id === config.oid) return;
    const embed1 = new MessageEmbed()
      .setColor('#c5c6c9')
      .setTitle(`來自 ${msg.author.tag} (${msg.author.id})的訊息`)
      .setDescription(`<@${msg.author.id}>\n` + msg.content)
      .setFooter({ text:`來信時間 : ${msg.createdAt.toLocaleDateString()} ${msg.createdAt.toLocaleTimeString()}` });
    client.users.fetch(config.oid).then((owner) =>
      owner.send({ embeds:[embed1] }));
  } else if (msg.content.includes('機率') && (await Obj_cre.findChannel(msg.channelId) || isOwner(msg.author.id))) {
    const min = 0;
    const max = 100;
    const num = randomNumber(min, max);
    msg.channel.send(`${num}%`);
  } else if (msg.content.includes('抽籤') && await Obj_cre.findChannel(msg.channelId)) {
    omikuji(msg);
  } else if (msg.content.includes('晚餐吃什麼') && await Obj_cre.findChannel(msg.channelId)) {
    // const din = await dinnerTonight()
    msg.reply(`今天晚餐吃 ${dinnerTonight()}`);
  } else if (msg.content === `<@${config.cid}>我婆` || msg.content === `<@!${config.cid}>我婆`) {
    if (isOwner(msg.author.id)) {
      msg.reply('沒錯♥');
    } else {
      msg.reply('婆你個大頭 醒');
    }
  } else if (msg.content.includes('蒼')) {
    if (msg.author.id === config.oid) return;
    for (i = 0; i < config.ignore.length; i++) {
      if (msg.content.includes(config.ignore[i])) return;
    }
    const embed = new MessageEmbed()
      .setColor('AQUA')
      .setTitle(`${msg.author.tag}(${msg.author.id}) 在 #${msg.channel.name} 提及了蒼`)
      .setDescription(`<#${msg.channelId}> <@${msg.author.id}>\n` + msg.content);
    client.users.fetch(config.oid).then((owner) =>
      owner.send({ embeds:[embed] }));
  } else if (msg.content.includes('https://www.instagram.com/')) {
    const newMessage = msg.content.replace("https://www.instagram.com/", "https://www.ddinstagram.com/");
    msg.reply(newMessage);
  }
});

client.login(token);
