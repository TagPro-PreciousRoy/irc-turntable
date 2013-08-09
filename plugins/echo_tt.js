module.exports = function(bot) {
  var tt = bot.tt;
  var irc = bot.irc;

  // echo turntable chat to irc
  tt.on('speak', function(data) {
    if(data.name == bot.config.tt_name || data.text[0] == '!')
      return;
    bot.send('irc', data.name+': '+data.text);
  })

  // echo turtable joins to irc
  tt.on('registered', function(data) {
    var user = data.user[0].name;
    var green = '\u000303'
    bot.send('irc', green+user+' has joined tt.fm/tagpro');
  })

  // echo turntable parts to irc
  tt.on('deregistered', function(data) {
    var user = data.user[0].name;
    var red = '\u000304'
    bot.send('irc', red+user+' has left tt.fm/tagpro');
  })
}
