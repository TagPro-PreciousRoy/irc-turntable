module.exports = function(bot) {
  var commands = bot.commands;
  var tt = bot.tt;

  // in irc !users will list all users in turntable
  commands['irc_users'] = function(data) {
    if(!data.text.match(/^!users$/))
        return;

      var msg = 'USERS: ';
      tt.roomInfo(function(room) {

        var users = room.users.map(function(user) { 
          return user.name; 
        });

        msg += users.join(', ');
        bot.send('irc', msg)
      })
  }
}
