$(document).ready(function(){
	$('#idTitleBarLayersOptionMinimize').click(
		function(){
			$('#idLayers').animate({
				height: "0px"
			});
			$('#idPanelLayers').animate({
				height: "20px"
			});
		}
	);

	$('#idTitleBarLayersOptionMaximize').click(
		function(){
			$('#idLayers').animate({
				height: "180px"
			});
			$('#idPanelLayers').animate({
				height: "200px"
			});
		}
	);

	$('#idTitleBarDashboardOptionMinimize').click(
		function(){
			$('#idDashboard').animate({
				height: "0px"
			});
			$('#idPanelDashboard').animate({
				height: "20px"
			});
		}
	);

	$('#idTitleBarDashboardOptionMaximize').click(
		function(){
			$('#idDashboard').animate({
				height: "480px"
			});
			$('#idPanelDashboard').animate({
				height: "500px"
			});
		}
	);
});
