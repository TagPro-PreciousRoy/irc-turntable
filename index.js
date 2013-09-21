var bot = global.bot = {}
var config = bot.config = require('./config');
bot.commands = {}

require('./lib/turntable');
require('./lib/irc');
require('./lib/bot');

// load plugins
var plugins = config.plugins;
plugins.forEach(function(plugin) {
  require('./plugins/'+plugin);
})
