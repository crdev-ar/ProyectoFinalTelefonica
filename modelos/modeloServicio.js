const mongoose = require('mongoose');

const Esquema = mongoose.Schema;

const modeloServicio = new Esquema({
	nombre: String,
	pesos: Number,
	centavos: Number,
	caracteristica1: String,
	caracteristica2: String,
	caracteristica3: String,
	caracteristica4: String,
	caracteristica5: String,
	descripcionServicio: String,
	stock: Number,
	status: {
		type: Boolean,
		default: true
	}
});

const modelo_servicio = mongoose.model('servicios', modeloServicio);

module.exports = modelo_servicio;
