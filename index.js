const prompt = require('prompt-sync')({ sigint: true });
const Database = require('./Database');
const Transaction = require('./Transaction');

// const DB = new Database();
const DB = new Transaction();
 
while (true) {
  let [command, key, value] = prompt().trim().split(' ');

  if (command === 'END') break;

  if (value) {
    value = isNaN(value) ? value : parseInt(value);
  }

  let result = DB[command.toLowerCase()](key, value);
  result !== undefined && console.log(result);
}
