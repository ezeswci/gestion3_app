
function verComprobantes(tipo){
	var fecha = document.getElementById('fecha').value
	setCookie('fecha', fecha, 1);
	if(tipo == 'FA'){location.href='ver_facturas_01.html'};
	if(tipo == 'PR'){location.href='ver_presup_reserva_01.html'};
}
