function descargar_factura(factura){
	
	startLoadingAnimation();
	var empresa = getCookie('empresa');
	var usuario = getCookie('usuario');
	var www = getCookie('www');
	var factura = getCookie('factura_id');
	var dir_mail = document.getElementById('dir_mail').value;
	var tipo_comprobante = getCookie('tipo_comprobante');
	
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
		closeLoadingAnimation();
        //alert("valor de la transaccion: "+ value);
		respuesta = JSON.parse(xmlhttp.responseText);
        //alert("factura: "+ respuesta.factura);
		//document.location = www+'/facturas/demo/'+respuesta.factura;
		document.location = www+'/'+respuesta.factura;
		//window.open(www+'/facturas/demo/'+respuesta.factura)

    }
  }

		//alert(www  +"/app_ver_factura.php " + json);
		xmlhttp.open("POST",www+"/app_ver_factura.php",true);
		xmlhttp.setRequestHeader("Content-type","application/json;charset=UTF-8");
		//xmlhttp.withCredentials = "true";
		xmlhttp.send(json);


}
