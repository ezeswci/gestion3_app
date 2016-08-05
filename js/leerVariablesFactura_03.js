
function leerVariablesFactura(){
           var tipo_comprobante = getCookie('tipo_comprobante');
		   var cliente = getCookie('contacto_razon_social');

           var cond_venta_nombre = getCookie('cond_venta_nombre');

		   var id = getCookie('contacto_id');
		   document.getElementById("tipo_comprobante").value = tipo_comprobante;
		   if (tipo_comprobante == 1){var detalle_comprobante = 'Factura - '+cond_venta_nombre}
		   if (tipo_comprobante == 2){var detalle_comprobante = 'Cr&eacute;dito - '+cond_venta_nombre}
		   if (tipo_comprobante == 3){var detalle_comprobante = 'D&eacute;bito - '+cond_venta_nombre}
		   document.getElementById('desc_comp').innerHTML = "<h3 class='form-signin-heading text-center'>"+detalle_comprobante+"</h3>"
		   document.getElementById('desc_cliente').innerHTML = "<h4 class='form-signin-heading text-center'>"+cliente+"</h4>"
}
