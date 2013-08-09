var bot = {};
var config = bot.config = {};
var commands = bot.commands = {};

// turntable
var Turntable = require('ttapi');

var AUTH    = config.tt_auth    = process.env.TT_AUTH;
var USERID  = config.tt_userid  = process.env.TT_USERID;
var ROOMID  = config.tt_roomid  = process.env.TT_ROOMID;

bot.tt = new Turntable(AUTH, USERID, ROOMID);

// irc
var irc = require('irc')

var NICK    = config.irc_nick     = process.env.IRC_NICK;
var SERVER  = config.irc_server   = process.env.IRC_SERVER;
var CHANNEL = config.irc_channel  = process.env.IRC_CHANNEL;

bot.irc = new irc.Client(SERVER, NICK, {channels: [CHANNEL]});

bot.irc.addListener('error', function(msg) {
  console.log(msg);
})

// irc command parser
bot.irc.addListener('message', function(name, channel, text) {
  if(name === bot.config.irc_nick)
    return;

  var raw = {channel: channel, name: name, text: text};
  bot.command(text, 'irc', raw)
})

bot.send = function(channel, msg) {
  if(channel === 'tt')
    bot.tt.speak(msg);
  if(channel === 'irc')
    bot.irc.say(process.env.IRC_CHANNEL, msg);
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

// load plugins
var plugins = ['echo_tt', 'echo_irc', 'autobop', 'irc_users'];
plugins.forEach(function(plugin) {
  require('./plugins/'+plugin)(bot);
})
