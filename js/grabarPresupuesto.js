function grabarPresupuesto(){
	//alert('grabarFactura 1');
	startLoadingAnimation();
	
	var tipo_comprobante = getCookie('tipo_comprobante');
	var id = getCookie('contacto_id');
	var cond_venta = getCookie('cond_venta');
	var empresa = getCookie('empresa');
	var usuario = getCookie('usuario');
	var www = getCookie('www');


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

	var json=JSON.stringify({"cabecera":{"empresa":empresa,"usuario":usuario,"tipo_comprobante":tipo_comprobante,"cliente":id,"cond_venta":cond_venta,},"productos":productos});
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
							 location.href='presupuesto_04.html'
							}
							else{
							var error = "Intentelo Nuevamente, de persistir verifique su conexi&oacute;n a internet. Si ese no es el inconveniente comunicarse con Sistemas"
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
