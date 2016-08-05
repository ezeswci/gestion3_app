function solicitar_cae(factura)
        {
	var empresa = getCookie('empresa');
	var usuario = getCookie('usuario');
	var www = getCookie('www');
	var factura = getCookie('factura_id');
	
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
		respuesta = JSON.parse(xmlhttp.responseText);
		if(respuesta.nuevo_numero > 0){var mensaje = "<p>C.A.E. Otorgado = "+respuesta.cae+'</p><p>Factura numero = '+respuesta.nuevo_numero;
								var estado_transaccion = "C.A.E. Otorgado";
								mostrar_alerta("<h2>"+estado_transaccion+"</h2>",mensaje,BootstrapDialog.TYPE_SUCCESS)
								delete_cookie('factura_id');
								delete_cookie('factura_nro');
								delete_cookie('factura_total');
								delete_cookie('tipo_comprobante');
								delete_cookie('contacto_id');
								delete_cookie('cond_venta');
								delete_cookie('contacto_razon_social');
								delete_cookie('cond_venta_nombre');
								document.getElementById('cae').disabled=true;}
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
