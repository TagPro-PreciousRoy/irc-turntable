module.exports = function(bot) {
  var irc = require('irc')

  var NICK = process.env.IRC_NICK;
  var SERVER = process.env.IRC_SERVER;
  var CHANNEL = process.env.IRC_CHANNEL;

  var client = new irc.Client(SERVER, NICK, {channels: [CHANNEL]});

  client.addListener('error', function(msg) {
    console.log('Error: ', msg);
  })

  client.addListener('message'+CHANNEL, function(from, msg) {
    if(from === NICK)
      return;
    bot.send('tt', from+': '+msg)
  })

  client.addListener('join'+CHANNEL, function(nick) {
    if(nick === NICK)
      return;
    bot.send('tt', nick+' has joined '+CHANNEL)
  })

  client.addListener('part'+CHANNEL, function(nick) {
    if(nick === NICK)
      return;
    bot.send('tt', nick+' has left '+CHANNEL);
  })

  return client;
}
