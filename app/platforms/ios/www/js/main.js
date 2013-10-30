require.config({
    paths: {
        zepto: 'lib/zepto-min',
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min',
        baseview: 'base/BaseView',
        templates: '../templates'
    },

    shim: {
        underscore: { 
            deps: ['zepto'],
            exports: "_"
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
