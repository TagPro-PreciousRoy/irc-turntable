var irc = require('irc')
var bot = global.bot
var config = bot.config;

var nick    = config.irc_nick;
var server  = config.irc_server;
var channel = config.irc_channel;

bot.irc = new irc.Client(server, nick, {channels: [channel]});

bot.irc.addListener('error', function(msg) {
  console.log(msg);
})

// irc command parser
bot.irc.addListener('message', function(name, channel, text) {
  if(name === nick)
    return;

  var raw = {channel: channel, name: name, text: text};
  bot.command(text, 'irc', raw)
})

