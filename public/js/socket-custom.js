var socket = io();

socket.on("connect", function () {
	console.log("Conectado al servidor");

	//Cliente Nuevo
	socket.on("clienteNuevo", function (cliente) {
		console.log(cliente);
	});

	//Cliente Actualizado
	socket.on("clienteActualizado", function (cliente) {
		console.log(cliente);
	});
	//Cliente Eliminado
	socket.on("clienteEliminado", function (cliente) {
		console.log(cliente);
	});

	//Mascota Nuevo
	socket.on("mascotaNuevo", function (mascota) {
		console.log(mascota);
	});

	//mascota Actualizado
	socket.on("mascotaActualizado", function (mascota) {
		console.log(mascota);
	});
	//mascota Eliminado
	socket.on("mascotaEliminado", function (mascota) {
		console.log(mascota);
	});
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
