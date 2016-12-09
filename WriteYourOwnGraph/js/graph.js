var $dashboard = $('#idDashboard');
var $divLayers = $('#idLayers');

var axisX=0, axisY=0;
var layerCounter = 0;
var leftPositionDashboard = $dashboard.position().left;
var topPositionDashboard = $dashboard.position().top;

var flagAction = '';
var isPressed = false;
var isAdjustingArc = false;

var $createdDot = null;
var $parentCreatedDot = null;
var $currentPickedDot = null;
var $currentPickedEdge = null;
var $currentControlPoint = null;

var pickedDots = new Array();
var createdDots = new Array();

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
		unloadProperties();
	});

	$dashboard.mousedown(
		function(){
			if(flagAction == 'drawArc'){
				isPressed = true;				
				$(this).mousemove(
					function (event) {
						moveControlPoint(event);
					}
				);
			}
		}
	);

	$dashboard.mouseup(
		function(){
			if(flagAction == 'drawArc'){
				isPressed = false;
				flagAction = '';
			}
		}
	);
});

function loadDotProperties(){
	var dotObject = $currentPickedDot.data('dot-object');
	$.get('dot-properties.html', function(data,textStatus){
		if(textStatus=='success'){
			$("#idProperty").html(data);
			$('#id-dot-title').val(dotObject.title);
		}
	});
}

function loadEdgeProperties(){
	var edgeObject = $currentPickedEdge.data('edge-object');
	$.get('edge-properties.html', function(data,textStatus){
		if(textStatus=='success'){
			$('#idProperty').html(data);
			$('#id-edge-arc').attr('checked',edgeObject.isCurve);
		}
	});
}

function unloadProperties() {
	$("#idProperty").empty();
}