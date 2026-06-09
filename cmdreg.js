const fs = require('node:fs');
const c = require('ansis');
const { REST, Routes } = require('discord.js');
const { cid, token } = require('./config.json');

const commands = [];
const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./cmds/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST().setToken(token);
rest.put(Routes.applicationCommands(cid), { body: commands })
  .then(() => {
    console.log(c.green.bold`Successfully registered application commands.\n`);
    console.log(c.cyan`List of commands:`);
    commands.forEach(cmd => console.log(`${c.cyan`-`} ${c.yellow(cmd.name)}: ${cmd.description}`));
  })
  .catch(console.error);
