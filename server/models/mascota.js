const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let mascotaSchema = new Schema({
	nombre: {
		type: String,
		required: [true, "El nombre es necesario"],
	},
	especie: {
		type: String,
	},
	raza: {
		type: String,
	},
	cliente: {
		type: Schema.Types.ObjectId,
		ref: "Cliente",
		required: [true, "El Cliente es necesario"],
	},
	estado: {
		type: Boolean,
		default: true,
	},
});

mascotaSchema.plugin(uniqueValidator, {
	message: "{PATH} debe de ser único",
});

module.exports = mongoose.model("Mascota", mascotaSchema);
