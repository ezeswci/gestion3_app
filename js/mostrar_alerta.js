
function mostrar_alerta(titulo,texto,tipo){
            BootstrapDialog.show({
                type: tipo,
                title: titulo,
                message: texto,
                buttons: [{
                   label: 'Aceptar',
                	action: function(dialogItself){
                   	 dialogItself.close();
                	}
                }]
            });     
}

/*
var types = [BootstrapDialog.TYPE_DEFAULT, 
	BootstrapDialog.TYPE_INFO, 
	BootstrapDialog.TYPE_PRIMARY, 
	BootstrapDialog.TYPE_SUCCESS, 
	BootstrapDialog.TYPE_WARNING, 
	BootstrapDialog.TYPE_DANGER];
*/