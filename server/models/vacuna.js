const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let vacunaSchema = new Schema({
	nombre: {
		type: String,
		required: [true, "El nombre de la vacuna es necesario"],
	},
	fecha: {
		type: String,
	},
	hora: {
		type: String,
	},
	mascota: {
		type: Schema.Types.ObjectId,
		ref: "Mascota",
		required: [true, "La Mascota es necesaria"],
	},
	estado: {
		type: Boolean,
		default: true,
	},
});

module.exports = mongoose.model("Vacuna", vacunaSchema);
