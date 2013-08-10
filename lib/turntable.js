module.exports = function(bot) {
  var Turntable = require('ttapi');
  var config = bot.config;

  var auth    = config.tt_auth    = process.env.TT_AUTH;
  var userid  = config.tt_userid  = process.env.TT_USERID;
  var roomid  = config.tt_roomid  = process.env.TT_ROOMID;
  var name    = config.tt_name    = process.env.TT_NAME;

  bot.tt = new Turntable(auth, userid, roomid);

  bot.tt.on('speak', function(data) {
    if(data.name === name)
      return;

    bot.command(data.text, 'tt', data)
  })
}
