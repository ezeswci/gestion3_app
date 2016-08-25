// JavaScript Document
function startLoadingAnimation(){
		 BootstrapDialog.show({
			 cssClass: 'loading-pop-up',
			 title: "",
            message: "",
			buttons: [{
                label: ' ',
				id:'boton-close-loading',
                action: function(dialogItself){
                    dialogItself.close();
                }
            }]		 
		 });
		 return true;
}

function closeLoadingAnimation(){
	var element =  document.getElementById('boton-close-loading');
	if (typeof(element) != 'undefined' && element != null)
	{document.getElementById('boton-close-loading').click();}else{
	setTimeout(function(){closeLoadingAnimation();}, 500);
	}
}
