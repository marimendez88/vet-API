const express = require("express");
const app = express();

//=========================
//Ruta Cliente
//=========================
app.use(require("./cliente"));

//=========================
// Ruta Mascotas
//=========================

module.exports = app;
