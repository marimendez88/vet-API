const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let citaSchema = new Schema({
	detalle: {
		type: String,
		required: [true, "El detalle es necesario"],
	},
	fecha: {
		type: Date,
		required: [true, "La Fecha es necesario"],
	},
	hora: {
		type: Date,
	},
	veterinario: {
		type: Schema.Types.ObjectId,
		ref: "Veterinario",
		required: [true, "El Veterinario es necesario"],
	},
	mascota: {
		type: Schema.Types.ObjectId,
		ref: "Mascota",
		required: [true, "La Mascota es necesario"],
	},
	estado: {
		type: Boolean,
		default: true,
	},
});

module.exports = mongoose.model("Cita", citaSchema);
