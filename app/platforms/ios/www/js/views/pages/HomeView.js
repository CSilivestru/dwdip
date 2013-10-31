define([
  'baseview',
  'text!templates/pages/HomeView.html'
], function(Baseview, homeTemplate){

  var HomeView = Baseview.extend({
    initialize: function() {
    },

    events: {
        "swipedown": "handleSwipeDown"
    },

    handleSwipeDown: function(e) {
        console.log("Swipe down detected");
    },

    render: function(){
      this.$el.html(homeTemplate);
      this.$el.hammer();
    }

  });

  return HomeView;
});
