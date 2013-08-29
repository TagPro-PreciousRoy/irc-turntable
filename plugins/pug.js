var bot = global.bot;
var irc = bot.irc;
var tt = bot.tt;
var commands = bot.commands;

var timer = 6e4 * 20; // 20 minute timer
var last = Date.now() - (timer + 1000); // all good

commands['tt_pug'] = pug;
commands['irc_pug'] = pug;

function pug(data) {
  if(!data.text.match(/^!pug\b/i))
    return;

  if(Date.now() - last < timer)
    return;

  last = Date.now();

  var args = data.text.split(' ').slice(1);

  getUsers(function(users) {
    var msg = users.join(', ') + ' ' + args.join(' ');
    bot.send('irc', msg);
    bot.send('tt', msg);
  });
}

getUsers = function(callback) {
  var irc_users;
  var tt_users;

  irc.on('names'+bot.config.irc_channel, irc_names);
  irc.send('NAMES', bot.config.irc_channel)

  function irc_names(names) {
    // cleanup
    irc.removeListener('names'+bot.config.irc_channel, irc_names);

    irc_users = Object.keys(names);
    if(tt_users !== undefined)
      callback(tt_users.concat(irc_users));
  };


  tt.roomInfo(function(room) {
    tt_users = room.users.map(function(user) {
      return '@'+user.name;
    });

    if(irc_users !== undefined)
      callback(irc_users.concat(tt_users));
  })
}
