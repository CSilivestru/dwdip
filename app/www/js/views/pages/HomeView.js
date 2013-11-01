define([
  'baseview',
  '../partials/FindView',
  '../partials/ParkView',
  'text!templates/pages/HomeView.html'
], function(Baseview, FindView, ParkView, homeTemplate){

  var HomeView = Baseview.extend({
    initialize: function() {
        
    },

    events: {
    },

    render: function(){
        this.$el.html(homeTemplate);

        var findView = new FindView({el: $("#findContainer")});
        var parkView = new ParkView({el: $("#parkContainer")});

        findView.render();
        parkView.render();
    }

  });

  return HomeView;
});
