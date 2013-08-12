module.exports = function(bot) {
  var commands = bot.commands;
  var tt = bot.tt;

  // in irc !np will display currently playing song
  commands['irc_np'] = function(data) {
    if(!data.text.match(/^!np$/))
        return;

      var msg = 'NOW PLAYING: ';
      tt.roomInfo(function(roomInfo) {
        var song = roomInfo.room.metadata.current_song;

        // nothing playing
        if(song === null)
          return bot.send('irc', msg + 'There are no songs playing');

        var metadata = song.metadata;
        var bold = '\x02';
        var reset = '\x0f';

        msg += bold + metadata.song + reset
            + ' by '+ bold + metadata.artist + reset;

        bot.send('irc', msg);
      })
  }
}
