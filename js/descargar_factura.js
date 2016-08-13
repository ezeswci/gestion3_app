function descargar_factura(factura)
        {
	alert('desctagar');
	var empresa = getCookie('empresa');
	var usuario = getCookie('usuario');
	var www = getCookie('www');
	var factura = getCookie('factura_id');
	var dir_mail = document.getElementById('dir_mail').value;
	document.location = www+'/facturas/demo/'+'FACTURA A-9999-00000243.pdf'

}