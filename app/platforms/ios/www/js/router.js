define([
       'views/pages/HomeView',
       'views/pages/FindView',
       'views/pages/ParkView',
], function(HomeView, FindView, ParkView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
            'find': 'find'
        },

        initialize: function() {
            this.mainEl = $("#main-content");
        },

        home: function() {
            var homeView = new HomeView({el: this.mainEl, router: this});
            AppView.showView(homeView);
        },

        find: function() {
            var findView = new FindView({el: this.mainEl, router: this});
            AppView.showView(findView);
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
