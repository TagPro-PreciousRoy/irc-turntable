module.exports = function(bot) {
  var Turntable = require('ttapi');

  var AUTH = process.env.TT_AUTH;
  var USERID = process.env.TT_USERID;
  var ROOMID = process.env.TT_ROOMID;

  var tt = new Turntable(AUTH, USERID, ROOMID);

  tt.on('speak', function(data) {
    if(data.name === 'tagpro-tt') // should use env variable for botname
      return;
    bot.send('irc', data.name+': '+data.text);
  });

  tt.on('newsong', function() {
    tt.bop();
  })

  tt.on('registered', function(data) {
    var user = data.user[0];
    var green = '\x0009';
    bot.send('irc', green+user.name+' has joined tt.fm/tagpro')
  })

  tt.on('deregistered', function(data) {
    var user = data.user[0];
    var red = '\x0004';
    bot.send('irc', red+user.name+' has left tt.fm/tagpro')
  })

  return tt;
}
