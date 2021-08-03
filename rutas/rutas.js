const express = require('express');
const rutas = express.Router();

const modeloServicio = require('../modelos/modeloServicio');
const modeloEquipo = require('../modelos/modeloEquipo');

rutas.get('/', async (req, res) => {
	const servicios = await modeloServicio.find();
	res.render('index', { servicios });
});

rutas.get('/sobre-nosotros', async (req, res) => {
	const equipo = await modeloEquipo.find();
	res.render('sobre-nosotros', { equipo });
});

rutas.get('/admin', async (req, res) => {
	const modelos = {};

	modelos.servicio = await modeloServicio.find();
	modelos.equipo = await modeloEquipo.find();

	res.render('admin', { modelos });
});

//RUTAS SERVICIOS
rutas.get('/nuevo-servicio', (req, res) => {
	res.render('nuevoServ');
});

//inserto en base de datos
rutas.post('/nuevo-servicio', async (req, res) => {
	//creo un objeto del tipo de modelo a guardar
	const nuevoServicio = new modeloServicio(req.body);

	//guardo lo que capture del formulario en la base de datos
	await nuevoServicio.save();

	res.redirect('/admin');
});

rutas.get('/editarServ/:id', async (req, res) => {
	//obtengo el id del elemento a modificar
	const id = req.params.id;
	//uso el id para guardar ese unico elemento
	const serv = await modeloServicio.findById({ _id: id });
	//cargo la pagina editar y le envio el elemento que habia buscado
	res.render('editarServ', { serv });
});

rutas.post('/editarServ', async (req, res) => {
	const id = req.body.id;

	if (req.body.status == 'on') {
		req.body.status = true;
	} else {
		req.body.status = false;
	}
	await modeloServicio.findByIdAndUpdate({ _id: id }, req.body);
	res.redirect('/admin');
});

rutas.get('/borrarServ/:id', async (req, res) => {
	const id = req.params.id;
	await modeloServicio.findByIdAndDelete(id);
	res.redirect('/admin');
});

rutas.get('/comprarServicio/:id', async (req, res) => {
	const id = req.params.id;
	const servicio = await modeloServicio.findById(id);

	if (servicio.stock > 1) {
		servicio.stock = servicio.stock - 1;
	} else {
		servicio.stock = 0;
		servicio.status = false;
	}

	await modeloServicio.findByIdAndUpdate({ _id: id }, servicio);
	res.redirect('/');
});

// RUTAS MIEMBROS

//AGREGAR
rutas.get('/nuevoMiembro', (req, res) => {
	res.render('nuevoMiem');
});

rutas.post('/nuevoMiembro', async (req, res) => {
	const miembro = {};
	miembro.nombre = req.body.nombre;
	miembro.apellido = req.body.apellido;
	miembro.imgURL = '/imgTeam/' + req.file.filename;
	miembro.posicion = req.body.posicion;
	miembro.descripcion = req.body.descripcion;

	const nuevoMiembro = new modeloEquipo(miembro);

	await nuevoMiembro.save();
	res.redirect('/admin');
});

//EDITAR

rutas.get('/editarTeam/:id', async (req, res) => {
	//obtengo el id del elemento a modificar
	const id = req.params.id;
	//uso el id para guardar ese unico elemento
	const team = await modeloEquipo.findById({ _id: id });
	//cargo la pagina editar y le envio el elemento que habia buscado
	res.render('editarTeam', { team });
});

rutas.post('/editarTeam', async (req, res) => {
	const id = req.body.id;

	const miembro = {};
	miembro.nombre = req.body.nombre;
	miembro.apellido = req.body.apellido;

	//valido que el input2 este vacio
	if (req.body.imgURL2 == '') {
		//si esta vacio significa que cargo algo en el input file asi que
		//guardo la imagen que subio
		miembro.imgURL = '/imgTeam/' + req.file.filename;
	} else {
		//si el input 2 esta cargado con algo significa que
		//no subio imagen por el input file asi que guardo la misma imagen que ya tenia
		miembro.imgURL = req.body.imgURL2;
	}

	miembro.posicion = req.body.posicion;
	miembro.descripcion = req.body.descripcion;

	await modeloEquipo.findByIdAndUpdate({ _id: id }, miembro);
	res.redirect('/admin');
});

//ELIMINAR

rutas.get('/borrarTeam/:id', async (req, res) => {
	const id = req.params.id;
	await modeloEquipo.findByIdAndDelete(id);
	res.redirect('/admin');
});

module.exports = rutas;
