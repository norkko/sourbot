const Discord = require('discord.js');
const opus = require('node-opus');

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
  });
 
  client.on('message', msg => {
    if (msg.content === 'ping') {
    msg.reply('pong');
  }
});
  
client.login('');