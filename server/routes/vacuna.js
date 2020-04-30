const express = require("express");

const _ = require("underscore");

const app = express();
const Vacuna = require("../models/vacuna");

const f = new Date();

//=========================
//Muestra los vacunas
//=========================

app.get("/vacuna", (req, res) => {
	let desde = req.query.desde || 0;
	desde = Number(desde);

	let limite = req.query.limite || 5;
	limite = Number(limite);

	//entre '' estan solo los campos que quiero mandar
	Vacuna.find({ estado: true })
		.skip(desde)
		.limit(limite)
		.populate("mascota", "nombre ")
		.exec((err, vacunas) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err,
				});
			}
			Vacuna.countDocuments({ estado: true }, (err, conteo) => {
				res.json({
					ok: true,
					vacunas,
					cuantos: conteo,
				});
			});
		});
});

//=========================
//Busca una vacuna por ID
//=========================

app.get("/vacuna/:id", (req, res) => {
	let id = req.params.id;

	Vacuna.findById(id)
		.populate("mascota", "nombre")
		.exec((err, vacunaBD) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err,
				});
			}
			if (!vacunaBD) {
				return res.status(400).json({
					ok: false,
					err: {
						message: "vacuna no encontrada",
					},
				});
			}
			res.json({
				ok: true,
				vacuna: vacunaBD,
			});
		});
});

//=========================
//Muestra los vacunas de una misma mascota
//=========================

app.get("/vacuna/mascota/:id", (req, res) => {
	let desde = req.query.desde || 0;
	desde = Number(desde);

	let limite = req.query.limite || 5;
	limite = Number(limite);

	let mascota = req.params.id;

	//entre '' estan solo los campos que quiero mandar
	Vacuna.find({ estado: true, mascota: mascota })
		.skip(desde)
		.limit(limite)
		.populate("mascota", "nombre")
		.exec((err, vacunas) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err,
				});
			}
			Vacuna.countDocuments(
				{ estado: true, mascota: mascota },
				(err, conteo) => {
					res.json({
						ok: true,
						vacunas,
						cuantos: conteo,
					});
				},
			);
		});
});

//=========================
//Crea una vacuna
//=========================
app.post("/vacuna", function (req, res) {
	let body = req.body;

	let fecha = `${f.getDay()}/${f.getMonth()}/${f.getFullYear()}`;
	let hora = `${f.getHours()}:${f.getMinutes()}`;

	// return console.log(Date.parse(fecha));
	let vacuna = new Vacuna({
		nombre: body.nombre,
		fecha: fecha,
		hora: hora,
		mascota: body.mascota,
	});

	vacuna.save((err, vacunaDB) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err,
			});
		}
		res.json({
			ok: true,
			vacuna: vacunaDB,
		});
	});
});
//=========================
// Actualiza un vacuna por id
//=========================
app.put("/vacuna/:id", function (req, res) {
	let id = req.params.id;

	let body = _.pick(req.body, ["nombre"]);

	console.log(body);
	Vacuna.findByIdAndUpdate(
		id,
		body,
		{ new: true, runValidators: true },
		(err, vacunaDB) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err,
				});
			}

			res.json({
				ok: true,
				vacuna: vacunaDB,
			});
		},
	);
});

//=========================
// Elimina un vacuna
//=========================
app.delete("/vacuna/:id", function (req, res) {
	let id = req.params.id;

	let cambiaEstado = {
		estado: false,
	};

	Vacuna.findByIdAndUpdate(
		id,
		cambiaEstado,
		{ new: true },
		(err, vacunaBorrado) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err,
				});
			}
			if (!vacunaBorrado) {
				return res.status(400).json({
					ok: false,
					err: {
						message: "vacuna no encontrado",
					},
				});
			}
			res.json({
				ok: true,
				vacuna: vacunaBorrado,
			});
		},
	);
});

module.exports = app;
