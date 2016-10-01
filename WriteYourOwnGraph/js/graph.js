var axisX=0, axisY=0;
var $dashboard = $('#idDashboard');
var leftPositionDashboard = $dashboard.position().left;
var topPositionDashboard = $dashboard.position().top;
var flagAction = '';
var $dot;
var pickedDots = new Array();
var $divLayers = $('#idLayers');
var layerCounter = 0;

$(document).ready(function() {
	$dashboard.mousemove(function(event) {
		axisX=event.pageX;
		axisY=event.pageY;			

		if(flagAction=='drawDot'){				
			$dot.attr('cx',axisX-leftPositionDashboard);
			$dot.attr('cy',axisY-topPositionDashboard);
		}
	});

	$dashboard.click(function(event) {
		if(flagAction=='drawDot'){
			$dashboard.append($dot);
			createLayer(MSG_DOT_CREATION, $dot);
			flagAction='';
		}
	});

	$('#idDot').click(function() {
		drawDot(axisX,axisY);
	});

	$('#idEdge').click(function(){
		drawEdgeValidation();
	});
});

function drawDot(axisX,axisY){		
	$dot = $(document.createElementNS("http://www.w3.org/2000/svg", 'circle'));
	$dot.attr('r', 5)
		.attr('stroke','black')
		.attr('stroke-width','2')
		.attr('fill','black');
	$dot.addClass('dot');
	$dot.on('click',function(){
		pickAndUnpickDot($(this));
	});
	flagAction = 'drawDot';		
}

function pickAndUnpickDot($dot) {
	if($dot.attr('stroke')=='red'){
		$dot.attr('stroke','black');
		pickedDots.pop($dot);
	} else{
		$dot.attr('stroke','red');
		pickedDots.push($dot);
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
	var d = 'M'+$dotBegin.attr('cx')+','+$dotBegin.attr('cy')+' L'+$dotEnd.attr('cx')+','+$dotEnd.attr('cy');
	var $edge = $(document.createElementNS("http://www.w3.org/2000/svg", 'path'));
	$edge.attr('stroke-width','3')
			.attr('stroke','black')
			.attr('d',d);
	$edge.addClass('edge');
	$dashboard.append($edge);
	pickAndUnpickDot($dotBegin);
	pickAndUnpickDot($dotEnd);
	createLayer(MSG_EDGE_CREATION,$edge);
}

//criação da aresta recursiva deixada para uma próxima versão
function drawRecursiveEdge($dotBegin, $dotEnd) {
	
}

function createLayer(msg, $element){
	var $layer = $('<div>');
	var $spanDescription = $('<span>');
	var $spanTrash = $('<span>');
	var $imgTrash = $("<img src='images/trash.png' title='Excluir' class='imgTrashLayer' />");
	
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
	$element.remove();
}