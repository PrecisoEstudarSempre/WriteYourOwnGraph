$(document).ready(function(){
	$('#id-edge-arc').click(
		function(){
			if($(this).is(':checked')){				
				$currentPickedEdge.data('edge-object').isCurve = true;
				var d = $currentPickedEdge.attr('d');
				var edgeObject = $currentPickedEdge.data('edge-object');
				var mx = edgeObject.mx;			
				var my = edgeObject.my;
				var lx = edgeObject.lx;
				var ly = edgeObject.ly;
				
				var $controlPoint = $(document.createElementNS("http://www.w3.org/2000/svg", 'circle'));
				var newX = (lx-mx)/2 + mx;
				var newY = (ly-my)/2 + my;

				$controlPoint.attr('r', 3)
						.attr('stroke','yellow')
						.attr('stroke-width','2')
						.attr('fill','yellow')
						.attr('cx',newX)
						.attr('cy',newY);
				edgeObject.qx = newX;
				edgeObject.qy = newY;				
				
				$controlPoint.addClass('dot');
				$controlPoint.css('cursor','move');

				$controlPoint
					.mousedown(function(){				
						flagAction = 'drawArc';						
					});
				edgeObject.controlPoint=$controlPoint;
				$dashboard.append(edgeObject.controlPoint);
				$currentControlPoint = $controlPoint;				
			} else {
				$currentControlPoint.remove();
				$currentControlPoint = null;
				redrawStraightEdge();
			}
		}
	);
});

function moveControlPoint(event) {
	if(flagAction == 'drawArc'){
		if(isPressed){		
			var edgeObject = $currentPickedEdge.data('edge-object');
			var controlPoint = edgeObject.controlPoint;
			var qx = axisX-leftPositionDashboard;
			var qy = axisY-topPositionDashboard;
			controlPoint.attr('cx',qx);
			controlPoint.attr('cy',qy);
			edgeObject.qx = qx;
			edgeObject.qy = qy;
			
			var newD = 'M'+edgeObject.mx+','+edgeObject.my+' Q'+qx+','+qy+' '+edgeObject.lx+','+edgeObject.ly;			
			$currentPickedEdge.attr('d',newD);
		}
	}
}

function redrawStraightEdge() {
	var edgeObject = $currentPickedEdge.data('edge-object');
	edgeObject.isCurve = false;
	var mx = edgeObject.mx;
	var my = edgeObject.my;
	var lx = edgeObject.lx;
	var ly = edgeObject.ly;
	var newD = buildStraightDimension(mx,my,lx,ly);
	$currentPickedEdge.attr('d',newD);
}

function isMouseOverControlPoint() {	
	var cx = new Number($currentControlPoint.attr('cx'));
	console.log('x:'+axisX+'/y:'+axisY);
	var cy = new Number($currentControlPoint.attr('cy'));
	var xBegin = cx-5;	
	var xEnd = cx+5;
	var yBegin = cy-5;
	var yEnd = cy+5;
	var isMouseBetweenXAxis = axisX>=xBegin && axisX<=xEnd;
	var isMouseBetweenYAxis = axisY>=yBegin && axisY<=yEnd;
	return isMouseBetweenXAxis && isMouseBetweenYAxis;
}