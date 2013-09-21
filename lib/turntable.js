var Turntable = require('ttapi');
var bot = global.bot;
var config = bot.config;

var auth    = config.tt_auth;
var userid  = config.tt_userid;
var roomid  = config.tt_roomid;
var name    = config.tt_name;

var tt = bot.tt = new Turntable(auth, userid);

tt.on('speak', function(data) {
  if(data.name === name)
    return;

  bot.command(data.text, 'tt', data)
})

// auto-reconnect
var connected = false;

tt.on('ready', function(data){ connect(roomid); })
tt.on('disconnected', function(e) {
  // ignore event - we already know we're !connected
  if(!connected)
    return;

  connected = false;

  // attempt to connect in 10 seconds
  setTimeout(connect, 10 * 1000, roomid);
})

function connect(room) {
  tt.roomRegister(room, function(data) {
    // failed to connect - try again in 1 minute
    if(!data || !data.success)
      return setTimeout(connect, 60 * 1000, room);

    connected = true;
  });
}

// log errors
tt.on('error', function(e) {
  console.log(e);
})
