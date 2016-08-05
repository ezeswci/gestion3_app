function leerProductos(tipo)
{

var empresa = getCookie('empresa');
var usuario = getCookie('usuario');
var www = getCookie('www');

var json=JSON.stringify({"empresa":empresa,"usuario":usuario});

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
	/************************
	*** Generar el select ***
	************************/
    var x = document.getElementById("productos");
	var z = JSON.parse(xmlhttp.responseText);
	window.productsArray=z;
	var i = 0;
	var option = document.createElement("option");
	option.text = 'Seleccione un producto';
	option.value = 0;
	x.add(option, x[i]);
	
	for(items in z){
		//alert("Nombre:"+z[items].nombre+"  "+"id:"+z[items].id)
		i = i + 1;
		var option = document.createElement("option");
		option.text = z[items].nombre;
		option.value = z[items].id;
		x.add(option, x[i]);
	}
    }
  }
xmlhttp.open("POST",www+"/app_php/leerProductos.php",false);
xmlhttp.setRequestHeader("Content-type","application/json;charset=UTF-8");
//xmlhttp.withCredentials = "true";
xmlhttp.send(json);
}

// Guardar el seleccionado
function seleccionarProducto() {
	//alert('seleccion producto');
    var x = document.getElementById("productos").selectedIndex; 
    var y = document.getElementById("productos").options; 
	//alert("posicion =  " + y[x].index + " Nombre = " + y[x].text + " id= " + y[x].value);
	var producto_precio=selectProductById(y[x].value);
	window.productsnombre=y[x].text;
	window.productsid=y[x].value;
	//alert('Producto = '+producto_precio);
	document.getElementById("precio_unitario").value = producto_precio;
}

//Precio del producto
function selectProductById(id){
	z=window.productsArray;
	for(items in z){
		if(z[items].id==id)
		return z[items].precio;
	}
	alert("Error");
	return null;
}

//Precio total
function precioTotal(){
	var cantidad = document.getElementById("cantidad").value; 
	var precio = document.getElementById("precio_unitario").value; 
	var total = cantidad * precio;
	document.getElementById("precio_total").value = total;
}

function agregarProducto(){
	var error = '';
	var producto_cantidad = document.getElementById("cantidad").value; 
	var producto_precio = document.getElementById("precio_unitario").value; 
	var producto_total = document.getElementById("precio_total").value;
	var producto_nombre = window.productsnombre;
	var producto_id = window.productsid;
	
	if(typeof producto_id == 'undefined'){error = error+"<p>debe seleccionar un <b>Producto</b> de la tabla</p>"};
	if(producto_cantidad < 0.01 ){error = error+"<p>La <b>Cantidad</b> debe ser mayor a 0 (Cero)</p>"};
	if(producto_precio < 0.01 ){error = error+"<p>El <b>Precio unitario</b> no puede ser 0 (Cero)</p>"};
	if(error.length > 0){mostrar_alerta('Campos Obligatorios',error,BootstrapDialog.TYPE_DANGER);return}
 	/********************************
	*** Agregar linea en la tabla ***
	********************************/
    var table = document.getElementById("muestra_comprobante");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
	cell1.innerHTML = producto_id;
	cell2.innerHTML = producto_nombre;
    cell3.innerHTML = producto_cantidad;
    cell4.innerHTML = producto_precio;
    cell5.innerHTML = producto_total;
	cell1.style.visibility="hidden";
	cell1.style.fontSize="0%";
	cell2.style.textAlign="left";
	cell2.style.fontSize="80%";
	cell3.style.textAlign="center";
	cell4.style.textAlign="right";
	cell5.style.textAlign="right";
	mostrar_alerta('Producto Agregado',producto_cantidad+' '+producto_nombre,BootstrapDialog.TYPE_INFO);
	
	document.getElementById("cantidad").value = ''; 
	document.getElementById("precio_unitario").value = '';
	document.getElementById("precio_total").value = '';
}
