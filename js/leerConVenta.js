function leerConVenta()
{

var empresa = getCookie('empresa');
var usuario = getCookie('usuario');
var www = getCookie('www');

var json=JSON.stringify({"empresa":empresa,"usuario":usuario});

var xmlhttp;
//alert("Entre leerConVenta");

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
    var x = document.getElementById("cond_venta");
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

//alert(www+"gestion3/app_php/leerConVenta.php");
xmlhttp.open("POST",www+"/app_php/leerConVenta.php",true);
xmlhttp.setRequestHeader("Content-type","application/json;charset=UTF-8");
<<<<<<< HEAD
//xmlhttp.withCredentials = "true";
=======
xmlhttp.withCredentials = "true";
>>>>>>> origin/master
xmlhttp.send(json);
}

