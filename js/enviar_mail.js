function enviar_mail(factura){
	
	startLoadingAnimation();
			
	var empresa = getCookie('empresa');
	var usuario = getCookie('usuario');
	var www = getCookie('www');
	var factura = getCookie('factura_id');
	var dir_mail = document.getElementById('dir_mail').value;
	var tipo_comprobante = getCookie('tipo_comprobante');
	
	if(dir_mail.length < 1){closeLoadingAnimation();
							mostrar_alerta("<h2>Envio de mail</h2>","Debe ingresr una direccion de mail",BootstrapDialog.TYPE_DANGER);
							return;
							}
	
	var json=JSON.stringify({"empresa":empresa,"dir_mail":dir_mail,"factura":factura,"tipo_comprobante":tipo_comprobante});

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
		if(respuesta.estado > 0){mostrar_alerta("<h2>Envio de mail</h2>"," Mail enviado",BootstrapDialog.TYPE_SUCCESS);}
								else
								{mostrar_alerta("<h2>Envio de mail</h2>","El Mail no se pudo enviar",BootstrapDialog.TYPE_DANGER);}
    }
  }

	
		//alert(www  +"/app_enviar_mail_factura.php " + json);
		xmlhttp.open("POST",www+"/app_enviar_mail_factura.php",true);
		xmlhttp.setRequestHeader("Content-type","application/json;charset=UTF-8");
		//xmlhttp.withCredentials = "true";
		xmlhttp.send(json);


}
