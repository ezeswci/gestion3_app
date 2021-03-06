function facura_confirmar(){
	var tipo_comprobante = getCookie('tipo_comprobante');
	if (tipo_comprobante == 1){var detalle_comprobante = 'Factura'}
	if (tipo_comprobante == 2){var detalle_comprobante = 'Cr&eacute;dito'}
	if (tipo_comprobante == 3){var detalle_comprobante = 'D&eacute;bito'}
	if (tipo_comprobante == 11){var detalle_comprobante = 'Presupuesto'}
	
	var cliente = getCookie('contacto_razon_social');	
	var total_factura = getCookie('total_factura');
	
	var texto = '<p>Esta seguro de generar el siguiente comprobante :</p><p>Tipo de comprobante : <b>'+detalle_comprobante+'</b></p><p>Cliente : <b>'+cliente+'</b></p>Por un importe de  : $ <b>'+total_factura+'</b> m&aacute;s impuestos';
	
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_DANGER,
                title: 'Confirmaci&oacute; de operaci&oacute;n',
                message: texto,
                buttons: [{
                   label: 'Aceptar',
				   cssClass: 'btn-success',
                	action: function(){
					 grabarFactura()
                	}
                	}, {
                   label: 'Cancelar',
				   	cssClass: 'btn-danger',
                	action: function(dialogItself){
                   	 dialogItself.close();
                	}
                }]
            });     
}

function grabarFactura(){
	//alert('grabarFactura 1');
	startLoadingAnimation();
	
	var tipo_comprobante = getCookie('tipo_comprobante');
	var id = getCookie('contacto_id');
	var cond_venta = getCookie('cond_venta');
	var empresa = getCookie('empresa');
	var usuario = getCookie('usuario');
	var www = getCookie('www');
	var total_factura = getCookie('total_factura');


	//--------------------------
	var table = document.getElementById("muestra_comprobante");
	var filas = table.rows.length;
	var error = '';
	if(filas < 2){error = error+"<p>Debe ingresar por lo menos una l&iacute;nea para generar un comprobante</p>"};
	if(error.length > 0){mostrar_alerta('Generaci&oacute;n de Comprobante',error,BootstrapDialog.TYPE_DANGER);return}
	
	var productos =[];
	for (var i = 1; row = table.rows[i]; i++) {
	//iteracion de filas
		//for (var j = 0; col = row.cells[j]; j++) {
		//iteracion de columnas
		//alert(document.getElementById("muestra_comprobante").rows[i].cells[0].innerHTML);
		var prod_id = document.getElementById("muestra_comprobante").rows[i].cells[0].innerHTML;
		var prod_detalle = document.getElementById("muestra_comprobante").rows[i].cells[1].innerHTML;
		var prod_unidad = document.getElementById("muestra_comprobante").rows[i].cells[2].innerHTML;
		var prod_cant = document.getElementById("muestra_comprobante").rows[i].cells[3].innerHTML;
		var prod_unit = document.getElementById("muestra_comprobante").rows[i].cells[4].innerHTML;
		var prod_total = document.getElementById("muestra_comprobante").rows[i].cells[5].innerHTML;
		//}  
		//alert("prod_id"+prod_id+"prod_detalle"+prod_detalle+"prod_unidad"+prod_unidad+"prod_cant"+prod_cant+"prod_unit"+prod_unit+"prod_total"+prod_total);
		productos[i-1] = {"prod_id":prod_id,"prod_detalle":prod_detalle,"prod_unidad":prod_unidad,"prod_cant":prod_cant,"prod_unit":prod_unit,"prod_total":prod_total};
	}

	var json=JSON.stringify({"cabecera":{"empresa":empresa,"usuario":usuario,"tipo_comprobante":tipo_comprobante,"cliente":id,"cond_venta":cond_venta,"total":total_factura,},"productos":productos});

//mostrar_alerta('Grabar comprobante','mensaje de fin de factura',BootstrapDialog.TYPE_INFO);

var xmlhttp;
	if (window.XMLHttpRequest)
 			 {// code for IE7+, Firefox, Chrome, Opera, Safari
  				xmlhttp=new XMLHttpRequest();
  			 }
			else
  			 {// code for IE6, IE5
  				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
 			 }
				xmlhttp.onreadystatechange=function()
 			 {
				//alert('xmlhttp.readyState = '+xmlhttp.readyState+' xmlhttp.status = '+xmlhttp.status);
  				if (xmlhttp.readyState==4 && xmlhttp.status==200)
   			 {
    			value=xmlhttp.responseText; // Devuelve el id de la factura generada
				//alert('Respuesta = '+value);
				closeLoadingAnimation();

				respuesta = JSON.parse(xmlhttp.responseText);
				if(respuesta.factura!=0)
							{
							 setCookie('factura_id', respuesta.factura, 1);
							 setCookie('factura_nro', respuesta.numero, 1);
							 setCookie('factura_total', respuesta.total, 1);
							 setCookie('dir_mail', respuesta.dir_mail, 1);
							 location.href='facturar_04.html'
							}
							else{
							var error = "Intentelo Nuevamente, de persistir verifique su conexi&oacute;n a internet. Si ese no es el inconveniente comunicarse con Sistemas"
							if(respuesta.numero == -99){var error = "<p>El saldo del cliente excede el l&iacute;mite permitido.</p><p>Saldo Actual : "+respuesta.total+"</p><p>Limite de cr&eacute;dito = "+respuesta.dir_mail+"</p>"}
							
							mostrar_alerta("<h2>Comprobante no Generado</h2>",error,BootstrapDialog.TYPE_DANGER);
					}
				
    		  }
			  
     		}
			//alert('ruta xxx = '+window.swciRuta);
			//alert(json);
			//----------------------
			xmlhttp.open("POST",www+"/app_php/grabar_factura.php",true);
			xmlhttp.setRequestHeader("Content-type","application/json;charset=UTF-8");
			//xmlhttp.withCredentials = "true";
			xmlhttp.send(json);
}
