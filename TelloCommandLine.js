/*
    Based On
    
	Rzye Tello
	
	Scratch Ext 1.0.0.0

	http://www.ryzerobotics.com

	1/1/2018
*/

const readline = require('readline'),
  rl = readline.createInterface(process.stdin, process.stdout),
  prefix = 'Drona> ';


var PORT = 8889;
var HOST = '192.168.10.1';

const dgram = require('dgram');
const client = dgram.createSocket('udp4');

client.bind(8001);

client.on('message', (msg,info) => {
	console.log('Date receptionate de la server : ' + msg.toString());
	rl.prompt();
});								


console.log('|--------------------------------------------------|');
console.log('| Consola Comanda Drona - Creeata de Cogian Sergiu |');
console.log('|--------------------------------------------------|');

rl.on('line', (input) => {
  commandStr = input.trim();
  switch(commandStr) {
    case 'quit':
	  client.close();
	  rl.close();
      break;
    default:
      console.log(`Comanda executata: ${commandStr}`);
      client.send(commandStr, 0, commandStr.length, PORT, HOST, function(err, bytes) {
		  if (err) throw err;
		});
      break;
  }
}).on('close', function() {
  console.log('La Revedere!');
  process.exit(0);
});
console.log(prefix + 'Introduceti comenzile aici, pentru a incepe introduceti "command".');
rl.setPrompt(prefix, prefix.length);
rl.prompt();

