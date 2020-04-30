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
// Ruta Historial de Vacunas
//=========================
app.use(require("./vacuna"));

//=========================
// Ruta Historial de Cita
//=========================
app.use(require("./cita"));

//=========================
// Ruta Historial de facturacion
//=========================
app.use(require("./facturacion"));

module.exports = app;
