var bot = global.bot;
var irc = bot.irc;
var config = bot.config
var commands = bot.commands;
var users = {};

commands['tt_users'] = function(data) {
  if(!data.text.match(/^!users$/))
    return;

  var msg = 'USERS: '
  msg += Object.keys(users[config.irc_channel]).join(', ');
  bot.send('tt', msg)
}

irc.on('names', function(channel, nicks) {
  users[channel] = nicks;
  console.log(users)
})

irc.on('join', addNick)
irc.on('part', removeNick)
irc.on('kick', removeNick)
irc.on('nick', function(oldNick, newNick, channels) {
  channels.forEach(function(channel) {
    removeNick(channel, oldNick);
    addNick(channel, newNick);
  })
})
irc.on('quit', function(nick, reason, channels) {
  channels.forEach(function(channel) {
    removeNick(channel, nick);
  })
})

function removeNick(channel, nick) {
  delete users[channel][nick];
}

function addNick(channel, nick) {
  if(nick == config.irc_nick) return;
  users[channel][nick] = ''
}
