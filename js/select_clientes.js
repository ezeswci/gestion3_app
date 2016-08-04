
function leerVariablesFactura(){
           var tipo_comprobante = getCookie('tipo_comprobante');
		   var cliente = getCookie('cliente');
		   document.getElementById("tipo_comprobante").value = tipo_comprobante;
		   document.getElementById("cliente").value = cliente;
		   if (tipo_comprobante == 1){var detalle_comprobante = 'Factura'}
		   if (tipo_comprobante == 2){var detalle_comprobante = 'Cr&eacute;dito'}
		   if (tipo_comprobante == 3){var detalle_comprobante = 'D&eacute;bito'}
		   document.getElementById('desc_comp').innerHTML = "<h2 class='form-signin-heading text-center'>"+detalle_comprobante+"</h2>"
}
