requirejs.config({
    paths: {
        baseview: 'base/BaseView',
        templates: '../templates'
    },

    waitSeconds: 0 //disable timeout
});

    define(['app'], function(App){
        //Overrides:

        //Converts numeric degrees to radians
        Number.prototype.toRad = function() {
            return this * Math.PI / 180;
        }

        // Converts radians to numeric (signed) degrees
        Number.prototype.toDeg = function() {
            return this * 180 / Math.PI;
        }

        // The "app" dependency is passed in as "App"
        // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
        App.initialize();
    })

