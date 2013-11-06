define([], function() {
    return {
        getGeoDistance: function(currentLocation, destination) {
            //Following the haversine formula
            console.log("Calculating distance between");
            console.log(currentLocation);
            console.log(destination);

            var EARTHRADIUS = 6371; //in KM
            var distanceLat = (destination.latitude - currentLocation.latitude).toRad();
            var distanceLon = (destination.longitude - currentLocation.longitude).toRad();
            var currentLat = currentLocation.latitude.toRad();
            var destinationLat = destination.latitude.toRad();

            var a = Math.sin(distanceLat/2) * Math.sin(distanceLat/2) +
                    Math.sin(distanceLon/2) * Math.sin(distanceLon/2) * Math.cos(currentLat) * Math.cos(destinationLat);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            return EARTHRADIUS * c;
        },

        getGeoBearing: function(currentLocation, destination) {
            //Following the Forward Azimuth formula
            var EARTHRADIUS = 6371; //in KM
            var distanceLat = (destination.latitude - currentLocation.latitude).toRad();
            var distanceLon = (destination.longitude - currentLocation.longitude).toRad();
            var currentLat = currentLocation.latitude.toRad();
            var destinationLat = destination.latitude.toRad();

            var y = Math.sin(distanceLon) * Math.cos(destinationLat);
            var x = Math.cos(currentLat)*Math.sin(destinationLat) -
                    Math.sin(currentLat)*Math.cos(destinationLat)*Math.cos(distanceLon);
            return Math.atan2(y, x).toDeg();
        }
    };
});

