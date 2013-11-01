define([
  'zepto', 
  'underscore', 
  'backbone',
  'router'
], function($, _, Backbone, Router) {
    var app = {
        // Application Constructor
        initialize: function() {
            Router.initialize();
        }
    };

    return app;
});
