var tt = global.bot.tt;
var bopped = false;

tt.on('newsong', function() {
  bopped = false;
})

tt.on('update_votes', function(d) {
  if(bopped || d.room.metadata.upvotes < 1)
    return;

  // vote_up in the next minute
  var timer = Math.floor(Math.random() * 6e4);
  setTimeout(vote_up, timer);
}

function vote_up() {
  bopped = true;
  tt.bop();
}
