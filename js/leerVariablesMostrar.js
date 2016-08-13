
function leerVariablesMostrar(){
           var fecha = getCookie('fecha');
		   var fecha_esp = fecha.substr(8,2)+'/'+fecha.substr(5,2)+'/'+fecha.substr(0,4);
		   document.getElementById('desc_comp').innerHTML = "<h2 class='form-signin-heading text-center'>"+fecha_esp+"</h2>"
}
