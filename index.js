var bot = global.bot = {}
bot.config = {}
bot.commands = {}

require('./lib/turntable');
require('./lib/irc');
require('./lib/bot');

// load plugins
var plugins = bot.config.plugins = process.env.BOT_PLUGINS.split(',');
plugins.forEach(function(plugin) {
  require('./plugins/'+plugin);
})
