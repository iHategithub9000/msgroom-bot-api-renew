import { Client, Express, botParser} from '../main.js';
const bot = new Client();
const exp = new Express();
const par = new Parser();


bot.connect('ApiTesting', null, 'https://msgroom.boomlings.xyz',true).then(() => {
  exp.routeResponse("/","testing")
  bot.defaultAdminCommandsTemplate("77851DAFFF212F29273CED156CBFCF03","apit#","Testing",exp);
  bot.command("apit#parsethis",()=>{
    par.parseArguments();
  })
}).catch((error) => {
  console.error('Error connecting to the bot:', error);
});
exp.start();