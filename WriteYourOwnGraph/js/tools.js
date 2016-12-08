$(document).ready(function(){
	$('.drawDot').click(function() {
		drawDot(axisX,axisY);
	});

	$('#idEdge').click(function(){
		drawEdgeValidation();
	});

	$('#id-icon-new').click(function(){
		resetDashboard();
	});
});

function resetDashboard() {
	$dashboard.children().each(function (index,element) {
		element.remove();
	});
	$divLayers.children().each(function (index,element) {
		element.remove();
	});
	layerCounter = 0;
}