'use strict';

const Discord = require('discord.js');
const opus = require('node-opus');
const ytdl = require('ytdl-core-discord');
const client = new Discord.Client();

require('dotenv').config();

client.on('ready', () => {
  client.user.setActivity('TRIHARD 7');
});

client.on('message', async message => {
  if (!message.guild) return;
  if (message.author.bot) return;
  if (message.content.includes(';play')) {
    if (message.member.voiceChannel) {
      message.member.voiceChannel.leave();
      await message.member.voiceChannel.join()
        .then(connection => {
          const url = message.member.lastMessage.content.slice(6);
          if (!(url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/))) {
            message.reply('Youtube links supported only. ;play <youtube-url>')
            return;
          } else {
            console.log('. Playing ' + url);
            message.channel.send('playing: ' + url);
            play(connection, url);
          }          
        }).catch(console.log);
    } else {
      message.reply('Join a voice channel first.');
    }
  }

  if (message.content.includes(';stop')) {
    if (message.member.voiceChannel) {
      message.member.voiceChannel.leave();
    }
  }
});

async function play(connection, url) {
  connection.playOpusStream(await ytdl(url));
}

client.login(process.env.TOKEN);
