const express = require("express");

const _ = require("underscore");

const app = express();
const Cita = require("../models/cita");

const f = new Date();

//=========================
//Muestra los citas
//=========================

app.get("/cita", (req, res) => {
	let desde = req.query.desde || 0;
	desde = Number(desde);

	let limite = req.query.limite || 5;
	limite = Number(limite);

	//entre '' estan solo los campos que quiero mandar
	Cita.find({ estado: true })
		.skip(desde)
		.limit(limite)
		.populate("mascota", "nombre ")
		.exec((err, citas) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err,
				});
			}
			Cita.countDocuments({ estado: true }, (err, conteo) => {
				res.json({
					ok: true,
					citas,
					cuantos: conteo,
				});
			});
		});
});

//=========================
//Busca una cita por ID
//=========================

app.get("/cita/:id", (req, res) => {
	let id = req.params.id;

	Cita.findById(id)
		.populate("mascota", "nombre")
		.exec((err, citaBD) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err,
				});
			}
			if (!citaBD) {
				return res.status(400).json({
					ok: false,
					err: {
						message: "cita no encontrada",
					},
				});
			}
			res.json({
				ok: true,
				cita: citaBD,
			});
		});
});

//=========================
//Muestra los citas de una misma mascota
//=========================

app.get("/cita/mascota/:id", (req, res) => {
	let desde = req.query.desde || 0;
	desde = Number(desde);

	let limite = req.query.limite || 5;
	limite = Number(limite);

	let mascota = req.params.id;

	//entre '' estan solo los campos que quiero mandar
	Cita.find({ estado: true, mascota: mascota })
		.skip(desde)
		.limit(limite)
		.populate("mascota", "nombre")
		.populate("veterinario", "nombre apellidos")
		.exec((err, citas) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err,
				});
			}
			Cita.countDocuments({ estado: true, mascota: mascota }, (err, conteo) => {
				res.json({
					ok: true,
					citas,
					cuantos: conteo,
				});
			});
		});
});

//=========================
//Muestra los citas de un mismo veterinario
//=========================

app.get("/cita/veterinario/:id", (req, res) => {
	let desde = req.query.desde || 0;
	desde = Number(desde);

	let limite = req.query.limite || 5;
	limite = Number(limite);

	let veterinario = req.params.id;

	//entre '' estan solo los campos que quiero mandar
	Cita.find({ estado: true, veterinario: veterinario })
		.skip(desde)
		.limit(limite)
		.populate("veterinario", "nombre apellidos")
		.populate("mascota", "nombre")
		.exec((err, citas) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err,
				});
			}
			Cita.countDocuments(
				{ estado: true, veterinario: veterinario },
				(err, conteo) => {
					res.json({
						ok: true,
						citas,
						cuantos: conteo,
					});
				},
			);
		});
});

//=========================
//Crea una cita
//=========================
app.post("/cita", function (req, res) {
	let body = req.body;

	// return console.log(Date.parse(fecha));
	let cita = new Cita({
		detalle: body.detalle,
		fecha: body.fecha,
		hora: body.hora,
		veterinario: body.veterinario,
		mascota: body.mascota,
	});

	cita.save((err, citaDB) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err,
			});
		}
		res.json({
			ok: true,
			cita: citaDB,
		});
	});
});

module.exports = app;
