$(document).ready(function(){
	$('.drawDot').click(function() {
		drawDot(axisX,axisY);
	});

	$('#idEdge').click(function(){
		drawEdgeValidation();
		unloadProperties();
	});

	$('#id-icon-new').click(function(){
		resetDashboard();
	});
});

function resetDashboard() {
	unloadProperties();
	$dashboard.empty();
	$divLayers.empty();
	layerCounter = 0;
	flagAction = '';
	isPressed = false;
	isAdjustingArc = false;
	$createdDot = null;
	$parentCreatedDot = null;
	$currentPickedDot = null;
	$currentPickedEdge = null;
	$currentControlPoint = null;
}