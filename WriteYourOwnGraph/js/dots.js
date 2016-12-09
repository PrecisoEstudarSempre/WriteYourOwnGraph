function pickAndUnpickDot($dot) {	
	if($dot.attr('stroke')==pickedColor){
		//unpick
		$dot.attr('stroke',unpickedColor);
		pickedDots.pop($dot);
		$currentPickedDot = null;
		unloadProperties();
	} else{
		//pick
		$dot.attr('stroke',pickedColor);
		pickedDots.push($dot);
		$currentPickedDot = $dot;
		loadDotProperties();		
	}
}

function drawDot(axisX,axisY){		
	var idDot = new Date().getTime();
	
	$parentCreatedDot = $(document.createElementNS("http://www.w3.org/2000/svg", 'g'));
	$createdDot = $(document.createElementNS("http://www.w3.org/2000/svg", 'circle'));
	$createdDot.attr('r', 5)
		.attr('stroke','black')
		.attr('stroke-width','2')
		.attr('fill','black')
		.attr('data-dot-id', idDot);
	$createdDot.data('dot-object',{
		'id': idDot,
		'title' : ''
	});
	$createdDot.addClass('dot');
	$createdDot.on('click',function(){
		pickAndUnpickDot($(this));
	});
	$parentCreatedDot.append($createdDot);
	
	flagAction = 'drawDot';
}