// JavaScript Document
function reservar_turno(hora){
	var fecha_turno = document.getElementById("fecha").value;
	var tipo = document.getElementById("tipo").value;
	var tipo_vehiculo = document.getElementById("tipo_vehiculo").value;
	//alert("Nuevo fecha_turno = "+fecha_turno+" -- tipo = "+tipo+" -- hora = "+hora+" -- vehiculo = "+tipo_vehiculo);

var xmlhttp;
//alert('vehiculo = '+tipo_vehiculo+'  '+id);
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
		header=crearHeaderReservar(tipo,tipo_vehiculo,fecha_turno,hora);
		//window.selectedTurno=tipo;
		document.getElementById("bodyApp").innerHTML=header+respuesta;
    }
  }
	xmlhttp.open("POST","turnos_reservar.html",false);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send();
}

function crearHeaderReservar(tipo,tipo_vehiculo,fecha_turno,hora){
	var titulo="--";
	if(tipo==1){titulo="Gomeria";}
	if(tipo==2){titulo="Mecanica";}
	if(tipo==3){titulo="Lavader";}
	if(tipo==5){titulo="Lubricentro";}
	if(tipo_vehiculo==1){titulo_tipo=" para Camion";}
	if(tipo_vehiculo==2){titulo_tipo=" para Auto / Camioneta";}

	return '<input type="hidden" name="tipo" id="tipo" value="'+tipo+'" /><input type="hidden" name="tipo_vehiculo" id="tipo_vehiculo" value="'+tipo_vehiculo+'"  /><div class="contenedor texto" align="center">Turno a Reservar</div><div class="contenedor texto" align="center">Tipo :'+titulo+titulo_tipo+'</div><div class="contenedor texto" align="center">Fecha y Hora :'+fecha_turno+' '+hora+'</div>';
}

