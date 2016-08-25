
function leerVariablesFactura(){
           var tipo_comprobante = getCookie('tipo_comprobante');
		   var cliente = getCookie('contacto_razon_social');
		   var id = getCookie('contacto_id');
		   document.getElementById("tipo_comprobante").value = tipo_comprobante;
		   if (tipo_comprobante == 1){var detalle_comprobante = 'Factura'}
		   if (tipo_comprobante == 2){var detalle_comprobante = 'Cr&eacute;dito'}
		   if (tipo_comprobante == 3){var detalle_comprobante = 'D&eacute;bito'}
		   if (tipo_comprobante == 11){var detalle_comprobante = 'Presupuesto'}
		   document.getElementById('desc_comp').innerHTML = "<h2 class='form-signin-heading text-center'>"+detalle_comprobante+"</h2>"
}
