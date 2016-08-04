function leerContactos(tipo)
{


//-----------------------
var empresa = getCookie('empresa');
var usuario = getCookie('usuario');
var www = getCookie('www');

var json=JSON.stringify({"tipo":tipo,"empresa":empresa,"usuario":usuario});

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
	//alert('Respuesta = '+value)
	/************************
	*** Generar el select ***
	************************/
    var x = document.getElementById("contactos");
	//respuesta = JSON.parse(value)
	var z = JSON.parse(xmlhttp.responseText);
	var i = 0;
	for(items in z){
		//alert("Nombre:"+z[items].nombre+"  "+"id:"+z[items].id)
		var option = document.createElement("option");
		option.text = z[items].nombre;
		option.value = z[items].id;
		x.add(option, x[i]);
		i = i + 1;
	}
    }
  }
//alert(www+"gestion3/app_php/leerContactos.php");
xmlhttp.open("POST",www+"/app_php/leerContactos.php",true);
xmlhttp.setRequestHeader("Content-type","application/json;charset=UTF-8");
xmlhttp.withCredentials = "true";
xmlhttp.send(json);
}

// Guardar el seleccionado
function seleccion_contacto() {
    var x = document.getElementById("contactos").selectedIndex; 
    var y = document.getElementById("contactos").options; 

    var a = document.getElementById("cond_venta").selectedIndex; 
    var b = document.getElementById("cond_venta").options; 

    //alert("posicion =  " + y[x].index + " Razon Social = " + y[x].text + " id= " + y[x].value);
    //alert("venta =  " + b[a].index + " Detalle = " + b[a].text + " id= " + b[a].value);

	setCookie('contacto_id', y[x].value, 1);
	setCookie('contacto_razon_social', y[x].text, 1);
	setCookie('cond_venta', b[a].value, 1);
	setCookie('cond_venta_nombre', b[a].text, 1);
	location.href='facturar_03.html'

}