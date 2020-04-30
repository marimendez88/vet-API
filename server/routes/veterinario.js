const express = require("express");

const _ = require("underscore");

const app = express();
const Veterinario = require("../models/veterinario");

//=========================
//Muestra los veterinarios
//=========================

app.get("/veterinario", (req, res) => {
	let desde = req.query.desde || 0;
	desde = Number(desde);

	let limite = req.query.limite || 5;
	limite = Number(limite);

	//entre '' estan solo los campos que quiero mandar
	Veterinario.find({ estado: true })
		.skip(desde)
		.limit(limite)
		.exec((err, veterinarios) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err,
				});
			}
			Veterinario.countDocuments({ estado: true }, (err, conteo) => {
				res.json({
					ok: true,
					veterinarios,
					cuantos: conteo,
				});
			});
		});
});

//=========================
//Crea una veterinario
//=========================
app.post("/veterinario", function (req, res) {
	let body = req.body;

	let veterinario = new Veterinario({
		nombre: body.nombre,
		apellidos: body.apellidos,
		email: body.email,
		telefono: body.telefono,
		especialidad: body.especialidad,
	});

	veterinario.save((err, veterinarioDB) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err,
			});
		}
		res.json({
			ok: true,
			veterinario: veterinarioDB,
		});
	});
});
//=========================
// Actualiza un veterinario
//=========================
app.put("/veterinario/:id", function (req, res) {
	let id = req.params.id;

	let body = _.pick(req.body, [
		"nombre",
		"apellidos",
		"email",
		"telefono",
		"especialidad",
	]);

	Veterinario.findByIdAndUpdate(
		id,
		body,
		{ new: true, runValidators: true },
		(err, veterinarioDB) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err,
				});
			}

			res.json({
				ok: true,
				veterinario: veterinarioDB,
			});
		},
	);
});
//=========================
// Elimina un veterinario
//=========================
app.delete("/veterinario/:id", function (req, res) {
	let id = req.params.id;

	let cambiaEstado = {
		estado: false,
	};

	Veterinario.findByIdAndUpdate(
		id,
		cambiaEstado,
		{ new: true },
		(err, veterinarioBorrado) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err,
				});
			}
			if (!veterinarioBorrado) {
				return res.status(400).json({
					ok: false,
					err: {
						message: "veterinario no encontrado",
					},
				});
			}
			res.json({
				ok: true,
				veterinario: veterinarioBorrado,
			});
		},
	);
});

//=========================
//Obtener  veterinario por id
//=========================
app.get("/veterinario/:id", (req, res) => {
	let id = req.params.id;
	Veterinario.findById(id, (err, veterinarioBD) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err: {
					message: "Error al buscar el veterinario",
				},
			});
		}
		if (!veterinarioBD) {
			return res.status(400).json({
				ok: false,
				err: {
					message: "Veterinario no encontrado",
				},
			});
		}
		res.json({
			ok: true,
			veterinario: veterinarioBD,
		});
	});
});

module.exports = app;
