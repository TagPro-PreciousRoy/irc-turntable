module.exports = function(bot) {
  var config = bot.config;

  bot.send = function(channel, msg) {
    if(channel === 'tt')
      bot.tt.speak(msg);
    if(channel === 'irc')
      bot.irc.say(config.irc_channel, msg);
  }

  // parse msg for commands
  bot.command = function(msg, origin, raw) {
    if(msg[0] !== '!')
      return;

    // first word is command
    var cmd = msg.slice(1).split(' ')[0];

    // namespace command
    cmd = origin+'_'+cmd;

    var cmds = Object.keys(bot.commands);
    if(cmds.indexOf(cmd) !== -1)
      bot.commands[cmd](raw);
  }
}

