module.exports = function(bot) {
  var irc = require('irc')
  var config = bot.config;

  var nick    = config.irc_nick     = process.env.IRC_NICK;
  var server  = config.irc_server   = process.env.IRC_SERVER;
  var channel = config.irc_channel  = process.env.IRC_CHANNEL;

  config.irc_ops = process.env.IRC_OPS.split(',')

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
}

