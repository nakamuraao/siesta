const { token } = require('./config.json');
const fs = require('fs');
const sql = require('sequelize');
const { Client, Collection, GatewayIntentBits, ActivityType } = require('discord.js');
const client = new Client({
  partials:["CHANNEL", "MESSAGE", "USER"],
  intents: [
    GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildModeration, GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages
  ] });
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
// const messageReaction = require('./modules/dbStructure/messageReaction')(sequelize, sql.DataTypes);

client.once('ready', () => {
  const now = new Date();
  const time = now.toTimeString();
  console.log(`${time}`);

  servers.sync();
  botzone.sync();
  log.sync();
  //  messageReaction.sync();
	client.user.setActivity('蒼アオ', { type: ActivityType.Watching });
  console.log(`以 ${client.user.displayName} 登入`);
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
  if (msg.author.bot) return;
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
  const watching = require('./modules/messageUtility/watching');
  await watching.execute(msg, client);

  // fun
  const fun = require('./modules/messageUtility/fun');
  await fun.execute(msg);
  
  /*
  if (msg.content.includes('https://www.instagram.com/')) {
    const newMessage = msg.content.replace("https://www.instagram.com/", "https://www.ddinstagram.com/");
    msg.reply(newMessage);
  }*/
});

client.login(token);
