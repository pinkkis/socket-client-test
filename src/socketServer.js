module.exports = (wss) => {
	wss.on('connect', (socket) => {
		console.log('connect');
		socket.on('message', (message) => {
			console.log(message);
		});
	});
};
