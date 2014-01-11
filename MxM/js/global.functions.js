var globalMxm = {

	//envio de nueva letra a pintar
	changeLetter: function(newLetter){
		$(".changeLetter span").fadeOut('slow', function() {			
			$(this).empty();
			$(this).text(newLetter).fadeIn('slow');
		});
	},

	//saber si un json cambio
	loadJsonp: function(json,clave){		
			return $.ajax({
				type: 'GET',
				url: String(json),
				async: false,
				jsonpCallback: String(clave),
					tentType: "application/json",
				dataType: 'jsonp',
				cache: false
			});				
	},

	pintaContenidoJsonp: function(json,clave){
		var outHTML = "";
		$.when(globalMxm.loadJsonp(json,clave)).done(function(data){
		var totalItems = data.employees.length;			
			for (var i = 0; i < totalItems; i++) {
				outHTML += "<div style=\"border-bottom:1px solid gray\">";				
				outHTML += "<p>ID: "+data.employees[i].id+"</p>"
				outHTML += "<p>NOMBRE: "+data.employees[i].firstName+"</p>"
				outHTML += "<p>APELLIDO: "+data.employees[i].lastName+"</p>"
				outHTML += "</div>"
			}
			$("#outjson").html(outHTML);			
			globalMxm.updateContenidoJsonp(totalItems,json,clave);
		});

		
	},

	


	
	updateContenidoJsonp: function(totalItems,json,clave){				
		setInterval(function() {
      		$.when(globalMxm.loadJsonp(json,clave)).done(function(data){      			      			
      			(data.employees.length > parseInt(totalItems))?(function(){       				      				
      					totalItems = data.employees.length;	
      					console.log("actualizando..");
      			})():(function(){ 
      				console.log("NO...");
      			 })();      			
      		});
      		
		}, 5000);
		
	}




}


$(function() {
	globalMxm.pintaContenidoJsonp('http://lab.israelviveros.com/update.jsonp','secreto');
});