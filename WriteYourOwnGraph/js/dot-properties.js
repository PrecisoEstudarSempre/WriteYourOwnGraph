$(document).ready(function(){
	$('#idDotTitle').keyup(
		function() {
			reloadDotTitle($currentPickedDot, $(this).val());
		}
	);
});

function reloadDotTitle($dot,title){
	$dot.data('dot-object').title = title;

	var $parent = $dot.parent();
	var $svgText;
	
	if($dot.next().is('text')){
		$svgText = $dot.next();
	} else {
		$svgText = $(document.createElementNS("http://www.w3.org/2000/svg", 'text'));
	}
	
	$svgText.attr('x',$dot.attr('cx'))
			.attr('y',$dot.attr('cy')-10)
			.attr('font-family','Verdana')
			.attr('font-size',15)
			.attr('fill','black');
	$svgText.html(title);

	$parent.append($svgText);
}