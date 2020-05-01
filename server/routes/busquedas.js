const express = require("express");

const _ = require("underscore");

const Cliente = require("../models/cliente");
const Veterinario = require("../models/veterinario");
const Mascota = require("../models/mascota");

const app = express();

//=========================
// Buscar los por medio de termino
//=========================
app.get("/buscar/:termino", (req, res) => {
	let termino = req.params.termino;
	let regEx = new RegExp(termino, "i");
	let respuesta;
	let status = false;

	Cliente.findOne({ nombre: regEx }).exec((err, clienteBD) => {
		if (err) {
			respuesta = err;
		}
		if (clienteBD) {
			status = true;
			respuesta = clienteBD;
			res.json({
				ok: true,
				mensaje: respuesta,
			});
		} else {
			Veterinario.findOne({ nombre: regEx }).exec((err, veterinarioBD) => {
				if (err) {
					respuesta = err;
				}
				if (veterinarioBD) {
					status = true;
					respuesta = veterinarioBD;
					res.json({
						ok: true,
						mensaje: respuesta,
					});
				} else {
					Mascota.find({ nombre: regEx }).exec((err, mascotaBD) => {
						if (err) {
							respuesta = err;
						}
						if (mascotaBD) {
							respuesta = mascotaBD;
							status = true;
							if (respuesta.length === 0) {
								respuesta[0] = "No hay registros";
								status = false;
							}
							res.json({
								ok: status,
								mensaje: respuesta[0],
							});
						}
					});
				}
			});
		}
	});
});

//=========================
// Buscar el cliente por medio del id
//=========================
app.get("/buscar/cliente/:id", (req, res) => {});

module.exports = app;
