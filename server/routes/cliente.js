const express = require("express");

const _ = require("underscore");

const app = express();
const Cliente = require("../models/cliente");

//=========================
//Muestra los clientes
//=========================

app.get("/cliente", (req, res) => {
	let desde = req.query.desde || 0;
	desde = Number(desde);

	let limite = req.query.limite || 5;
	limite = Number(limite);

	//entre '' estan solo los campos que quiero mandar
	Cliente.find({ estado: true })
		.skip(desde)
		.limit(limite)
		.exec((err, clientes) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err,
				});
			}
			Cliente.countDocuments({ estado: true }, (err, conteo) => {
				res.json({
					ok: true,
					clientes,
					cuantos: conteo,
				});
			});
		});
});

//=========================
//Crea una cliente
//=========================
app.post("/cliente", function (req, res) {
	let body = req.body;

	let cliente = new Cliente({
		nombre: body.nombre,
		apellidos: body.apellidos,
		email: body.email,
		telefono: body.telefono,
	});

	cliente.save((err, clienteDB) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err,
			});
		}
		res.json({
			ok: true,
			cliente: clienteDB,
		});
	});
});
//=========================
// Actualiza un cliente
//=========================
app.put("/cliente/:id", function (req, res) {
	let id = req.params.id;

	let body = _.pick(req.body, ["nombre", "apellidos", "email", "telefono"]);

	Cliente.findByIdAndUpdate(
		id,
		body,
		{ new: true, runValidators: true },
		(err, clienteDB) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err,
				});
			}

			res.json({
				ok: true,
				cliente: clienteDB,
			});
		},
	);
});
//=========================
// Elimina un cliente
//=========================
app.delete("/cliente/:id", function (req, res) {
	let id = req.params.id;

	let cambiaEstado = {
		estado: false,
	};

	Cliente.findByIdAndUpdate(
		id,
		cambiaEstado,
		{ new: true },
		(err, clienteBorrado) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err,
				});
			}
			if (!clienteBorrado) {
				return res.status(400).json({
					ok: false,
					err: {
						message: "Cliente no encontrado",
					},
				});
			}
			res.json({
				ok: true,
				cliente: clienteBorrado,
			});
		},
	);
});

//=========================
//Obtener  cliente por id
//=========================
app.get("/cliente/:id", (req, res) => {
	let id = req.params.id;
	Cliente.findById(id, (err, clienteBD) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err: {
					message: "Error al buscar el cliente",
				},
			});
		}
		if (!clienteBD) {
			return res.status(400).json({
				ok: false,
				err: {
					message: "cliente no encontrada",
				},
			});
		}
		res.json({
			ok: true,
			cliente: clienteBD,
		});
	});
	// .populate('suario', 'nombre email')
	// .populate('categoria', 'descripcion');
	//Populate:Usuario y categoria
});

module.exports = app;
