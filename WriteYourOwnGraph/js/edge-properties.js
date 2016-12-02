$(document).ready(function(){
	$('#id-edge-arc').click(
		function(){
			var d = $currentPickedEdge.attr('d');
			var x1,y1 = fazer função para extrair valores de M
			var x2,y2 = fazer função para extrair valores de L
			var $controlPoint = $(document.createElementNS("http://www.w3.org/2000/svg", 'circle'));
			var newX = x2-x1=(r/2)+x1
			var newY = y2-y1=(r/2)+y1

			$controlPoint.attr('r', 3)
					.attr('stroke','yellow')
					.attr('stroke-width','2')
					.attr('fill','yellow')
					.attr('cx',newX)
					.attr('cy',newY);
			$controlPoint.addClass('dot');

						/*
			fórmula para descobrir o ponto da metade da aresta
			x2-x1=(r/2)+x1=nx
			y2-y1=(r/2)+y1=ny
			*/
		}
	);
});