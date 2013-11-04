define([
       'views/pages/HomeView',
], function(HomeView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
        },

        initialize: function() {
            this.mainEl = $("#main-content");
        },

        home: function() {
            var homeView = new HomeView({el: this.mainEl});
            AppView.showView(homeView);
        }
    });

    var AppView = {
        currentView: null,
        previousView: null,
        showView: function(view) {
            if (this.currentView)
                this.previousView = this.currentView;

            this.currentView = view;

            if (this.previousView){
                this.previousView.close();
            }
            //This uses the el set in the view when we initialize it. AppView is here only to swap entire views.
            this.currentView.render();
        }
    }

    var initialize = function() {
        var router = new AppRouter();
        Backbone.history.start();

        router.navigate("", true);
    };

    return { 
        initialize: initialize
    };
});
