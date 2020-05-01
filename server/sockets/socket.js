const { io } = require("../server");
const socketIO = require("socket.io");

let online = 0;

io.on("connection", (socketIO) => {
	online++;
	// console.log(`socketIO ${socketIO.id} connected.`);
	console.log(`Online: ${online}`);
	io.emit("visitor enters", online);

	socketIO.on("disconnect", () => {
		online--;
		console.log(`socketIO ${socketIO.id} disconnected.`);
		console.log(`Online: ${online}`);
		io.emit("visitor exits", online);
	});
});

module.exports = {};
