const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let facturacionSchema = new Schema({
	monto: {
		type: String,
		required: [true, "El monto es necesario"],
	},
	fecha: {
		type: String,
		required: [true, "La Fecha  es necesario"],
	},
	hora: {
		type: String,
	},
	cliente: {
		type: Schema.Types.ObjectId,
		ref: "Cliente",
		required: [true, "El cliente es necesario"],
	},
	estado: {
		type: Boolean,
		default: true,
	},
});

module.exports = mongoose.model("Facturacion", facturacionSchema);
