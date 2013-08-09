var bot = {
  config: {},
  commands: {}
};

require('./lib/turntable')(bot);
require('./lib/irc')(bot);
require('./lib/bot')(bot);

// load plugins
var plugins = bot.config.plugins = process.env.BOT_PLUGINS.split(',');
plugins.forEach(function(plugin) {
  require('./plugins/'+plugin)(bot);
})
