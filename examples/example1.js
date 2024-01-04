import { Client, Express } from '../main.js';
const bot = new Client();
const exp = new Express();

bot.connect('ApiTesting', 'APIKey').then(() => {
  exp.routeResponse("/","testing")
  bot.defaultAdminCommandsTemplate("38713IA1ZZ1M964ASIAIA4296H2496JI","apit#","Testing",exp,false);
}).catch((error) => {
  console.error('Error connecting to the bot:', error);
});
exp.start();