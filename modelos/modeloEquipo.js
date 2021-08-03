const mongoose = require('mongoose');

const Esquema = mongoose.Schema;

const modeloEquipo = new Esquema({
	nombre: String,
	apellido: String,
	imgURL: String,
	posicion: String,
	descripcion: String
});

const modelo_equipo = mongoose.model('equipo', modeloEquipo);

module.exports = modelo_equipo;
