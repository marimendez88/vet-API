const express = require("express");

const _ = require("underscore");

const app = express();
const Facturacion = require("../models/facturacion");

const f = new Date();

//=========================
//Muestra los facturacions
//=========================

app.get("/facturacion", (req, res) => {
	let desde = req.query.desde || 0;
	desde = Number(desde);

	let limite = req.query.limite || 5;
	limite = Number(limite);

	//entre '' estan solo los campos que quiero mandar
	Facturacion.find({ estado: true })
		.skip(desde)
		.limit(limite)
		.populate("cliente", "nombre apellidos email ")
		.exec((err, facturacions) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err,
				});
			}
			Facturacion.countDocuments({ estado: true }, (err, conteo) => {
				res.json({
					ok: true,
					facturacions,
					cuantos: conteo,
				});
			});
		});
});

//=========================
//Busca una facturacion por ID
//=========================

app.get("/facturacion/:id", (req, res) => {
	let id = req.params.id;

	Facturacion.findById(id)
		.populate("cliente", "nombre apellidos email ")
		.exec((err, facturacionBD) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err,
				});
			}
			if (!facturacionBD) {
				return res.status(400).json({
					ok: false,
					err: {
						message: "facturacion no encontrada",
					},
				});
			}
			res.json({
				ok: true,
				facturacion: facturacionBD,
			});
		});
});

//=========================
//Muestra los facturacions de un mismo cliente
//=========================

app.get("/facturacion/cliente/:id", (req, res) => {
	let desde = req.query.desde || 0;
	desde = Number(desde);

	let limite = req.query.limite || 5;
	limite = Number(limite);

	let cliente = req.params.id;

	//entre '' estan solo los campos que quiero mandar
	Facturacion.find({ estado: true, cliente: cliente })
		.skip(desde)
		.limit(limite)
		.populate("cliente", "nombre apellidos email ")
		.exec((err, facturacions) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err,
				});
			}
			Facturacion.countDocuments(
				{ estado: true, cliente: cliente },
				(err, conteo) => {
					res.json({
						ok: true,
						facturacions,
						cuantos: conteo,
					});
				},
			);
		});
});

//=========================
//Muestra los facturacions de un mismo veterinario
//=========================

app.get("/facturacion/veterinario/:id", (req, res) => {
	let desde = req.query.desde || 0;
	desde = Number(desde);

	let limite = req.query.limite || 5;
	limite = Number(limite);

	let veterinario = req.params.id;

	//entre '' estan solo los campos que quiero mandar
	Facturacion.find({ estado: true, veterinario: veterinario })
		.skip(desde)
		.limit(limite)
		.populate("veterinario", "nombre apellidos")
		.populate("mascota", "nombre")
		.exec((err, facturacions) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err,
				});
			}
			Facturacion.countDocuments(
				{ estado: true, veterinario: veterinario },
				(err, conteo) => {
					res.json({
						ok: true,
						facturacions,
						cuantos: conteo,
					});
				},
			);
		});
});

//=========================
//Crea una facturacion
//=========================
app.post("/facturacion", function (req, res) {
	let body = req.body;

	// return console.log(Date.parse(fecha));
	let facturacion = new Facturacion({
		monto: body.monto,
		fecha: body.fecha,
		hora: body.hora,
		cliente: body.cliente,
	});

	facturacion.save((err, facturacionDB) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err,
			});
		}
		res.json({
			ok: true,
			facturacion: facturacionDB,
		});
	});
});

module.exports = app;
