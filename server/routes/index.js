const express = require("express");
const app = express();

//=========================
//Ruta Cliente
//=========================
app.use(require("./cliente"));

//=========================
// Ruta Mascotas
//=========================
app.use(require("./mascota"));

//=========================
// Ruta Veterinario
//=========================
app.use(require("./veterinario"));

//=========================
// Ruta Vacuna
//=========================
app.use(require("./vacuna"));

module.exports = app;
