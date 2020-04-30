const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let veterinarioSchema = new Schema({
	nombre: {
		type: String,
		required: [true, "El nombre es necesario"],
	},
	apellidos: {
		type: String,
		required: [true, "El nombre es necesario"],
	},
	email: {
		type: String,
		required: [true, "El correo es necesario"],
		unique: true,
	},
	telefono: {
		type: String,
	},
	especialidad: {
		type: String,
	},
	estado: {
		type: Boolean,
		default: true,
	},
});

veterinarioSchema.plugin(uniqueValidator, {
	message: "{PATH} debe de ser único",
});

module.exports = mongoose.model("Veterinario", veterinarioSchema);
