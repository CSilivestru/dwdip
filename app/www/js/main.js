require.config({
    paths: {
        zepto: 'lib/zepto-min',
        hammer: 'lib/hammer-min',
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min',
        baseview: 'base/BaseView',
        templates: '../templates'
    },

    shim: {
        zepto: { 
            exports: "$"
        },

        underscore: { 
            deps: ['zepto'],
            exports: "_"
        },

        hammer: { 
            deps: ['zepto'],
            exports: "Hammer"
        },

        backbone: {
            deps: ['underscore'],
            exports: 'Backbone'
        }
    },

    waitSeconds: 0 //disable timeout
});

require(['app'], function(App){
    // The "app" dependency is passed in as "App"
    // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
    App.initialize();
})
