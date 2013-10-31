define([
  'zepto', 
  'underscore', 
  'backbone',
  'router'
], function($, _, Backbone, Router) {
    var app = {
        // Application Constructor
        initialize: function() {
            var checkForDevice = setInterval(function() {
                if (device) {
                    Router.initialize()
                    clearInterval(checkForDevice);
                }
            }, 100);
        },
    }

    return app;
});
