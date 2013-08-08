// communication channel
var bot = {};
bot.tt = require('./turntable')(bot)
bot.irc = require('./irc')(bot)

bot.send = function(channel, msg) {
  if(channel === 'tt')
    bot.tt.speak(msg);
  if(channel === 'irc')
    bot.irc.say(process.env.IRC_CHANNEL, msg);
}
