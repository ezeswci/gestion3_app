
function leerVariablesFactura(){
	var tipo_comprobante = getCookie('tipo_comprobante');
	var cliente = getCookie('contacto_razon_social');

	var cond_venta_nombre = getCookie('cond_venta_nombre');
	setCookie('total_factura', 0, 1);
	var id = getCookie('contacto_id');
	document.getElementById("tipo_comprobante").value = tipo_comprobante;
	if (tipo_comprobante == 1){var detalle_comprobante = 'Factura'}
	if (tipo_comprobante == 2){var detalle_comprobante = 'Cr&eacute;dito'}
	if (tipo_comprobante == 3){var detalle_comprobante = 'D&eacute;bito'}
	if (tipo_comprobante == 11){var detalle_comprobante = 'Presupuesto'}
	//document.getElementById('desc_comp').innerHTML = "<h4 class='form-signin-heading text-center'><p>Tipo Comprobante : <b>"+detalle_comprobante+"</b></p><p>Cond.Venta : <b>"+cond_venta_nombre+"</b></p><p> Cliente : <b>"+cliente+"</b></p></h4>"
	//document.getElementById('desc_comp').innerHTML = "<h4 class='form-signin-heading text-center'><p>Tipo Comprobante : <b>"+detalle_comprobante+"</b></p><p>Cliente : <b>"+cliente+"</b></p></h4>"
	//document.getElementById('boton_comprobante').innerHTML = '<button class="btn btn-lg btn-danger btn-block" onClick="grabarFactura();" >Generar '+detalle_comprobante+'</button>';
}
