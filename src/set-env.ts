import { writeFile } from 'file-system';
import { argv } from 'yargs';


const environment = argv.environment;
const spark_url = environment[0];
const bot_url = environment[1];

const targetPath = `./src/app/config/config.ts`;
const envConfigFile = `
export var GLOBAL = {
  module: 'admin-bot',
  token_prefix: 'bot',  
  spark_url: '${spark_url}',
  bot_url: '${bot_url}',
  components: ['messages', 'topics', 'home', 'notifications', 'splash']
};`;

console.log('archivo: ',envConfigFile);

writeFile(targetPath, envConfigFile, function (err) {
    if (err) {
      console.log(err);
    }
  
    console.log(`Output generated at ${targetPath}`);
  });