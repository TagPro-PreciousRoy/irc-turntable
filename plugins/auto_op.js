module.exports = function(bot) {
  var irc = bot.irc;
  var config = bot.config;
  var ops = config.irc_ops || [];

  irc.on('raw', function(data) {
    var nick = config.irc_nick;
    var channel = config.irc_channel;

    if(data.command !== 'JOIN' || data.nick == nick)
      return;

    var permissions = irc.chans[channel].users[nick];

    // make sure bot has op
    if(permissions.indexOf('@') === -1)
      return;

    // make sure host is an op
    if(ops.indexOf(data.host) !== -1)
      irc.send('MODE', config.irc_channel, '+o', data.nick);
  })
}
