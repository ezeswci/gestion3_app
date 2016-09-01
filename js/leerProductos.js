function leerProductos(tipo)
{
startLoadingAnimation();
var empresa = getCookie('empresa');
var usuario = getCookie('usuario');
var www = getCookie('www');
var contacto_id = getCookie('contacto_id');
var json=JSON.stringify({"empresa":empresa,"usuario":usuario,"contacto_id":contacto_id});

//alert("Entre leerContactos "+contacto_id);

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
	closeLoadingAnimation();
    }
  }
xmlhttp.open("POST",www+"/app_php/leerProductos.php",true);
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
	//alert('Producto = '+producto_precio+' '+y[x].value);
	document.getElementById("pr_txtcod").value = y[x].value;
	document.getElementById("precio_unitario").value = producto_precio;
}

//Precio del producto
function selectProductById(id){
	z=window.productsArray;
	for(items in z){
		if(z[items].id==id)
		return z[items].precio;
	}
	//alert("Error 75");
	mostrar_alerta('Productos','Debe seleccionar un producto',BootstrapDialog.TYPE_DANGER);
	return null;
}

//Verificar los limites de cantidades
function ControlProductLimit(id){
	var id = document.getElementById("pr_txtcod").value;
	var cantidad = document.getElementById("cantidad").value;
	var unidades = document.getElementById("unidades").value;
	z=window.productsArray;
	for(items in z){
		if(z[items].id==id){
			//alert(z[items].uni_min+' '+z[items].uni_max);
			var unidad_minimo = z[items].uni_min;
			var unidad_maximo = z[items].uni_max;
			var medida_unidad = cantidad / unidades;
			if(medida_unidad < unidad_minimo)
				{mostrar_alerta('Productos.','La cantidad por bulto es <b>inferior</b> al deseado',BootstrapDialog.TYPE_DANGER);}
			if(medida_unidad > unidad_maximo)
				{mostrar_alerta('Productos.','La cantidad por bulto es <b>Superior</b> al deseado',BootstrapDialog.TYPE_DANGER);}
			return;
		}
	}
	//alert("Error 75");
	mostrar_alerta('Productos Limite','Debe seleccionar un producto',BootstrapDialog.TYPE_DANGER);
	return null;
}

//Precio total
function precioTotal(){
	var cantidad = document.getElementById("cantidad").value; 
	var precio = document.getElementById("precio_unitario").value; 
	var calculo = cantidad * precio;
	var total = calculo.toFixed(2);
	//ControlProductLimit(document.getElementById("pr_txtcod").value); // Verificar los limites de cantidades
	
	document.getElementById("precio_total").value = total;
}

function agregarProducto(){
	var error = '';
	var producto_unidades = document.getElementById("unidades").value; 
	var producto_cantidad = document.getElementById("cantidad").value; 
	var producto_precio = document.getElementById("precio_unitario").value; 
	var producto_total = document.getElementById("precio_total").value;
	var producto_nombre = window.productsnombre;
	var producto_id = window.productsid;
	var total_factura = getCookie('total_factura');
	var total_aux = parseFloat(total_factura) + parseFloat(producto_total);
	var total_factura = total_aux.toFixed(2);
	setCookie('total_factura', total_factura, 1);
	document.getElementById('total_factura').innerHTML = "<h4 class='text-center' >Total : $ "+total_factura+"</h4>"
	
	if(typeof producto_id == 'undefined'){error = error+"<p>debe seleccionar un <b>Producto</b> de la tabla</p>"};
	if(producto_cantidad < 0.01 ){error = error+"<p>La <b>Cantidad</b> debe ser mayor a 0 (Cero)</p>"};
	if(producto_unidades < 0.01 ){error = error+"<p>El <b>Unidades</b> debe ser mayor a 0 (Cero)</p>"};
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
    var cell6 = row.insertCell(5);
	var cell7 = row.insertCell(6);
	
	cell1.innerHTML = producto_id;
	cell2.innerHTML = producto_nombre;
    cell3.innerHTML = producto_unidades;;
    cell4.innerHTML = producto_cantidad;
    cell5.innerHTML = producto_precio;
    cell6.innerHTML = producto_total;
	cell7.innerHTML ='<i style="font-size: 1.2em;color: #d9534f;" class="fa fa-minus-circle" aria-hidden="true" onclick="BorrarFila(this);"></i>';
	//
	cell1.style.visibility="hidden";
	cell1.style.fontSize="0%";
	cell2.style.textAlign="left";
	cell2.style.fontSize="100%";
	cell3.style.textAlign="center";
	cell4.style.textAlign="center";
	cell5.style.textAlign="right";
	cell6.style.textAlign="right";
	cell7.style.textAlign="right";
	//mostrar_alerta('Producto Agregado',producto_id+' '+producto_nombre,BootstrapDialog.TYPE_INFO);
	
	document.getElementById("pr_txtcod").value = ''; 
	document.getElementById("unidades").value = ''; 
	document.getElementById("cantidad").value = ''; 
	document.getElementById("precio_unitario").value = '';
	document.getElementById("precio_total").value = '';
	document.getElementById("productos").value = '0';
	document.getElementById("pr_txtcod").focus();
}

function producto_codigo() {
	document.getElementById("productos").value = document.getElementById("pr_txtcod").value;
	seleccionarProducto();
	document.getElementById("unidades").focus();
}

//Borrar linea de tabla
function BorrarFila(iElement) {
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_DANGER,
                title: 'Borrar linea factura',
                message: 'Esta seguro de borrar la linea seleccionada?',
                buttons: [{
                   label: 'Aceptar',
				   cssClass: 'btn-success',
                	action: function(dialogItself){
						var trElement=iElement.parentNode.parentNode;
						(trElement.parentNode).removeChild(trElement);
						dialogItself.close()
						recalculo_total();
                	}
                	}, {
                   label: 'Cancelar',
				   	cssClass: 'btn-danger',
                	action: function(dialogItself){
                   	 dialogItself.close();
                	}
                }]
            });     
}

function recalculo_total(){
	var total_factura = 0;
	var total_aux = 0;
	var table = document.getElementById("muestra_comprobante");
	for (var i = 1; row = table.rows[i]; i++) {
		//alert(document.getElementById("muestra_comprobante").rows[i].cells[5].innerHTML);
		var pesos_linea = document.getElementById("muestra_comprobante").rows[i].cells[5].innerHTML
		var total_aux = parseFloat(total_aux) + parseFloat(pesos_linea) ;
	}

	var total_factura = total_aux.toFixed(2);
	setCookie('total_factura', total_factura, 1);
	document.getElementById('total_factura').innerHTML = "<h4 class='text-center' >Total : $ "+total_factura+"</h4>"


}


function deletTest(iElement){
	var trElement=iElement.parentNode.parentNode;
	(trElement.parentNode).removeChild(trElement);
}