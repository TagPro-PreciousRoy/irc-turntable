module.exports = function(bot) {
  var tt = bot.tt;
  var irc = bot.irc;

  // echo irc chat to turntable
  irc.addListener('message', function(nick, channel, msg) {
    if(nick === bot.config.irc_nick || msg[0] == '!')
      return;
    bot.send('tt', nick+': '+msg);
  })

  irc.addListener('join', function(channel, nick) {
    if(nick === bot.config.irc_nick)
      return;
    bot.send('tt', nick+' has joined '+channel)
  })

  irc.addListener('part', function(channel, nick) {
    if(nick === bot.config.irc_nick)
      return;
    bot.send('tt', nick+' has left '+channel);
  })

  irc.addListener('quit', function(nick) {
    if(nick === bot.config.irc_nick)
      return;
    bot.send('tt', nick+' has quit');
  })

  irc.addListener('kick', function(channel, nick, by, reason) {
    if(nick === bot.config.irc_nick)
      return;
    bot.send('tt', nick+' was kicked by '+by+' for '+reason);
  })
}
