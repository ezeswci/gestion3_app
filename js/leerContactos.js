function leerContactos(tipo)
{
startLoadingAnimation();
//-----------------------
var empresa = getCookie('empresa');
var usuario = getCookie('usuario');
var www = getCookie('www');

var json=JSON.stringify({"tipo":tipo,"empresa":empresa,"usuario":usuario});

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
	//closeLoadingAnimation();
	var z = JSON.parse(xmlhttp.responseText);
	var i = 0;
		var option = document.createElement("option");
		option.text = 'Seleccione un contacto';
		option.value = '0';
		x.add(option, x[i]);
		for(items in z){
			//alert("Nombre:"+z[items].nombre+"  "+"id:"+z[items].id)
			i = i + 1;
			var option = document.createElement("option");
			option.text = z[items].nombre;
			option.value = z[items].id;
			x.add(option, x[i]);
		}
		closeLoadingAnimation();


    }
  }
//alert(www+"gestion3/app_php/leerContactos.php");
xmlhttp.open("POST",www+"/app_php/leerContactos.php",true);
xmlhttp.setRequestHeader("Content-type","application/json;charset=UTF-8");
//xmlhttp.withCredentials = "true";
xmlhttp.send(json);
}

// Guardar el seleccionado
function seleccion_contacto() {
    var x = document.getElementById("contactos").selectedIndex; 
    var y = document.getElementById("contactos").options; 

    //var a = document.getElementById("cond_venta").selectedIndex; 
   // var b = document.getElementById("cond_venta").options; 

	var error = '';
    if(y[x].value < 1){error = error+"<p>Debe seleccionar un contacto</p>"};
    //if(b[a].value < 1){error = error+"<p>Debe seleccionar una condicion de venta</p>"};
	if(error.length > 0){mostrar_alerta('Generaci&oacute;n de Comprobante',error,BootstrapDialog.TYPE_DANGER);return}

	setCookie('contacto_id', y[x].value, 1);
	setCookie('contacto_razon_social', y[x].text, 1);
	//setCookie('cond_venta', b[a].value, 1);
	//setCookie('cond_venta_nombre', b[a].text, 1);
	location.href='facturar_03.html'

}

// Guardar el seleccionado
function contacto_codigo() {
		document.getElementById("contactos").value = document.getElementById("co_id").value;
		if(document.getElementById("co_id").value == 0) {document.getElementById("contactos").focus();}
;
}

function contactos_mostrar_codigo() {
		document.getElementById("co_id").value = document.getElementById("contactos").value;
		//document.getElementById("cond_venta").focus();
}