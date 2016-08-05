// JavaScript Document
function preguntarTurno(id){
var xmlhttp;
var tipo_vehiculo=document.getElementById("vehiculo").value;
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
		header=crearHeaderGomeria(id,tipo_vehiculo);
		window.selectedTurno=id;
		document.getElementById("bodyApp").innerHTML=header+respuesta;
    }
  }
	xmlhttp.open("POST","turnos_celular.html",false);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send();
}
function crearHeaderGomeria(id,tipo_vehiculo){
	var titulo="--";
	if(id==1){titulo="Gomeria";}
	if(id==2){titulo="Mecanica";}
	if(id==3){titulo="Lavader";}
	if(id==5){titulo="Lubricentro";}
	if(tipo_vehiculo==1){titulo_tipo=" para Camion";}
	if(tipo_vehiculo==2){titulo_tipo=" para Auto / Camioneta";}

	return '<input type="hidden" name="tipo" id="tipo" value="'+id+'" /><input type="hidden" name="tipo_vehiculo" id="tipo_vehiculo" value="'+tipo_vehiculo+'"  /><div class="contenedor texto" align="center">Turnos '+titulo+titulo_tipo+'</div>';
}
function preguntarId(){
	var idTomadoInput=document.getElementById("tipo").value;
	var tipo_vehiculo=document.getElementById("tipo_vehiculo").value;
	idTomadoWindow=window.selectedTurno;
	alert("idTomadoInput"+idTomadoInput+"--idTomadoWindow"+idTomadoWindow+' -- vehiculo = '+tipo_vehiculo);
}

function reservar_turno(hora){
	var fecha_turno = document.getElementById("fecha").value;
	var tipo = document.getElementById("tipo").value;
	var tipo_vehiculo = document.getElementById("tipo_vehiculo").value;
	alert("fecha_turno = "+fecha_turno+" -- tipo = "+tipo+" -- hora = "+hora+" -- vehiculo = "+tipo_vehiculo);
}