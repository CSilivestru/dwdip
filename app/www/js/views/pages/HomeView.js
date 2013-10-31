define([
  'baseview',
  'text!templates/pages/HomeView.html'
], function(Baseview, homeTemplate){

  var HomeView = Baseview.extend({
    initialize: function() {
    },

    events: {
    },

    render: function(){
      this.$el.html(homeTemplate);
    }

  });

  return HomeView;
});
