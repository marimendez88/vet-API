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

module.exports = app;
