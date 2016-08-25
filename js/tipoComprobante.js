function tipoComprobante(comprobante){
	setCookie('tipo_comprobante', comprobante, 1);
	location.href='facturar_02.html'
}
