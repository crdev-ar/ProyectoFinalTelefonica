const express = require('express');
const app = express();
const morgan = require('morgan');
const ejs = require('ejs');

const multer = require('multer');

//modulo propio de node - solo incluir, no necesita instalacion
const path = require('path');

// configuración
app.set('port', process.env.PORT || 2020);
//motor de plantillas.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'vistas'));

const storage = multer.diskStorage({
	destination: path.join(__dirname, '/public/imgTeam'),
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	}
});

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded());

app.use(
	multer({
		storage,
		dest: path.join(__dirname, '/public/imgTeam')
	}).single('imgURL')
);

const mongoose = require('mongoose');

//conexion  BD mongoose

mongoose
	.connect('mongodb://localhost:27017/arTeam')
	.then(() => {
		console.log('Conectado a la Base de Datos');
	})
	.catch(() => {
		console.log('No pudo conectar a la Base de Datos');
	});

//*************     RUTAS      ************
//capturo el modulo exportado de rutas
const rutas = require('./rutas/rutas');
//vinculo mis rutas al index
app.use('/', rutas);

app.use(express.static(path.join(__dirname + '/public')));

app.use('/imgFile', express.static(__dirname + '/assets'));

//ejecuto en puerto
app.listen(app.get('port'), () => {
	console.log('app lanzado en puerto: ', app.get('port'));
});
