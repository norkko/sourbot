const Discord = require('discord.js');
const opus = require('node-opus');
const ytdl = require('ytdl-core-discord');
const client = new Discord.Client();

client.on('message', message => {
  if (!message.guild) return;
  if (message.content.includes(';;play')) {
    if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection => {
          message.reply('connected to channel: ' + message.member.voiceChannel.name);
          const url = message.member.lastMessage.content.slice(6);
          play(connection, url);
        }).catch(console.log);
    } else {
      message.reply('Join a voice channel first.');
    }
  }

  if (message.content.includes(';;stop')) {
    if (message.member.voiceChannel) {
      message.member.voiceChannel.leave();
    }
  }
});

async function play(connection, url) {
  connection.playOpusStream(await ytdl(url));
}

client.login('');
