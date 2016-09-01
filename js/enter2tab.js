/************************************* 
**	hay que pasarle el evento event **
** y el proximo campo a donde       **
** hacer foco                       **
** enter2tab(event,'detalle_cab')   **
*************************************/   
function enter2tab(event,campo) 
	{ 
	if(event.keyCode==13){ 
			document.getElementById(campo).focus();
	} 
}