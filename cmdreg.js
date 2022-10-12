const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { cid, token } = require('./config.json');
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./cmds/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);
rest.put(Routes.applicationCommands(cid), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
