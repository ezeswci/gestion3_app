function mostrar_dia()
{
var iDiv = document.createElement('div');
var fecha = '2015-02-19';
var tipo = '1';
var hora = '09:30';
alert('mostrar_dia ');	
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
  {	alert('xmlhttp.readyState = '+xmlhttp.readyState+' xmlhttp.status='+xmlhttp.status);

  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
	/*
		respuesta=xmlhttp.responseText;
		//alert('Respuesta '+respuesta);
		if(respuesta!=0){ // si es 1 se borro bien
		//alert(respuesta);
		arreglo=JSON.parse(respuesta);	
		//arreglo=arreglo.split(",");
		if(arreglo!=null){
		largo=arreglo.length;
		for(var i=0; i<largo; i++){
		evento=arreglo[i].split(";");
		}

	*/
	iDiv.innerHTML = "hola estoy en el link";
	alert(3);
	document.getElementById("mostrar_turnos").appendChild(iDiv);
	alert(4);
    }
  }
	xmlhttp.open("POST","controlar_fecha.php",false);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(fecha,hora,tipo);

}