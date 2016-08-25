function leerVariablesMostrar()
{
//alert('leer comprobantes');
var empresa = getCookie('empresa');
var usuario = getCookie('usuario');
var www = getCookie('www');
var fecha = getCookie('fecha');
var factura_id = getCookie('factura_id');

var json=JSON.stringify({"empresa":empresa,"usuario":usuario,"factura_id":factura_id});

//alert("Entre leerContactos");

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
	var value = xmlhttp.responseText;
	//alert('Respuesta :'+value);
	var respuesta = JSON.parse(xmlhttp.responseText);
	var numero_cae = respuesta.cae;
	document.getElementById("dir_mail").value = respuesta.dir_mail;
	setCookie('tipo_comprobante', respuesta.tipo_comprob, 1);
	document.getElementById('desc_comp').innerHTML = "<h3 class='form-signin-heading text-center'>"+respuesta.comprobante+"</h3>"
	document.getElementById('desc_cliente').innerHTML = "<h4 class='form-signin-heading text-center'>"+respuesta.nombre+"</h4>"
	document.getElementById('tot_factura').innerHTML = "<h3 class='form-signin-heading text-center'>Importe Total $ "+respuesta.importe+"</h3>"
	//alert('CAE '+numero_cae+'  '+numero_cae.length);
	var btnCae = '<p align="center"><button id="cae" class="btn btn-lg btn-primary btn-block" onClick="solicitar_cae();" >&nbsp;</button></p>'
		document.getElementById("pedir_cae").innerHTML=btnCae;
    }
  }
xmlhttp.open("POST",www+"/app_php/leerUnComprobante.php",true);
xmlhttp.setRequestHeader("Content-type","application/json;charset=UTF-8");
//xmlhttp.withCredentials = "true";
xmlhttp.send(json);
}

