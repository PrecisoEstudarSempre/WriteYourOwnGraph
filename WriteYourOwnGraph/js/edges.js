function pickAndUnpickEdge($edge) {
	if($edge.data('edge-object').isFocused){
		unpickEdge($edge)
	} else {
		pickEdge($edge);
		loadEdgeProperties();
	}
}

function pickEdge($edge) {
	$edge.data('edge-object').isFocused = true;
	$edge.attr('stroke',pickedColor);
	$currentPickedEdge = $edge;
	if($edge.data('edge-object').controlPoint){
		$edge.data('edge-object').controlPoint.show();
	}
}

function unpickEdge($edge) {
	$edge.data('edge-object').isFocused = false;		
	$edge.attr('stroke',unpickedColor);
	if($edge.data('edge-object').controlPoint){
		$edge.data('edge-object').controlPoint.hide();
	}
}

function drawEdgeValidation() {
	var arrayLength = pickedDots.length;
	if(arrayLength == 0 || arrayLength == 1){
		alert("Para realizar a projeção de uma aresta é necessária a seleção de dois nós.");
	} 
	//criação da aresta recursiva deixada para uma próxima versão
	/*
	else if(arrayLength == 1){
		if(confirm("Utilização de nó recursivo ?")){
			drawRecursiveEdge(pickedDots[0], pickedDots[0]);
		}
	} 
	*/
	else if(arrayLength > 2){
		alert("Mais de 2 nós selecionados para projeção de uma aresta.");
	} else {
		drawStraightEdge(pickedDots[0],pickedDots[1]);
	}
}

function drawStraightEdge($dotBegin, $dotEnd) {
	var idEdge = new Date().getTime();
	var newMX = new Number($dotBegin.attr('cx'));
	var newMY = new Number($dotBegin.attr('cy'));
	var newLX = new Number($dotEnd.attr('cx'));
	var newLY = new Number($dotEnd.attr('cy'));

	//var d = 'M'+newMX+','+newMY+' L'+newLX+','+newLY;
	var d = buildStraightDimension(newMX,newMY,newLX,newLY);
	var $edge = $(document.createElementNS("http://www.w3.org/2000/svg", 'path'));
	$edge.attr('stroke-width','3')
			.attr('stroke','black')
			.attr('d',d)
			.attr('fill','none');
	$edge.data('edge-object',{
		'id' : idEdge,
		'isCurve' : false,
		'mx' : newMX,
		'my' : newMY,
		'lx' : newLX,
		'ly' : newLY,
		'qx' : 0,
		'qy' : 0,
		'isFocused' : false,
		'controlPoint' : null
	});
	$edge.addClass('edge');
	$edge.on('click',function(){
		validateFocusOnCurrentEdge($(this));
		pickAndUnpickEdge($(this));
	});
	$dashboard.append($edge);
	pickAndUnpickDot($dotBegin);
	pickAndUnpickDot($dotEnd);
	createLayer(MSG_EDGE_CREATION,$edge);
}

function buildStraightDimension(mx,my,lx,ly) {
	return 'M'+mx+','+my+' L'+lx+','+ly;
}

function validateFocusOnCurrentEdge($edge) {	
	if($currentPickedEdge){
		var edgeObject = $edge.data('edge-object');
		var currentPickedEdgeObject = $currentPickedEdge.data('edge-object');
		if(edgeObject.id!=currentPickedEdgeObject.id){
			unpickEdge($currentPickedEdge);
		}
	}
}

//criação da aresta recursiva deixada para uma próxima versão
function drawRecursiveEdge($dotBegin, $dotEnd) {
	
}