function leerComprobantes()
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
	/************************
	*** Generar el select ***
	************************/
	var z = JSON.parse(xmlhttp.responseText);
	window.productsArray=z;
	var i = 0;
	var pant = '<table id="muestra_comprobante" class="table table-striped"><tr><td>Comprob. Nro</td><td>Cliente</td><td>Total</td></tr>'
	for(items in z){
	pant += '<tr style="font-size:80%" onclick="mostrarComprobante('+z[items].id+')"><td>'+z[items].comprobante+'</td><td>'+z[items].nombre+'</td><td>'+z[items].importe+'</td></tr>'
		//alert("Nombre:"+z[items].id+"  "+"id:"+z[items].comprobante)
		//--------------------------
		/********************************
		*** Agregar linea en la tabla ***
		********************************
    	var table = document.getElementById("muestra_comprobante");
	    var row = table.insertRow(1);
    	var cell1 = row.insertCell(0);
	    var cell2 = row.insertCell(1);
    	var cell3 = row.insertCell(2);
	    var cell4 = row.insertCell(3);
		cell1.innerHTML = z[items].id;
		cell2.innerHTML = z[items].comprobante;
	    cell3.innerHTML = z[items].nombre;
    	cell4.innerHTML = z[items].importe;
		cell1.style.visibility="hidden";
		cell1.style.fontSize="0%";
		cell2.style.textAlign="left";
		cell2.style.fontSize="80%";
		cell3.style.textAlign="left";
		cell3.style.fontSize="80%";
		cell4.style.textAlign="right";
		cell4.style.fontSize="80%";
		//--------------------------
		i = i + 1;
		*/
	}
		pant += '</table>';
		document.getElementById("tab_comprobante").innerHTML=pant;
    }
  }
xmlhttp.open("POST",www+"/app_php/leerComprobantes.php",true);
xmlhttp.setRequestHeader("Content-type","application/json;charset=UTF-8");
//xmlhttp.withCredentials = "true";
xmlhttp.send(json);
}

function mostrarComprobante (comprobante){
	alert('comprobante = '+	comprobante);
}
