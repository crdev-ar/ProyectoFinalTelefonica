//NAVEGACION LOGIN

// $('#login').click(() => {
// 	//pregunto si el login se esta mostrando
// 	if ($('#login').attr('mostrando') == 'no') {
// 		//en caso de que no se este mostrando lo muestro y cambio el atributo
// 		$('#contenidoLogin').show();
// 		$('#login').attr('mostrando', 'si');
// 	} else {
// 		//en caso de que si se este mostrando lo oculto y cambio el atributo
// 		$('#contenidoLogin').hide();
// 		$('#login').attr('mostrando', 'no');
// 	}
// });

//FIN NAVEGACION LOGIN

//ADMIN

//SIDEBAR

$('#sidebarCollapse').on('click', () => {
	$('#sidebar').toggleClass('active');
});
//FIN SIDEBAR

//Evento click sobre botones para cargar la tabla
//DATATABLE
$('#servicio').click(() => {
	$('#tablaServicio').show();
	$('#nuevoServicio').show();

	$.fn.dataTable.ext.errMode = 'none';
	$('#tablaServicio').DataTable({
		language: {
			decimal: '',
			emptyTable: 'No hay información',
			info: 'Mostrando _START_ a _END_ de _TOTAL_ Entradas',
			infoEmpty: 'Mostrando 0 to 0 of 0 Entradas',
			infoFiltered: '(Filtrado de _MAX_ total entradas)',
			infoPostFix: '',
			thousands: ',',
			lengthMenu: 'Mostrar _MENU_ Entradas',
			loadingRecords: 'Cargando...',
			processing: 'Procesando...',
			search: 'Buscar:',
			zeroRecords: 'Sin resultados encontrados',
			paginate: {
				first: 'Primero',
				last: 'Ultimo',
				next: 'Siguiente',
				previous: 'Anterior'
			}
		}
	});

	$('#tablaTeam').hide();
	$('#nuevoTeam').hide();

	$('#tablaTeam')
		.DataTable()
		.destroy();
});

$('#team').click(() => {
	$.fn.dataTable.ext.errMode = 'none';
	$('#tablaTeam').show();
	$('#nuevoTeam').show();

	$('#tablaTeam').DataTable({
		language: {
			decimal: '',
			emptyTable: 'No hay información',
			info: 'Mostrando _START_ a _END_ de _TOTAL_ Entradas',
			infoEmpty: 'Mostrando 0 to 0 of 0 Entradas',
			infoFiltered: '(Filtrado de _MAX_ total entradas)',
			infoPostFix: '',
			thousands: ',',
			lengthMenu: 'Mostrar _MENU_ Entradas',
			loadingRecords: 'Cargando...',
			processing: 'Procesando...',
			search: 'Buscar:',
			zeroRecords: 'Sin resultados encontrados',
			paginate: {
				first: 'Primero',
				last: 'Ultimo',
				next: 'Siguiente',
				previous: 'Anterior'
			}
		}
	});

	$('#tablaServicio').hide();
	$('#nuevoServicio').hide();
	$('#tablaServicio')
		.DataTable()
		.destroy();
});

//Fin Eventos click sobre botones para cargar la tabla
//cargo tabla por defecto
$('#tablaServicio').DataTable({
	language: {
		decimal: '',
		emptyTable: 'No hay información',
		info: 'Mostrando _START_ a _END_ de _TOTAL_ Entradas',
		infoEmpty: 'Mostrando 0 to 0 of 0 Entradas',
		infoFiltered: '(Filtrado de _MAX_ total entradas)',
		infoPostFix: '',
		thousands: ',',
		lengthMenu: 'Mostrar _MENU_ Entradas',
		loadingRecords: 'Cargando...',
		processing: 'Procesando...',
		search: 'Buscar:',
		zeroRecords: 'Sin resultados encontrados',
		paginate: {
			first: 'Primero',
			last: 'Ultimo',
			next: 'Siguiente',
			previous: 'Anterior'
		}
	}
});
//FIN ADMIN

//PREVIEW IMAGEN EQUIPO AL CARGAR
function filePreview(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function(e) {
			$('#imagenPreview').html("<img src='" + e.target.result + "' class='card-img-top img-thumbnail' style='height:100%'/>");
			$('#imgAnt').css('display', 'none');
		};
		reader.readAsDataURL(input.files[0]);
	}
}
//Llamo a la funcion que la muestra
$('#imgURL').change(function() {
	filePreview(this);
});

//Validacion del input file
$('#botonEditarTeam').click(() => {
	//verifico si el input tiene algun valor cargado
	if ($('#imgURL').get(0).files.length == 0) {
		//si no lo tiene cargado le cargo al input oculto la imagen que ya traje de BD
		$('#imgURL2').attr('value', $('#imgAnt').attr('val'));
	}
	//si ya esta cargado no hago nada
	//una vez hecho esto cambio el tipo de boton a submit para que ejecute el post
	$('#botonEditarTeam').attr('type', 'submit');
});
