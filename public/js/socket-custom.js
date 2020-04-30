var socket = io();

socket.on("connect", function () {
	console.log("Conectado al servidor");
});

socket.on("disconnect", function () {
	console.log("Perdimos conexión c on el servidor");
});

//Emit es para enviar informacion
socket.emit(
	"enviarMensaje",
	{
		usuario: "Maria Jose",
		mensaje: "test",
	},
	function (resp) {
		console.log("Respuesta server:", resp);
	},
);
//escuchar informacion
socket.on("enviarMensaje", function (mensaje) {
	console.log("Servidor: ", mensaje);
});
