module.exports = function(bot) {
  var commands = bot.commands;
  var tt = bot.tt;

  // in irc !np will display currently playing song
  commands['irc_np'] = function(data) {
    if(!data.text.match(/^!np$/))
        return;

      var msg = 'NOW PLAYING: ';
      tt.roomInfo(function(roomInfo) {

        var metadata = roomInfo.room.metadata.current_song.metadata;

        msg += metadata.song + ' by ' + metadata.artist;
        bot.send('irc', msg);
      })
  }
}
