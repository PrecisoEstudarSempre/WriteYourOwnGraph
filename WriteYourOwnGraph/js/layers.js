function createLayer(msg, $element){
	var $layer = $('<div>');
	var $spanDescription = $('<span>');
	var $spanTrash = $('<span>');
	var $imgTrash = $("<img src='../images/trash.png' title='Excluir' class='imgTrashLayer' />");
	
	msg = ++layerCounter + '. ' + msg;

	$spanDescription.addClass('spanDescriptionLayer');
	$spanDescription.html(msg);
	$spanDescription.click(function(){
		pickAndUnpickDot($element);
	});

	$spanTrash.addClass('spanTrashLayer');
	$spanTrash.append($imgTrash);
	
	$layer.addClass('layer');
	$layer.append($spanDescription);
	$layer.append($spanTrash);
	
	$divLayers.append($layer);
	$divLayers.prop('scrollTop', $divLayers.prop('scrollHeight'));

	$imgTrash.click(function(){			
		removeLayerAndElement($(this).parent().parent(),$element);		
	});
}

function removeLayerAndElement($layer, $element){
	$layer.remove();
	layerCounter=0;
	if($element.data('edge-object')){
		if($element.data('edge-object').controlPoint){
			$element.data('edge-object').controlPoint.remove();
		}
	}
	$element.remove();
}