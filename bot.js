const Discord = require('discord.js');
const client = new Discord.Client();
var auth = require('./auth.json');
var images = require('./assets/images.json');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if (!message.author.equals(client.user)) {

    var prefix = 'sticker!';
    var msg = message.content;
  
    if (msg.substring(0, 8).toLowerCase() === prefix) {
      var suffix = msg.substring(8).toLowerCase();
  
      if (images.hasOwnProperty(suffix)) {
        var stickerPath = './assets/' + images[suffix];
        var sticker = new Discord.Attachment(stickerPath);
  
        message.channel.send(sticker);
      } else if (suffix === 'help') {
        var helpMsg =
          'Sticker![sticker] or sticker![sticker]  →  Posts a sticker to the channel (case insensitive)\n\n' +
          'Type Sticker!help to get a list of all available stickers\n\n' +
          'Available stickers:\n';
  
        for (var stickerName in images) {
          helpMsg += stickerName + ', ';
        }
        helpMsg = helpMsg.substring(0, helpMsg.length - 2);
  
        message.channel.send(helpMsg);
      }
    }
  }
});

client.login(auth.token);
