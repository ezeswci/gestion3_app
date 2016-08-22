function validar_usuario(){
	var www = document.getElementById("web").value;
	var usuario = document.getElementById("usuario").value;
	var clave = document.getElementById("clave").value;
	var empresa = document.getElementById("empresa").value;
	var error = '';
	if(empresa.length < 1){error = error+"<p>El campo <b>empresa</b> es obligatorio</p>"};
	if(clave.length < 1){error = error+"<p>El campo <b>clave</b> es obligatorio</p>"};
	if(usuario.length < 1){error = error+"<p>El campo <b>Usuario</b> es obligatorio</p>"};
	if(error.length > 0){mostrar_alerta('Campos Obligatorios',error,BootstrapDialog.TYPE_DANGER);return}
	var json=JSON.stringify({"usuario":usuario,"clave":clave,"empresa":empresa});
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
    			value=xmlhttp.responseText;
				//alert(value);
				respuesta = JSON.parse(xmlhttp.responseText);
				if(respuesta.estado!=0)
							{setCookie('empresa', empresa, 100);
							 setCookie('usuario', usuario, 100);
							 setCookie('www', www, 100);
							 location.href='menu.html'
							}
							else{
							var error = "Intentelo Nuevamente, de persistir verifique su conexi&oacute;n a internet. Si ese no es el inconveniente comunicarse con Sistemas"
							mostrar_alerta("<h2>Error en la Carga</h2>",error,BootstrapDialog.TYPE_DANGER);
					}
				
    		  }
     		}
			//alert('ruta xxx = '+window.swciRuta);
			//alert(www+"/app_php/validar_usuario.php"+json);
			//----------------------
			xmlhttp.open("POST",www+"/app_php/validar_usuario.php",true);
			xmlhttp.setRequestHeader("Content-type","application/json;charset=UTF-8");
			//xmlhttp.withCredentials = "true";
			xmlhttp.send(json);
}
