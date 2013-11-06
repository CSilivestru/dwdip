define([
  'baseview',
  '../../utils',
  'text!templates/pages/FindView.html',
  'text!templates/partials/FindCar.html',
  'text!templates/partials/loading.html'
], function(Baseview, Utils, findTemplate, locationFoundTemplate, loadingTemplate){

  var FindView = Baseview.extend({
    initialize: function(args) {
        this.initArgs(args);
        this.continuousBearingRefresh = null;
    },

    template: _.template(findTemplate),

    events: {
        "tap    #back": "goBack"
    },

    goBack: function(e) {
        this.router.navigate("", true);
    },

    getParkLocation: function(callback) {
        console.log("Getting park location");
        callback.call(this, {latitude: 80, longitude: -10});
    },

    calculateHeading: function(bearing) {
        var view = this;

        navigator.geolocation.getCurrentPosition(function(location) {
            var template = _.template(locationFoundTemplate);
            this.$("#findInfoContainer").html(_.template(template({location: location})));

            try {
                var distance = Utils.getGeoDistance(location.coords, view.parkLocation);
                var bearingToCar = Utils.getGeoBearing(location.coords, view.parkLocation);
            } catch (e) {
                alert("Error: " + e.message);
            }
            console.log("bearing: ", bearing);
            console.log("bearing to car: ", bearingToCar);

            var str = "latitude: " + location.coords.latitude + "\n";
            str += "longitude: " + location.coords.longitude + "\n";

            var directionToGo = bearingToCar - bearing;
            view.$(".arrow-heading").css("-webkit-transform", "rotate(" + directionToGo + "deg)");
            view.$("#distanceLeft").html(distance);
        }, function(err) {
            console.log("ERROR GETTING LOCATION: ", err);
        });
    },

    onClose: function() {
        navigator.geolocation.clearWatch(this.geoWatchID);
    },

    render: function(){
        var view = this;
        var geoOptions = { maximumAge: 1000, timeout: 20000, enableHighAccuracy: true }
        this.fadeInViewElements(findTemplate);
        this.$("#findInfoContainer").html(loadingTemplate);
        this.$("#findInfoContainer").append("Getting Position...");

        this.getParkLocation(function(parkLocation) {
            view.parkLocation = parkLocation;

            navigator.compass.watchHeading(function(heading) {
                view.calculateHeading(heading.magneticHeading);
            }, function(err) {
                alert("ERROR: ", err.message);
                console.log("Error: ", err);
            }, {frequency: 1000});
        });
    }

  });

  return FindView;
});

