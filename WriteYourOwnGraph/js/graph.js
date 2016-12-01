var axisX=0, axisY=0;
var $dashboard = $('#idDashboard');
var leftPositionDashboard = $dashboard.position().left;
var topPositionDashboard = $dashboard.position().top;
var flagAction = '';
var $createdDot;
var $parentCreatedDot;
var $currentPickedDot;
var pickedDots = new Array();
var createdDots = new Array();
var $divLayers = $('#idLayers');
var layerCounter = 0;
var pickedColor = '#3385ff';
var unpickedColor = 'black';

$(document).ready(function() {
	$dashboard.mousemove(function(event) {
		axisX=event.pageX;
		axisY=event.pageY;			

		if(flagAction=='drawDot'){				
			$createdDot.attr('cx',axisX-leftPositionDashboard);
			$createdDot.attr('cy',axisY-topPositionDashboard);
		}
	});

	$dashboard.click(function(event) {
		if(flagAction=='drawDot'){
			$dashboard.append($parentCreatedDot);			
			createLayer(MSG_DOT_CREATION, $createdDot);
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

function pickAndUnpickDot($dot) {
	//selecionado
	if($dot.attr('stroke')==pickedColor){
		$dot.attr('stroke',unpickedColor);
		pickedDots.pop($dot);
		$currentPickedDot = null;
	} else{
		$dot.attr('stroke',pickedColor);		
		pickedDots.push($dot);
		$currentPickedDot = $dot;
		loadDotProperties();		
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
	$element.remove();
}

function loadDotProperties(){
	var dotobject = $currentPickedDot.data('dot-object');
	$.get('dot-properties.html', function(data,textStatus){
		if(textStatus=='success'){
			$("#idProperty").html(data);
			$('#idDotTitle').val(dotobject.title);
		}
	});	
}