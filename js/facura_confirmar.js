function facura_confirmar(titulo,texto,tipo){
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_INFO,
                title: 'Grabar comprobante',
                message: 'mensaje de fin de factura',
                buttons: [{
                   label: 'Aceptar',
                	action: function(){
                   	 alert('Cancelar');
					 grabarFactura()
                	}
                	}, {
                   label: 'Cancelar',
                	action: function(){
                   	 alert('Cancelar');
                	}
                }]
            });     
}
//mostrar_alerta('Grabar comprobante','mensaje de fin de factura',BootstrapDialog.TYPE_INFO);
