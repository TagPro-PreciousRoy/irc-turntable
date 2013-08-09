module.exports = function(bot) {
  var tt = bot.tt;

  // autobop
  tt.on('newsong', function() {
    tt.bop();
  })
}
