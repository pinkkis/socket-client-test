const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const app = express();
app.set('port', 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	return res.json({foo: 'bar'});
});

/////

const server = http.createServer(app);
const wss = new WebSocket.Server({server});
const game = require('./socketServer')(wss);

//////

server.listen(app.get('port'));
server.on('listening', onListening);

function onListening() {
	let addr = server.address();
	let bind = typeof addr === 'string'
	  ? 'pipe ' + addr
	  : 'port ' + addr.port;
	console.log('Listening on ' + bind);
  }

//