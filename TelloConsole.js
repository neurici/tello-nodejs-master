/*
    Based On
    
	Rzye Tello
	
	Scratch Ext 1.0.0.0

	http://www.ryzerobotics.com

	1/1/2018
*/

const got = require('got');
const eol = require('os').EOL;
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

var dataToTrack_keys = ["battery", "x", "y", "z", "speed"];
var lastDataReceived = null;

var fs = require('fs');

var PORT = 8889;
var HOST = '192.168.10.1';

const dgram = require('dgram');
const client = dgram.createSocket('udp4');

client.bind(8001);

function respondToPoll(response){

    var noDataReceived = false;

    var resp = "";
    var i;
    for (i = 0; i < dataToTrack_keys.length; i++){
        resp += dataToTrack_keys[i] + " ";
        resp += (i+10);
		resp += "\n";
    }
    response.end(resp);
}

function CommandRequest(){

	var message = new Buffer('command');

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		if (err) throw err;
	});
	
	client.on('message', (msg,info) => {
		console.log('Mesaj receptionat de la server : ' + msg.toString());
		console.log('Receptionat %d biti de la %s:%d\n',msg.length, info.address, info.port);
	});								
	
}

function TakeoffRequest(){
	
	var message = new Buffer('takeoff');

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		if (err) throw err;
	});
}

function LandRequest(){

	var message = new Buffer('land');

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		if (err) throw err;
	});
}

function sendCommand (telloCommand) {

	  switch (telloCommand){
		
        case 'poll':
            respondToPoll(response);
            break;
		
        case 'command':
			console.log('command');
			CommandRequest();
		break;
		
        case 'takeoff':
			console.log('takeoff');
			TakeoffRequest();
		break;
		
        case 'land':
			console.log('land');
			LandRequest();
		break;
		
        case 'up':
			dis = 60;
			console.log('up ' + dis);
			var message = new Buffer( 'up '+ dis );
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});
		break;

        case 'down':
			dis = 60;
			console.log('down ' + dis);
			var message = new Buffer( 'down '+ dis );
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});			
		break;

        case 'left':
			dis = 100;
			console.log('left ' + dis);
			var message = new Buffer( 'left '+ dis );
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});
		break;

        case 'right':
			dis = 100;
			console.log('right ' + dis);
			var message = new Buffer( 'right '+ dis );
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});
		break;		
		
		case 'forward':
			dis = 100;
			console.log('forward ' + dis);
			var message = new Buffer( 'forward '+ dis );
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});			
		break;		
		
        case 'back':
			dis = 100;
			console.log('back ' + dis);
			var message = new Buffer( 'back '+ dis );
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});			
		break;

        case 'cw':
			dis = 90;
			console.log('cw ' + dis);
			var message = new Buffer( 'cw '+ dis );
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});
		break;

		case 'flip':
			dis = 'f';
			console.log('flip ' + dis);
			var message = new Buffer( 'flip '+ dis );
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});			
		break;	

		case 'ccw':
			dis = 360;
			console.log('ccw ' + dis);
			var message = new Buffer( 'ccw '+ dis );
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;	
			});
		break;		
		
		case 'battery?':
			console.log('battery strength?');
			var message = new Buffer( 'battery?');
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;	
			});
		break;		
		
		case 'time?':
			console.log('flight time?');
			var message = new Buffer( 'time?');
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;	
			});
		break;		
		
		case 'speed?':
			console.log('current speed?');
			var message = new Buffer( 'speed?');
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;	
			});
		break;		
		
		case 'setspeed':
			dis = 20;
			console.log('setspeed ' + dis);
			var message = new Buffer( 'speed '+ dis );
			client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
				if (err) throw err;
			});			
		break;				
			
	  }
}

const keyMap = new Map();
keyMap.set('h', 'help');
keyMap.set('c', 'command');
keyMap.set('t', 'takeoff');
keyMap.set('l', 'land');
keyMap.set('w', 'forward');
keyMap.set('s', 'back');
keyMap.set('a', 'left');
keyMap.set('d', 'right');
keyMap.set('q', 'up');
keyMap.set('e', 'down');
keyMap.set('f', 'cw');
keyMap.set('g', 'ccw');
keyMap.set('u', 'battery?');
keyMap.set('i', 'time?');
keyMap.set('o', 'speed?');
keyMap.set('p', 'flip');

function listKeys() {
  console.log(`${eol}Taste`);
  keyMap.forEach((value, key) => {
    console.log(`${key} - ${value}`);
  });
  console.log();
}
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    client.close()
    process.exit(); // eslint-disable-line no-process-exit
  } else if (key.name === 'h') {
    listKeys();
  } else {
    if (keyMap.has(str)) {
      sendCommand(keyMap.get(str));
    } else {
      console.log(`Nu a fost definita nici o comanda pentru tasta "${str}"`);
    }
  }
});


console.log('|------------------------------------------------------|');
console.log('|   Consola Comanda Drona - Creeata de Cogian Sergiu   |');
console.log('|------------------------------------------------------|');
console.log('| Apasa o tasta pentru a trimite o comanda catre drona |');
console.log('|------------------------------------------------------|');

listKeys();