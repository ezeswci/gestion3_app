
function leerVariables(){
           var empresa = getCookie('empresa');
		   var usuario = getCookie('usuario');
		   var www = getCookie('www');
		   document.getElementById("empresa").value = empresa;
		   document.getElementById("usuario").value = usuario;
		   document.getElementById("web").value = www;
}
