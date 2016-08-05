// JavaScript Document
function preguntarVehiculo(tipoTurno){
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
  {	//alert('xmlhttp.readyState = '+xmlhttp.readyState+' xmlhttp.status='+xmlhttp.status);

  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
		var respuesta=xmlhttp.responseText;
		header=crearHeadertipos(tipoTurno);
		window.selectedTurno=tipoTurno;
		document.getElementById("bodyApp").innerHTML=header+respuesta;
    }
  }
	xmlhttp.open("POST","tipo_turno.html",false);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send();
}
function crearHeadertipos(tipoTurno){
	var titulo="--";
	if(tipoTurno==1){titulo="para Camion";}
	if(tipoTurno==2){titulo="para Auto / Camioneta";}
	return '<input type="hidden" name="vehiculo" id="vehiculo" value="'+tipoTurno+'"  /><div class="contenedor texto" align="center">Turnos '+titulo+'</div>';
}

