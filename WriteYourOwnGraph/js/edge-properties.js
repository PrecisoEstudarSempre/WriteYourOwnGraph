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
				console.log($currentPickedEdge.data('edge-object'));
				
				$controlPoint.addClass('dot');
				$controlPoint.css('cursor','move');

				$controlPoint.mousedown(function(){				
					flagAction = 'drawArc';	
				});
			
				$dashboard.append($controlPoint);
				$currentControlPoint = $controlPoint;				
			} else {
				$currentControlPoint.remove();
				$currentControlPoint = null;				
			}
		}
	);
});

function moveControlPoint(event) {
	if(flagAction == 'drawArc'){
		if(isPressed){		
			var edgeObject = $currentPickedEdge.data('edge-object');
			var qx = axisX-leftPositionDashboard;
			var qy = axisY-topPositionDashboard;
			$currentControlPoint.attr('cx',qx);
			$currentControlPoint.attr('cy',qy);
			edgeObject.qx = qx;
			edgeObject.qy = qy;
			
			var newD = 'M'+edgeObject.mx+','+edgeObject.my+' Q'+qx+','+qy+' '+edgeObject.lx+','+edgeObject.ly;			
			$currentPickedEdge.attr('d',newD);
		}
	}
}