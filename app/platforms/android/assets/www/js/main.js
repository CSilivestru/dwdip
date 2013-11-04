requirejs.config({
    paths: {
        baseview: 'base/BaseView',
        templates: '../templates'
    },

    waitSeconds: 0 //disable timeout
});

    define(['app'], function(App){
        alert("At Require");
        // The "app" dependency is passed in as "App"
        // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
        App.initialize();
        alert("After Require");
    })

