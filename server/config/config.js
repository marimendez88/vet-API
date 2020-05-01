//
// puerto
//
process.env.PORT = process.env.PORT || 3000;

//
// Entorno
//
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

//
//
//

//
// Base de datos
//

let urlDB;
let baseUrl;

if (process.env.NODE_ENV === "dev") {
	urlDB = "mongodb://localhost:27017/Veterinaria-API";
	baseUrl = "http://localhost:3000";
} else {
	urlDB = process.env.MONGO_URI;
	baseUrl = "https://mjmendez-vet-api.herokuapp.com";
}
process.env.BASE_URL = baseUrl;
process.env.URLDB = urlDB;
