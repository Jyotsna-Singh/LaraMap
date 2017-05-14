var map;
var myLatLng;

$(document).ready(function(){

	geoLocationInit();

});


function geoLocationInit(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(success,fail);
	}else{
		alert("Browser not supported");
	}
}

function success(position){
	console.log(position);
	var latval=position.coords.latitude;
	var lngval=position.coords.longitude;

	myLatLng = new google.maps.LatLng(28.434555,77.057885);
	//var myLatLng = {lat: 28.434555, lng: 77.057885};
	createMap(myLatLng);
	nearbySearch(myLatLng, 'school');
}

function fail(){
	alert("It Fails");
}


//create map
function createMap(myLatLng){
	map = new google.maps.Map(document.getElementById('map'), {
          center: myLatLng,
          zoom: 15
        });

	var marker = new google.maps.Marker({
			position: myLatLng,
		    map: map
	});
}

//Create Marker
function createMarker(LatLng,icn,name){
		var marker = new google.maps.Marker({
		    position: LatLng,
		    map: map,
		    icon:icn,
		    title: name
		  });
}

function nearbySearch(myLatLng,type){
	 var request = {
    location: myLatLng,
    radius: '1500',
    types: ['type']
  };

service = new google.maps.places.PlacesService(map);
service.nearbySearch(request, callback);

	function callback(results, status) {
	console.log(results);
	 if (status == google.maps.places.PlacesServiceStatus.OK) {
	  for (var i = 0; i < results.length; i++) {
	  var place = results[i];
	  LatLng = place.geometry.location;
	  icn = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
	  name = place.name;
	  createMarker(LatLng,icn,name);
	  
	 }
	 	
	 }
  }
}
 
