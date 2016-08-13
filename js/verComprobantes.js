
function verComprobantes(){
	var fecha = document.getElementById('fecha').value
	setCookie('fecha', fecha, 1);
	location.href='ver_facturas_01.html'
}
