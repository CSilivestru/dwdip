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
        $("#findContainer").addClass("half-height-extended");
        $(".icon-arrow-down").removeClass("icon-arrow-down")
            .addClass("icon-arrow-up");
    },

    render: function(){
      this.$el.html(homeTemplate);
      this.$el.hammer();
    }

  });

  return HomeView;
});
