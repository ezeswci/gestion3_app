function solicitar_cae(factura){

	startLoadingAnimation();

	
	var empresa = getCookie('empresa');
	var usuario = getCookie('usuario');
	var www = getCookie('www');
	var factura = getCookie('factura_id');

	var factura_nro = getCookie('factura_nro');
	var tipo_comprobante = getCookie('tipo_comprobante');
		
	var json=JSON.stringify({"empresa":empresa,"usuario":usuario,"factura":factura});

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
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
		value=xmlhttp.responseText;
        window.sessionStorage.setItem("secion", value );
        //alert("valor de la transaccion: "+ value);
		closeLoadingAnimation();
		respuesta = JSON.parse(xmlhttp.responseText);
		if(respuesta.nuevo_numero > 0){var mensaje = "<p>C.A.E. Otorgado = "+respuesta.cae+'</p><p>Factura numero = '+respuesta.nuevo_numero;
			var estado_transaccion = "C.A.E. Otorgado";
			// Generar y Mostrar nuevo numero
			var aux_1 = factura_nro.substring(0, 2);
			var aux_0 = '0000'+respuesta.PtoVta;
			var aux_2 = aux_0.slice (-4);
			var aux_0 = '00000000'+respuesta.nuevo_numero;
			var aux_3 = aux_0.slice (-8);
			var factura_nva = aux_1+aux_2+'-'+aux_3;
			if (tipo_comprobante == 1){var detalle_comprobante = 'Factura - '+factura_nva}
			if (tipo_comprobante == 2){var detalle_comprobante = 'Cr&eacute;dito - '+factura_nva}
			if (tipo_comprobante == 3){var detalle_comprobante = 'D&eacute;bito - '+factura_nva}
			setCookie('factura_nro', factura_nva, 1);
			setCookie('cae', respuesta.cae, 1);
			document.getElementById('desc_comp').innerHTML = "<h3 class='form-signin-heading text-center'>"+detalle_comprobante+"</h3>"
			var btnCae = '<p align="center"><button id="cae" class="btn btn-lg btn-primary btn-block"> C.A.E. Otorgado = '+respuesta.cae+'</button></p>'
			document.getElementById("pedir_cae").innerHTML=btnCae;
			mostrar_alerta("<h2>"+estado_transaccion+"</h2>",mensaje,BootstrapDialog.TYPE_SUCCESS)
			/*
			delete_cookie('factura_id');
			delete_cookie('factura_nro');
			delete_cookie('factura_total');
			delete_cookie('tipo_comprobante');
			delete_cookie('contacto_id');
			delete_cookie('cond_venta');
			delete_cookie('contacto_razon_social');
			delete_cookie('cond_venta_nombre');
			*/
			//document.getElementById('cae').disabled=true;
			}
		else
			{var mensaje = 'Error = '+respuesta.cae;
			 var estado_transaccion = "C.A.E. Rechazado";
			 mostrar_alerta("<h2>"+estado_transaccion+"</h2>",mensaje,BootstrapDialog.TYPE_DANGER);
	}
    }
  }

		xmlhttp.open("POST",www+"/wsfe/API_wsfe_obtener_cae.php",true);
		xmlhttp.setRequestHeader("Content-type","application/json;charset=UTF-8");
		//xmlhttp.withCredentials = "true";
		xmlhttp.send(json);


}
