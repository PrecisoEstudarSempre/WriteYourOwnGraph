$(document).ready(function(){
	$('.titleBarOptionMinimize').click(
		function(){
			$('#idLayers').animate({
				height: "80px"
			});
			$('#idPanelLayers').animate({
				height: "100px"
			});
		}
	);
});
