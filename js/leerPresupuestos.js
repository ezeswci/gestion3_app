function leerPresupuestos()
{
//alert('leer comprobantes');
var empresa = getCookie('empresa');
var usuario = getCookie('usuario');
var www = getCookie('www');
var fecha = getCookie('fecha');

var json=JSON.stringify({"empresa":empresa,"usuario":usuario,"fecha":fecha});

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
	//alert('Total = ' + respuesta.total);
	var fecha = getCookie('fecha');
	var fecha_esp = fecha.substr(8,2)+'/'+fecha.substr(5,2)+'/'+fecha.substr(0,4)+' - Tot.Vta $ '+respuesta.total;
	document.getElementById('desc_comp').innerHTML = "<h4 class='form-signin-heading text-center'>"+fecha_esp+"</h4>"

	/**************************
	*** Generar la pantalla ***
	**************************/
	var pant = '<table id="muestra_comprobante" class="table table-striped"><thead><tr><td>Comprob. Nro</td><td>Cliente</td><td>Total</td></tr>    </thead><tbody>'
	
	var z = respuesta.comprobantes
	var i = 0;
	for(items in z){
	pant += '<tr style="font-size:80%" onclick="mostrarPresupuReserva('+z[items].id+')"><td>'+z[items].comprobante+'</td><td>'+z[items].nombre+'</td><td>'+z[items].importe+'</td></tr>'

	}
		pant += '</tbody></table>';
		document.getElementById("tab_comprobante").innerHTML=pant;
    }
  }
xmlhttp.open("POST",www+"/app_php/leerPresupuestos.php",true);
xmlhttp.setRequestHeader("Content-type","application/json;charset=UTF-8");
//xmlhttp.withCredentials = "true";
xmlhttp.send(json);
}

function mostrarPresupuReserva (comprobante){
	setCookie('factura_id', comprobante, 1);
	location.href='ver_presup_reserva_02.html'
}
